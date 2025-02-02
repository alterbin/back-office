"use client";

import React, { useMemo } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { ModalsProvider, useModals } from "@/contexts/modals";
import {
  AddButton,
  MobileSkeleton,
  Pagination,
  SearchInput,
  TableSkeleton,
  Tooltip,
} from "@/components";
import { interestQueries } from "@/services/queries";
import { AcceptInterestModal, ReadMoreModal, Remove, useInterestActions } from "./sub-component";
import "./styles.scss";
import { Interest } from "@/services/queries/interest/types";
import moment from "moment";
import { Actionables } from "@/components/shared/actionables";

const useQueries = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const searchTerm = searchParams.get("searchTerm") || "";

  return useMemo(
    () => ({
      page,
      order: "ASC",
      take: 10,
      searchTerm,
    }),
    [page, searchTerm]
  );
};

function Row(props: Interest) {
  const { ...item } = props;

  const { getActions } = useInterestActions(props);

  return (
    <tr>
      <td className="text-center Articulat-Semibold">{item.contact || "--"}</td>
      <td className="text-center tx_pink">
        <Tooltip tooltip={item.note}>
          <div
            className="w-100"
            style={{ maxWidth: 300, whiteSpace: "nowrap" }}
          >
            <span className="text-ellipsis max-w-[300px]">
              {item.note || "--"}
            </span>
          </div>
        </Tooltip>
      </td>
      <td className="text-center">
        <Tooltip tooltip={item.shippingAddress}>
          <div
            className="w-full max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis"
            title={item.shippingAddress}
          >
            {item.shippingAddress || "--"}
          </div>
        </Tooltip>
      </td>
      <td className="text-center">{item?.isAccepted ? "Yes" : "No"}</td>
      <td className="text-center">
        {item?.createdAt
          ? moment(item?.createdAt).format("MMM D, YYYY [at] h:mma")
          : "--"}
      </td>
      <td className="text-center">
        <Actionables actions={getActions()} />
      </td>
    </tr>
  );
}

function MobileRow(props: Interest & { index: number }) {
  const { index, ...item } = props;

  return (
    <Disclosure key={item.id}>
      {({ open }) => (
        <div className="rounded-md shadow-sm mb-4">
          <DisclosureButton className="w-full text-left p-3 bg-gray-100 rounded-md">
            <div className="app__friends__table__person">
              <h5 className="app__friends__table__person__h5 Articulat-Semibold">
                {item.contact || "--"}
              </h5>
            </div>
          </DisclosureButton>
          <DisclosurePanel className="p-4 bg-white rounded-md shadow-sm">
            <div>
              <label className="app__table_mobile__label">Note</label>
              <p>{item.note || "--"}</p>
            </div>

            <hr />
            <div>
              <label className="app__table_mobile__label">
                Shipping Address
              </label>
              <p>{item?.shippingAddress || "--"}</p>
            </div>

            <hr />
            <div>
              <label className="app__table_mobile__label">Created</label>
              <p>
                {item?.createdAt
                  ? moment(item?.createdAt).format("MMM D, YYYY [at] h:mma")
                  : "--"}
              </p>
            </div>
            <hr />
            <div>
              <label className="app__table_mobile__label">Accepted</label>
              <p>{item?.isAccepted ? "Yes" : "No"}</p>
            </div>

            <hr />

            <div className="flex gap-2" />
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}

function MobileRows() {
  const pageQueries = useQueries();

  const { data: givens, isLoading } = interestQueries.Read(pageQueries);

  return (
    <div className="app__table_mobile">
      {isLoading ? (
        <MobileSkeleton rows={7} />
      ) : (
        givens?.data?.map((item, index) => (
          <MobileRow {...{ ...item, index }} key={item.id} />
        ))
      )}
      <div className="flex justify-end items-end">
        {givens?.total < 1 && !isLoading ? null : (
          <Pagination total={givens?.total} />
        )}
      </div>
      {!isLoading && givens?.total < 1 && <p>No record available</p>}
    </div>
  );
}

function Page() {
  const pageQueries = useQueries();

  const { data: givens, isLoading } = interestQueries.Read(pageQueries);

  const { modals, setModals } = useModals();

  const handleModalShow = (record: Interest) => {
    setModals((prev) => ({ ...prev, show: true, record }));
  };

  return (
    <div className="app__dashboard_layout__main_px app_home app__products_catalogue">
      <div className="flex justify-between">
        <SearchInput />
        {/* <AddButton title="Invite Admin" action={handleModalShow} /> */}
      </div>

      {isLoading ? (
        <TableSkeleton rows={9} columns={6} />
      ) : (
        <div className="table-responsive hidden md:block">
          <table className="app__admin__table table">
            <thead>
              <tr>
                <th>Contact</th>
                <th>Note</th>
                <th>Address</th>
                <th>Accepted</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {givens?.total < 1 && !isLoading ? (
                <tr>
                  <td colSpan={6} className="no-data-cell">
                    <div className="no-data-message">No Data</div>
                  </td>
                </tr>
              ) : (
                givens?.data?.map((item) => <Row {...item} key={item.id} />)
              )}
            </tbody>
          </table>
          <div className="flex justify-end items-end">
            {givens?.total < 1 && !isLoading ? null : (
              <Pagination total={givens?.total} />
            )}
          </div>
        </div>
      )}

      <div className="block md:hidden mt-3">
        <MobileRows />
      </div>
      {modals?.show && <ReadMoreModal />}
      {modals?.edit && <AcceptInterestModal />}
    </div>
  );
}

function Interests() {
  return (
    <ModalsProvider>
      <Page />
    </ModalsProvider>
  );
}

export default Interests;

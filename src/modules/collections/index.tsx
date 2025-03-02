"use client";

import React, { useMemo, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { ModalsProvider, useModals } from "@/contexts/modals";
import {
  AddButton,
  DateRangePicker,
  Filter,
  MobileSkeleton,
  Pagination,
  SearchInput,
  TableSkeleton,
  Tooltip,
} from "@/components";
import { collectionQueries } from "@/services/queries";
// import {
//   AcceptInterestModal,
//   ReadMoreModal,
//   Remove,
//   useInterestActions,
// } from "./sub-component";
import "./styles.scss";
import { Interest } from "@/services/queries/interest/types";
import moment from "moment";
import { Actionables } from "@/components/shared/actionables";
import { useOutsideClick } from "@/hooks";
import { ICollection } from "@/services/queries/collections/types";

const useQueries = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const fromDate = searchParams.get("from") || "";
  const toDate = searchParams.get("to") || "";
  const given = searchParams.get("given") || "";
  const isFullfilled = searchParams.get("isFullfilled") || "";

  return useMemo(
    () => ({
      page,
      order: "ASC",
      take: 10,
      searchTerm,
      fromDate,
      toDate,
      given,
      isFullfilled,
    }),
    [page, searchTerm, fromDate, toDate, given, isFullfilled]
  );
};

function Row(props: ICollection) {
  const { ...item } = props;

//   const { getActions } = useInterestActions(props);

  return (
    <tr>
      <td className="text-center Articulat-Semibold">
        {item?.title || "--"}
      </td>
 
      <td className="text-center tx_pink">
        <Tooltip tooltip={item.description}>
          <div className="w-full max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
            <span className="text-ellipsis max-w-[300px]">
              {item.description || "--"}
            </span>
          </div>
        </Tooltip>
      </td>
 
      <td className="text-center">
        {item?.createdAt
          ? moment(item?.createdAt).format("MMM D, YYYY [at] h:mma")
          : "--"}
      </td>
      {/* <td className="text-center">
        <Actionables actions={getActions()} />
      </td> */}
    </tr>
  );
}

function MobileRow(props: ICollection & { index: number }) {
  const { index, ...item } = props;

  return (
    <Disclosure key={item.id}>
      {({ open }) => (
        <div className="rounded-md shadow-sm mb-4">
          <DisclosureButton className="w-full text-left p-3 bg-gray-100 rounded-md">
            <div className="app__friends__table__person">
              <h5 className="app__friends__table__person__h5 Articulat-Semibold">
                {item.title || "--"}
              </h5>
            </div>
          </DisclosureButton>
          <DisclosurePanel className="p-4 bg-white rounded-md shadow-sm">
            <div>
              <label className="app__table_mobile__label">Description</label>
              <p>{item.description || "--"}</p>
            </div>

            <hr />
  

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

            <div className="flex gap-2" />
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}

function MobileRows() {
  const pageQueries = useQueries();

  const { data: interests, isLoading } = collectionQueries.Read(pageQueries);

  return (
    <div className="app__table_mobile">
      {isLoading ? (
        <MobileSkeleton rows={7} />
      ) : (
        interests?.data?.map((item, index) => (
          <MobileRow {...{ ...item, index }} key={item.id} />
        ))
      )}
      <div className="flex justify-end items-end">
        {interests?.total < 1 && !isLoading ? null : (
          <Pagination total={interests?.total} />
        )}
      </div>
      {!isLoading && interests?.total < 1 && <p>No record available</p>}
    </div>
  );
}

function Page() {
  const pageQueries = useQueries();

  const { data: interests, isLoading } = collectionQueries.Read(pageQueries);
  const [showFilter, setShowFilter] = useState(false);

  const { modals, setModals } = useModals();

  const [ref] = useOutsideClick(() => setShowFilter(false));

  const handleModalShow = (record: Interest) => {
    setModals((prev) => ({ ...prev, show: true, record }));
  };

  return (
    <div className="app__dashboard_layout__main_px app_home app__products_catalogue">
      <div className="flex justify-between">
        <SearchInput />
        {showFilter && (
          <div
            className="redirect__filter__container"
            onClick={() => setShowFilter(false)}
          />
        )}

        <div className="flex gap-2">

        <DateRangePicker />
        </div>
      </div>

      {isLoading ? (
        <TableSkeleton rows={9} columns={6} />
      ) : (
        <div className="table-responsive hidden lg:block">
          <table className="app__admin__table table">
            <thead>
              <tr>
                <th>Given Name</th>
                <th>Contact</th>
                <th>Note</th>
                <th>Address</th>
                <th>Accepted</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {interests?.total < 1 && !isLoading ? (
                <tr>
                  <td colSpan={6} className="no-data-cell">
                    <div className="no-data-message">No Data</div>
                  </td>
                </tr>
              ) : (
                interests?.data?.map((item) => <Row {...item} key={item.id} />)
              )}
            </tbody>
          </table>
          <div className="flex justify-end items-end">
            {interests?.total < 1 && !isLoading ? null : (
              <Pagination total={interests?.total} />
            )}
          </div>
        </div>
      )}

      <div className="block lg:hidden mt-3">
        <MobileRows />
      </div>
      {/* {modals?.show && <ReadMoreModal />}
      {modals?.edit && <AcceptInterestModal />} */}
    </div>
  );
}

function Collections() {
  return (
    <ModalsProvider>
      <Page />
    </ModalsProvider>
  );
}

export default Collections;

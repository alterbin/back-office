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
} from "@/components";
import { givenQueries } from "@/services/queries";
import { Given } from "@/services/queries/givens/types";
import { Remove } from "./sub-component";
import "./styles.scss";

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

function Row(props: Given) {
  const { ...item } = props;

  return (
    <tr>
      <td className="text-center Articulat-Semibold">{item.name || "--"}</td>
      <td className="text-center tx_pink">{item.contact || "--"}</td>
      <td className="text-center">{item?.address || "--"}</td>

      <td className="text-center">
        <div className="flex gap-2 text-center">
          <Remove {...item} />
        </div>
      </td>
    </tr>
  );
}

function MobileRow(props: Given & { index: number }) {
  const { index, ...item } = props;

  return (
    <Disclosure key={item.id}>
      {({ open }) => (
        <div className="rounded-md shadow-sm mb-4">
          <DisclosureButton className="w-full text-left p-3 bg-gray-100 rounded-md">
            <div className="app__friends__table__person">
              <h5 className="app__friends__table__person__h5 Articulat-Semibold">
                {item.name || "--"}
              </h5>
            </div>
          </DisclosureButton>
          <DisclosurePanel className="p-4 bg-white rounded-md shadow-sm">
            <div>
              <label className="app__table_mobile__label">Contact</label>
              <p>{item.contact || "--"}</p>
            </div>

            <hr />
            <div>
              <label className="app__table_mobile__label">Location</label>
              <p>{item?.location || "--"}</p>
            </div>

            <hr />
            <div>
              <label className="app__table_mobile__label">Description</label>
              <p>{item?.description || "--"}</p>
            </div>

            <hr />

            <div className="flex gap-2" />
            <Remove {...item} />
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}

function MobileRows() {
  const pageQueries = useQueries();

  const { data: givens, isLoading } = givenQueries.Read(pageQueries);

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

  const { data: givens, isLoading } = givenQueries.Read(pageQueries);

  const { setModals } = useModals();

  const handleModalShow = (record: Given) => {
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
                <th>Name</th>
                <th>Contact</th>
                <th>Location</th>
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
    </div>
  );
}

function Givens() {
  return (
    <ModalsProvider>
      <Page />
    </ModalsProvider>
  );
}

export default Givens;

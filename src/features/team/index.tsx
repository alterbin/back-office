'use client';

import React, { useMemo } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useSearchParams } from 'next/navigation';
import { ModalsProvider, useModals } from '@/contexts/modals';
import {
  AddButton, MobileSkeleton, Pagination, SearchInput, TableSkeleton,
} from '@/components';
import { teamqueries } from '@/services/queries';
import { Team } from '@/services/queries/team/types';
import { Remove, Modal } from './sub-component';

const useQueries = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const searchTerm = searchParams.get('searchTerm') || '';

  return useMemo(
    () => ({
      page,
      order: 'ASC',
      take: 10,
      searchTerm,
    }),
    [page, searchTerm],
  );
};

function Row(props: Team) {
  const { ...item } = props;

  return (
    <tr>
      <td className="align-middle Articulat-Semibold">
        {item.firstName || '--'}
        {' '}
        {item.lastName || '--'}
      </td>
      <td className="align-middle tx_pink">{item.email || '--'}</td>
      <td className="align-middle">{item?.onboarded ? 'Yes' : 'No'}</td>

      <td className="align-middle">
        <div className="d-flex gap-2">
          <Remove {...item} />
        </div>
      </td>
    </tr>
  );
}

function MobileRow(props: Team & { index: number }) {
  const { index, ...item } = props;

  return (
    <Accordion.Item eventKey={`${index}`} key={item.id}>
      <Accordion.Header>
        <div className="app__friends__table__person">
          <h5 className="app__friends__table__person__h5 Articulat-Semibold">
            {item.firstName || '--'}
            {' '}
            {item.lastName || '--'}
          </h5>
        </div>
      </Accordion.Header>

      <Accordion.Body>
        <div>
          <label className="app__table_mobile__label">Email</label>
          <p>{item.email || '--'}</p>
        </div>

        <hr />
        <div>
          <label className="app__table_mobile__label">Onboarded</label>
          <p>{item?.onboarded ? 'Yes' : 'No'}</p>
        </div>

        <hr />

        <div className="d-flex gap-2" />
        <Remove {...item} />
      </Accordion.Body>
    </Accordion.Item>
  );
}

function MobileRows() {
  const pageQueries = useQueries();

  const { data: teams, isLoading } = teamqueries.Read(pageQueries);

  return (
    <Accordion className="app__table_mobile" defaultActiveKey="0">
      {isLoading ? (
        <MobileSkeleton rows={7} />
      ) : (
        teams?.data?.map((item, index) => <MobileRow {...{ ...item, index }} key={item.id} />)
      )}
      <div className="d-flex justify-content-end align-items-end">
        {teams?.total < 1 && !isLoading ? null : <Pagination total={teams?.total} />}
      </div>
      {!isLoading && teams?.total < 1 && <p>No record available</p>}
    </Accordion>
  );
}

function Page() {
  const pageQueries = useQueries();

  const { data: teams, isLoading } = teamqueries.Read(pageQueries);

  const { setModals } = useModals();

  const handleModalShow = (record: Team) => {
    setModals((prev) => ({ ...prev, show: true, record }));
  };

  return (
    <div className="app__dashboard_layout__main_px app_home app__products_catalogue">
      <div className="d-flex justify-content-between">
        <SearchInput />
        <AddButton title="Invite Admin" action={handleModalShow} />
      </div>

      {isLoading ? (
        <TableSkeleton rows={9} columns={6} />
      ) : (
        <div className="table-responsive d-none d-lg-block">
          <table className="app__admin__table table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Onboarded</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {teams?.total < 1 && !isLoading ? (
                <tr>
                  <td colSpan={6} className="no-data-cell">
                    <div className="no-data-message">No Data</div>
                  </td>
                </tr>
              ) : (
                teams?.data?.map((item) => <Row {...item} key={item.id} />)
              )}
            </tbody>
          </table>
          <div className="d-flex justify-content-end align-items-end">
            {teams?.total < 1 && !isLoading ? null : <Pagination total={teams?.total} />}
          </div>
        </div>
      )}

      <div className="d-block d-lg-none mt-3">
        <MobileRows />
      </div>
    </div>
  );
}

function Teams() {
  return (
    <ModalsProvider>
      <Modal />

      <Page />
    </ModalsProvider>
  );
}

export default Teams;

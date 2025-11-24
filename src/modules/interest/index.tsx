'use client';

import React, {useMemo, useState} from 'react';
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react';
import {useSearchParams} from 'next/navigation';
import {ModalsProvider, useModals} from '@/contexts/modals';
import {
  AddButton,
  DateRangePicker,
  Filter,
  MobileSkeleton,
  Pagination,
  SearchInput,
  TableSkeleton,
  Tooltip,
} from '@/components';
import {interestQueries} from '@/services/queries';
import {
  AcceptInterestModal,
  ReadMoreModal,
  Remove,
  useInterestActions,
} from './sub-component';
import './styles.scss';
import {Interest} from '@/services/queries/interest/types';
import moment from 'moment';
import {Actionables} from '@/components/shared/actionables';
import {useOutsideClick} from '@/hooks';
import {InterestsFilter} from './sub-component/filter';

const useQueries = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const searchTerm = searchParams.get('searchTerm') || '';
  const fromDate = searchParams.get('from') || '';
  const toDate = searchParams.get('to') || '';
  const given = searchParams.get('given') || '';
  const isFullfilled = searchParams.get('isFullfilled') || '';

  return useMemo(
    () => ({
      page,
      order: 'ASC',
      take: 10,
      searchTerm,
      fromDate,
      toDate,
      given,
      isFullfilled,
    }),
    [page, searchTerm, fromDate, toDate, given, isFullfilled],
  );
};

function Row(props: Interest) {
  const {...item} = props;

  const {getActions} = useInterestActions(props);

  return (
    <tr>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <p className="text-gray-700 text-theme-sm lowercase">
            {item?.givens?.name || '--'}
          </p>
        </div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <p className="text-gray-700 text-theme-sm lowercase">
            {item.contact || '--'}
          </p>
        </div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <Tooltip tooltip={item.note}>
          <div className="w-full max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
            <span className="text-ellipsis max-w-[300px] text-gray-700 text-theme-sm lowercase">
              {item.note || '--'}
            </span>
          </div>
        </Tooltip>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <Tooltip tooltip={item.shippingAddress}>
          <div
            className="w-full max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis"
            title={item.shippingAddress}
          >
            <span className="text-ellipsis max-w-[300px] text-gray-700 text-theme-sm lowercase">
              {item.shippingAddress || '--'}
            </span>
          </div>
        </Tooltip>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <p className="text-gray-700 text-theme-sm lowercase">
            {item?.isAccepted ? 'Yes' : 'No'}
          </p>
        </div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <p className="text-gray-700 text-theme-sm lowercase">
            {item?.createdAt
              ? moment(item?.createdAt).format('MMM D, YYYY [at] h:mma')
              : '--'}
          </p>
        </div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="text-gray-700 text-theme-sm lowercase">
            <Actionables actions={getActions()} />
          </div>
        </div>
      </td>
    </tr>
  );
}

function MobileRow(props: Interest & {index: number}) {
  const {index, ...item} = props;

  return (
    <Disclosure key={item.id}>
      {({open}) => (
        <div className="rounded-md shadow-sm mb-4">
          <DisclosureButton className="w-full text-left p-3 bg-gray-100 rounded-md">
            <div className="app__friends__table__person">
              <h5 className="app__friends__table__person__h5 Articulat-Semibold">
                {item.contact || '--'}
              </h5>
            </div>
          </DisclosureButton>
          <DisclosurePanel className="p-4 bg-white rounded-md shadow-sm">
            <div>
              <label className="app__table_mobile__label">Note</label>
              <p>{item.note || '--'}</p>
            </div>

            <hr />
            <div>
              <label className="app__table_mobile__label">
                Shipping Address
              </label>
              <p>{item?.shippingAddress || '--'}</p>
            </div>

            <hr />
            <div>
              <label className="app__table_mobile__label">Created</label>
              <p>
                {item?.createdAt
                  ? moment(item?.createdAt).format('MMM D, YYYY [at] h:mma')
                  : '--'}
              </p>
            </div>
            <hr />
            <div>
              <label className="app__table_mobile__label">Accepted</label>
              <p>{item?.isAccepted ? 'Yes' : 'No'}</p>
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

  const {data: interests, isLoading} = interestQueries.Read(pageQueries);

  return (
    <div className="app__table_mobile">
      {isLoading ? (
        <MobileSkeleton rows={7} />
      ) : (
        interests?.data?.map((item, index) => (
          <MobileRow {...{...item, index}} key={item.id} />
        ))
      )}
      <div className="flex justify-end items-end">
        {interests?.total < 1 && !isLoading ? null : (
          <Pagination total={interests?.total} />
        )}
      </div>
    </div>
  );
}

function Page() {
  const pageQueries = useQueries();

  const {data: interests, isLoading} = interestQueries.Read(pageQueries);
  const [showFilter, setShowFilter] = useState(false);

  const {modals, setModals} = useModals();

  const [ref] = useOutsideClick(() => setShowFilter(false));

  const handleModalShow = (record: Interest) => {
    setModals(prev => ({...prev, show: true, record}));
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4">
        <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <DateRangePicker />
          {showFilter && (
            <div
              className="redirect__filter__container"
              onClick={() => setShowFilter(false)}
            />
          )}

          <div className="flex gap-2">
            <SearchInput />
            <div className="relative">
              <button
                type="button"
                className="text-theme-sm shadow-theme-xs inline-flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                disabled={isLoading}
                onClick={() => setShowFilter(!showFilter)}
              >
                <p className="text-sm">Filter</p>
                <Filter />
              </button>

              {showFilter && (
                <div
                  className={`redirect__filter__container__wrapper absolute top-10 right-0 z-50 shadow-lg ${
                    showFilter ? '' : 'hidden'
                  } `}
                  ref={ref}
                >
                  <InterestsFilter
                    pageQueries={pageQueries}
                    setShowFilter={setShowFilter}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton rows={9} columns={6} />
        ) : (
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full">
              <thead className="border-gray-100 border-y bg-gray-50">
                <tr>
                  <th className="px-6 py-3 whitespace-nowrap text-start">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Given Name
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap text-start">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Contact
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap text-start">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Note
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap text-start">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Address
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap text-start">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Accepted
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap text-start">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Created
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap text-start">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Action
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {interests?.total < 1 && !isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-3 whitespace-nowrap">
                      <div className="text-gray-700 text-lg font-bold pt-5 text-center">
                        No Data
                      </div>
                    </td>
                  </tr>
                ) : (
                  interests?.data?.map(item => <Row {...item} key={item.id} />)
                )}
              </tbody>
            </table>
            <div className="flex justify-end items-end px-6 py-3">
              <div className="text-gray-700 text-theme-sm">
                {interests?.total < 1 && !isLoading ? null : (
                  <Pagination total={interests?.total} />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="block lg:hidden mt-3">
          <MobileRows />
        </div>
        {modals?.show && <ReadMoreModal />}
        {modals?.edit && <AcceptInterestModal />}
      </div>
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

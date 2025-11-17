'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {ModalsProvider, useModals} from '@/contexts/modals';
import {
  AddButton,
  DateRangePicker,
  Filter,
  MobileSkeleton,
  Pagination,
  SearchInput,
  TableSkeleton,
} from '@/components';
import {givenQueries} from '@/services/queries';
import {Given} from '@/services/queries/givens/types';
import {EditModal, Remove} from './sub-component';
import './styles.scss';
import {useActions} from './sub-component/actions';
import {Actionables} from '@/components/shared/actionables';
import moment from 'moment';
import {useQueryString} from '@/hooks/use-query';
import {GivenFilter} from './sub-component/filter';
import {useOutsideClick} from '@/hooks';

const useQueries = () => {
  const searchParams = useSearchParams();

  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  const searchTerm = searchParams.get('searchTerm') || '';
  const fromDate = searchParams.get('from') || '';
  const toDate = searchParams.get('to') || '';
  const isFullfilled = searchParams.get('isFullfilled') || '';

  return useMemo(
    () => ({
      page,
      order: 'ASC',
      take: 10,
      searchTerm,
      fromDate,
      toDate,
      isFullfilled,
    }),
    [page, searchTerm, fromDate, toDate, isFullfilled],
  );
};

function Row(props: Given) {
  const {...item} = props;
  const {getActions} = useActions(props);

  return (
    <tr>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <p className="text-gray-700 text-theme-sm lowercase">
            {item.name || '--'}
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
        <div className="flex items-center">
          <p className="text-gray-700 text-theme-sm lowercase">
            {item?.address || '--'}
          </p>
        </div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <p className="text-gray-700 text-theme-sm lowercase">
            {item?.rank || '--'}
          </p>
        </div>
      </td>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <p className="text-gray-700 text-theme-sm lowercase">
            {item?.isFulfilled ? 'Yes' : 'No'}
          </p>
        </div>
      </td>

      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="text-gray-700 text-theme-sm lowercase">
            {/* <Remove {...item} /> */}
            <Actionables actions={getActions()} />
          </div>
        </div>
      </td>
    </tr>
  );
}

function MobileRow(props: Given & {index: number}) {
  const {index, ...item} = props;

  return (
    <Disclosure key={item.id}>
      {({open}) => (
        <div className="rounded-md shadow-sm mb-4">
          <DisclosureButton className="w-full text-left p-3 bg-gray-100 rounded-md">
            <div className="app__friends__table__person">
              <h5 className="app__friends__table__person__h5 Articulat-Semibold">
                {item.name || '--'}
              </h5>
            </div>
          </DisclosureButton>
          <DisclosurePanel className="p-4 bg-white rounded-md shadow-sm">
            <div>
              <label className="app__table_mobile__label">Contact</label>
              <p>{item.contact || '--'}</p>
            </div>

            <hr />
            <div>
              <label className="app__table_mobile__label">Location</label>
              <p>{item?.location || '--'}</p>
            </div>

            <hr />
            <div>
              <label className="app__table_mobile__label">Description</label>
              <p>{item?.description || '--'}</p>
            </div>
            <hr />
            <div>
              <label className="app__table_mobile__label">Rank</label>
              <p>{item?.rank || '--'}</p>
            </div>

            <hr />
            <div>
              <label className="app__table_mobile__label">Fulfilled</label>
              <p>{item?.isFulfilled || '--'}</p>
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

  const {data: givens, isLoading} = givenQueries.Read(pageQueries);

  return (
    <div className="app__table_mobile">
      {isLoading ? (
        <MobileSkeleton rows={7} />
      ) : (
        givens?.data?.map((item, index) => (
          <MobileRow {...{...item, index}} key={item.id} />
        ))
      )}
      <div className="flex justify-end items-end">
        {givens?.total < 1 && !isLoading ? null : (
          <Pagination total={givens?.total} />
        )}
      </div>
    </div>
  );
}

function Page() {
  const pageQueries = useQueries();

  const {data: givens, isLoading} = givenQueries.Read(pageQueries);
  const [showFilter, setShowFilter] = useState(false);

  const [ref] = useOutsideClick(() => setShowFilter(false));

  const {modals, setModals} = useModals();

  const handleModalShow = (record: Given) => {
    setModals(prev => ({...prev, show: true, record}));
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4">
        <div className="flex flex-col gap-5 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <DateRangePicker />
          </div>
          <div className="flex gap-3 sm:flex-row sm:items-center">
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
                  <GivenFilter
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
                        Name
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
                        Location
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap text-start">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Rank
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap text-start">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Fulfilled
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

              <tbody>
                {givens?.total < 1 && !isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-3 whitespace-nowrap">
                      <div className="text-gray-700 text-lg font-bold pt-5 text-center">
                        No Data
                      </div>
                    </td>
                  </tr>
                ) : (
                  givens?.data?.map(item => <Row {...item} key={item.id} />)
                )}
              </tbody>
            </table>
            <div className="flex justify-end items-end px-6 py-3">
              <div className="text-gray-700 text-theme-sm">
                {givens?.total < 1 && !isLoading ? null : (
                  <Pagination total={givens?.total} />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="block md:hidden mt-3">
          <MobileRows />
        </div>
        {modals.edit && <EditModal />}
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

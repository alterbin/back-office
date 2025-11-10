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
import {collectionQueries} from '@/services/queries';
// import {
//   AcceptInterestModal,
//   ReadMoreModal,
//   Remove,
//   useInterestActions,
// } from "./sub-component";
import './styles.scss';
import {Interest} from '@/services/queries/interest/types';
import moment from 'moment';
import {Actionables} from '@/components/shared/actionables';
import {useOutsideClick} from '@/hooks';
import {ICollection} from '@/services/queries/collections/types';
import {
  DeleteCollectionModal,
  Modal,
  useActions,
  ViewMoreModal,
} from './sub-components';

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

function Row(props: ICollection) {
  const {...item} = props;

  const {getActions} = useActions(props);

  return (
    <tr>
      <td className="px-6 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <p className="text-gray-700 text-theme-sm lowercase">
            {item?.title || '--'}
          </p>
        </div>
      </td>

      <td className="px-6 py-3 whitespace-nowrap">
        <Tooltip tooltip={item.description}>
          <div className="w-full max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
            <span className="text-ellipsis max-w-[300px] text-gray-700 text-theme-sm lowercase">
              {item.description || '--'}
            </span>
          </div>
        </Tooltip>
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

function MobileRow(props: ICollection & {index: number}) {
  const {index, ...item} = props;

  return (
    <Disclosure key={item.id}>
      {({open}) => (
        <div className="lg:hidden rounded-md shadow-sm mb-4 px-6 py-3">
          <DisclosureButton className="w-full text-left p-3 bg-gray-100 rounded-md">
            <div className="flex items-center">
              <h5 className="text-gray-700 text-theme-sm lowercase">
                {item.title || '--'}
              </h5>
            </div>
          </DisclosureButton>
          <DisclosurePanel className="p-4 bg-white rounded-md shadow-sm">
            <div>
              <label className="app__table_mobile__label !text-gray-800 !font-semibold">Description</label>
              <p className="text-gray-800 font-medium">{item.description || '--'}</p>
            </div>

            <hr />

            <hr />
            <div>
              <label className="app__table_mobile__label !text-gray-800 !font-semibold">Created</label>
              <p className='text-gray-800 font-medium'>
                {item?.createdAt
                  ? moment(item?.createdAt).format('MMM D, YYYY [at] h:mma')
                  : '--'}
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

  const {data: interests, isLoading} = collectionQueries.Read(pageQueries);

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

  const {data: interests, isLoading} = collectionQueries.Read(pageQueries);
  const [showFilter, setShowFilter] = useState(false);

  const {modals, setModals} = useModals();

  const [ref] = useOutsideClick(() => setShowFilter(false));

  const handleModalShow = (record: Interest) => {
    setModals(prev => ({...prev, show: true, record}));
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4">
        <div className=" gap-5 px-6 mb-4 sm:hidden md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold !text-gray-800">
              <AddButton
                title="Add collection"
                action={() => setModals({...modals, create: true, record: {}})}
              />
            </h3>
          </div>
          <div className="flex gap-3 sm:flex-row sm:items-center">
            <SearchInput />
            {showFilter && (
              <div
                className="redirect__filter__container"
                onClick={() => setShowFilter(false)}
              />
            )}
          </div>
        </div>

        {isLoading ? (
          <TableSkeleton rows={9} columns={6} />
        ) : (
          <div className="sm:hidden md:block max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full">
              <thead className="border-gray-100 border-y bg-gray-50">
                <tr>
                  <th className="px-6 py-3 whitespace-nowrap text-start">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Title
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Description
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Created at
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="block font-medium text-gray-500 text-theme-xs">
                        Actions
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
            <div className="sm:hidden flex justify-end items-end px-6 py-3">
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
        {modals?.create && <Modal />}
        {modals?.show && <ViewMoreModal />}
        {modals?.delete && <DeleteCollectionModal />}
      </div>
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

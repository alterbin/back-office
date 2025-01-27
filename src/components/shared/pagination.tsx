// eslint-disable-next-line import/no-extraneous-dependencies
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useQueryString } from '@/hooks/use-query';

interface IProps extends ReactPaginateProps {
  pageCount: number
}

function EPagination(props: IProps) {
  const { pageCount, onPageChange, ...restProps } = props;

  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      pageCount={pageCount}
      breakClassName="break-me"
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      // eslint-disable-next-line react/jsx-no-bind
      onPageChange={onPageChange}
      containerClassName="pagination"
      activeClassName="active"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousLinkClassName="page-link"
      previousClassName="page-item"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLinkClassName="page-link"
      {...restProps}
    />
  );
}

interface EPaginationProps {
  total: number;
}

export function Pagination({ total }: EPaginationProps) {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { createQueryString } = useQueryString();

  const page = searchParams.get('page');

  const currentPage = page ? Number(page) - 1 : 0;

  const pageCount = Math.ceil((total ?? 0) / 10);

  function onPageChange(selected: number) {
    const newQueryString = createQueryString('page', (selected + 1).toString());
    push(`${pathname}?${newQueryString}`);
  }

  return (
    <EPagination
      pageCount={pageCount}
      onPageChange={({ selected }) => onPageChange(selected)}
      initialPage={currentPage}
    />
  );
}

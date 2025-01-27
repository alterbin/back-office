import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '@/services/helper';
import { useQueryString } from '@/hooks/use-query';
import { useModals } from '@/contexts/modals';
import { AxiosError } from 'axios';
import api from '../../api';
import queryKey from './keys';
import {
  CancelTransactionResponse,
  PageQuery, TempData, Transactions,
} from './types';

const BASE_URL = '/v1/transactions';

const readFn = (query: Partial<PageQuery>) => {
  let url = `${BASE_URL}?page=${query.page}&take=${query.take}&sortDir=${query.sortDir}`;

  if (query.searchTerm) {
    url += `&searchTerm=${query?.searchTerm}`;
  }

  if (query.type) {
    url += `&type=${query?.type}`;
  }

  if (query.status) {
    url += `&status=${query?.status}`;
  }

  if (query.source) {
    url += `&source=${query?.source}`;
  }

  if (query.currencyType) {
    url += `&currencyType=${query?.currencyType}`;
  }

  if (query.toDate && query.fromDate) {
    url += `&toDate=${query?.toDate}&fromDate=${query?.fromDate}`;
  }

  if (query.maxAmount && query.minAmount) {
    url += `&minAmount=${query?.minAmount}&maxAmount=${query?.maxAmount}`;
  }

  return url;
};

const Read = (
  options: Partial<PageQuery> = {
    page: 1,
    sortDir: 'ASC',
    take: 10,
    searchTerm: '',
  },
) => {
  const url = readFn({ ...options });
  const { asPath } = useQueryString();

  const response = useQuery({
    queryFn: () => api.get({ url }),
    queryKey: [queryKey.read, asPath],
    ...options,
    refetchOnMount: 'always',
  });
  if (response.isError) {
    errorToast(response.data?.message);
  }

  const temp = response?.data?.data;

  const transactions: Transactions = {
    data: [],
    total: 0,
  };

  if (temp) {
    transactions.data = temp?.data?.map(({ ref, ...rest }: TempData) => {
      return {
        ...rest,
        reference: ref,
      };
    });
    transactions.total = temp?.total;
  }

  return {
    ...response,
    data: transactions as Transactions,
  };
};
const CancelTransaction = (options = {}) => {
  const { setModals } = useModals();
  const queryClient = useQueryClient();

  const { mutate, ...response } = useMutation({
    mutationFn: api.patch,
    mutationKey: [queryKey.create],
    ...options,
    onSuccess: (data: CancelTransactionResponse) => {
      successToast(data.description);
      setModals((prev) => ({ ...prev, show: false }));
      queryClient.invalidateQueries({ queryKey: [queryKey.read] });
    },
    onError: (err: AxiosError<Error>) => {
      errorToast(err?.response?.data?.message || 'Something went wrong');
    },
  });
  return {
    ...response,
    mutate: (body: {id : string}) => {
      mutate({ url: `${BASE_URL}/${body.id}/cancel` });
    },
  };
};

export const transactionsqueries = {
  Read,
  CancelTransaction,
};

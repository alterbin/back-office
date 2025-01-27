import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '@/services/helper';
import { useModals } from '@/contexts/modals';
import { AxiosError } from 'axios';
import { useQueryString } from '@/hooks/use-query';
import api from '../../api';
import queryKey from './keys';
import {
  BlockUserResponse, IUsers,
  PageQuery,
} from './types';
import { TempData, Transactions } from '../transactions/types';

const BASE_URL = '/v1/users';

const readFn = (query: Partial<PageQuery>) => {
  let url = `${BASE_URL}?page=${query.page}&take=${query.take}&sortDir=${query.sortDir}`;

  if (query.searchTerm) {
    url += `&searchTerm=${query?.searchTerm}`;
  }

  if (query.type) {
    url += `&type=${query?.type}`;
  }

  if (query.toDate && query.fromDate) {
    url += `&toDate=${query?.toDate}&fromDate=${query?.fromDate}`;
  }

  if (query.maxBalance && query.minBalance) {
    url += `&minBalance=${query?.minBalance}&maxBalance=${query?.maxBalance}`;
  }

  return url;
};

const readTransactionFn = (query: Partial<PageQuery>) => {
  let url = `${BASE_URL}/${query.id}/transactions?page=${query.page}&take=${query.take}&sortDir=${query.sortDir}`;

  if (query.searchTerm) {
    url += `&searchTerm=${query?.searchTerm}`;
  }

  if (query.type) {
    url += `&type=${query?.type}`;
  }

  if (query.toDate && query.fromDate) {
    url += `&toDate=${query?.toDate}&fromDate=${query?.fromDate}`;
  }

  if (query.maxBalance && query.minBalance) {
    url += `&minBalance=${query?.minBalance}&maxBalance=${query?.maxBalance}`;
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

  return {
    ...response,
    data: response?.data?.data as IUsers,
  };
};

const BlockUser = (options = {}) => {
  const { setModals } = useModals();
  const queryClient = useQueryClient();

  const { mutate, ...response } = useMutation({
    mutationFn: api.patch,
    mutationKey: [queryKey.create],
    ...options,
    onSuccess: (data: BlockUserResponse) => {
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
      mutate({ url: `${BASE_URL}/${body.id}/block` });
    },
  };
};

const UnblockUser = (options = {}) => {
  const { setModals } = useModals();
  const queryClient = useQueryClient();

  const { mutate, ...response } = useMutation({
    mutationFn: api.patch,
    mutationKey: [queryKey.create],
    ...options,
    onSuccess: (data: BlockUserResponse) => {
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
      mutate({ url: `${BASE_URL}/${body.id}/unblock` });
    },
  };
};

const ReadOneTransaction = (
  options: Partial<PageQuery> = {
    page: 1,
    sortDir: 'ASC',
    take: 10,
    searchTerm: '',
    id: '',
  },
) => {
  const url = readTransactionFn({ ...options });

  const { asPath } = useQueryString();

  const response = useQuery({
    queryFn: () => api.get({ url }),
    queryKey: [queryKey.read, asPath],
    ...options,
    refetchOnMount: 'always',
    enabled: !!options.id,
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

export const usersqueries = {
  Read,
  BlockUser,
  UnblockUser,
  ReadOneTransaction,
};

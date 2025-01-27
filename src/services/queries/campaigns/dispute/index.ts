import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '@/services/helper';
import { useQueryString } from '@/hooks/use-query';
import { useModals } from '@/contexts/modals';
import { AxiosError } from 'axios';
import api from '../../../api';
import queryKey from './keys';
import { IDisputes, PageQuery, TDispute } from './types';
import { BlockUserResponse } from '../../users/types';

const BASE_URL = '/v1/disputes';

const readFn = (query: Partial<PageQuery>) => {
  let url = `${BASE_URL}?page=${query.page}&take=${query.take}&sortDir=${query.sortDir}`;

  if (query.searchTerm) {
    url += `&searchTerm=${query?.searchTerm}`;
  }
  if (query.status) {
    url += `&status=${query?.status}`;
  }

  return url;
};

const Read = (
  options: Partial<PageQuery> = {
    page: 1,
    sortDir: 'DESC',
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
    errorToast((response?.error as any)?.response.data.message[0] || response?.error.message);
  }
  const disputeData = response?.data?.data || {
    data: [],
    total: 0,
  };

  return {
    ...response,
    data: disputeData as IDisputes,
  };
};

const ReadOne = (
  options = {
    id: '',
  },
) => {
  const { asPath } = useQueryString();

  const response = useQuery({
    queryFn: () => api.get({ url: `${BASE_URL}/${options.id}` }),
    queryKey: [queryKey.read, asPath],
    enabled: !!options?.id,
    ...options,
    refetchOnMount: 'always',
  });
  if (response.isError) {
    errorToast(response.data?.message);
  }

  return {
    ...response,
    data: response?.data?.data as TDispute,
  };
};

const Resolve = (options = {}) => {
  const { setModals } = useModals();
  const queryClient = useQueryClient();

  const { mutate, ...response } = useMutation({
    mutationFn: api.patch,
    mutationKey: [queryKey.patch],
    ...options,
    onSuccess: (data: BlockUserResponse) => {
      successToast(data.description);
      setModals((prev) => ({ ...prev, delete: false }));
      queryClient.invalidateQueries({ queryKey: [queryKey.read] });
    },
    onError: (err: AxiosError<Error>) => {
      errorToast(err?.response?.data?.message || 'Something went wrong');
    },
  });
  return {
    ...response,
    mutate: (body: {id : string}) => {
      mutate({ url: `${BASE_URL}/${body.id}/resolve` });
    },
  };
};

export const disputequeries = {
  Read,
  ReadOne,
  Resolve,
};

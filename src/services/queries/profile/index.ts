import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useModals } from '@/contexts/modals';
import { Error } from '@/components/interface';
import api from '../../api';
import { errorToast, successToast } from '../../helper';
import queryKey from './keys';
import {
  ChangePassword, EditProfile, Profile, UpdateResponse,
} from './types';

const BASE_URL = '/v1/profile';

export const readFn = () => api.get({ url: `${BASE_URL}` });

const Read = (options = {}) => {
  const response = useQuery({
    queryFn: () => readFn(),
    queryKey: [queryKey.read],
    ...options,
    refetchOnMount: 'always',
  });

  if (response.isError) {
    errorToast(response.data?.message);
  }

  return {
    ...response,
    data: response?.data?.data as Profile,
  };
};

const UpdatePassword = (options = {}) => {
  const { setModals } = useModals();
  const queryClient = useQueryClient();
  const url = `${BASE_URL}/password`;

  const { mutate, ...response } = useMutation({
    mutationFn: api.patch,
    mutationKey: [queryKey.put],
    ...options,
    onSuccess: (data: UpdateResponse) => {
      successToast(data.description);
      setModals((prev) => ({ ...prev, edit: false }));
      queryClient.invalidateQueries({ queryKey: [queryKey.read] });
    },
    onError: (err: AxiosError<Error>) => {
      if (err.response && err.response.data && err.response.data.message) {
        errorToast(err.response.data.message);
      } else {
        errorToast('Something went wrong');
      }
    },
  });
  return {
    ...response,
    mutate: (body: ChangePassword) => {
      mutate({ url, body: { ...body } });
    },
  };
};
const Update = (options = { path: '' }) => {
  const { setModals } = useModals();
  const queryClient = useQueryClient();

  const { mutate, ...response } = useMutation({
    mutationFn: api.patch,
    mutationKey: [queryKey.create],
    ...options,
    onSuccess: (data: UpdateResponse) => {
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
    mutate: (body: EditProfile) => {
      mutate({ url: BASE_URL, body: { ...body } });
    },
  };
};

export const profileQueries = { Read, Update, UpdatePassword };

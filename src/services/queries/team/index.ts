import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '@/services/helper';
import { useModals } from '@/contexts/modals';
import toast from 'react-hot-toast';
import routes from '@/utils/routes';
import { useRouter } from 'next/navigation';
import { getLocalStorage } from '@/utils';
import config from '@/utils/config';
import { useQueryString } from '@/hooks/use-query';
import api from '../../api';
import queryKey from './keys';
import {
  Invite as TypeInvite,
  InviteResponse, IOnboard, OnboardResponse, ReadRequest, Teams,
} from './types';
import { User } from '../auth/types';

const BASE_URL = '/v1/admin';

const Read = (options: ReadRequest = {
  page: 1, order: 'ASC', take: 10, searchTerm: '',
}) => {
  const {
    page, order, take, searchTerm,
  } = options;
  const url = `${BASE_URL}?page=${page}&order=${order}&take=${take}&searchTerm=${searchTerm}`;
  const { asPath } = useQueryString();

  console.log('hayb asPath', asPath);

  const response = useQuery({
    queryFn: () => api.get({ url }),
    queryKey: [queryKey.read, asPath],
    ...options,
    refetchOnMount: 'always',
  });
  if (response.isError) {
    errorToast(response?.error?.message);
  }

  return {
    ...response,
    data: response?.data?.data as Teams,
  };
};

const Invite = (
  options = { },
) => {
  const { setModals } = useModals();
  const queryClient = useQueryClient();
  const { asPath } = useQueryString();

  const { mutate, ...response } = useMutation({
    mutationFn: api.post,
    mutationKey: [queryKey.create],
    ...options,
    onSuccess: async (data: InviteResponse) => {
      successToast(data.description);
      setModals((prev) => ({ ...prev, show: false }));
      // await queryClient.setQueryData([queryKey.read, asPath], (oldData: Teams) => {
      //   return {
      //     ...oldData,
      //     data: [data.data, ...oldData.data],
      //     total: oldData.total + 1,
      //   };
      // });
      console.log('second asPath', asPath);

      await queryClient.invalidateQueries({ queryKey: [queryKey.read, asPath] });
    },
    onError: (err: any) => {
      if (err.response && err.response.data && err.response.data.message) {
        errorToast(err.response.data.message);
      } else {
        errorToast('Something went wrong');
      }
    },
  });
  return {
    ...response,
    mutate: (body: TypeInvite) => {
      mutate({ url: `${BASE_URL}/invite`, body: { ...body } });
    },
  };
};

const Onboard = () => {
  const { push } = useRouter();

  const { mutate, ...response } = useMutation({
    mutationFn: api.patch,
    mutationKey: [queryKey.patch],
    onSuccess: (data: OnboardResponse) => {
      toast.success(data.description);
      localStorage.removeItem(config.user);
      push(routes.dashboard.path);
    },
    onError: (err: any) => {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
    },
  });
  const user = getLocalStorage<User>(config.user);
  return {
    ...response,
    mutate: (body: IOnboard) => {
      mutate({
        url: `${BASE_URL}/${user?.id}`,
        body: { ...body },
      });
    },
  };
};

const Del = () => {
  const queryClient = useQueryClient();

  const { mutate, ...response } = useMutation({
    mutationFn: api.delete,
    mutationKey: [queryKey.delete],
    onSuccess: async (data: OnboardResponse) => {
      successToast(data?.description || 'Success');
      queryClient.invalidateQueries({ queryKey: [queryKey.read], type: 'all', exact: false });
      document.body.click();
    },
    onError: (err: any) => {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
    },
  });
  return {
    ...response,
    mutate: (body: { id: string }) => {
      mutate({
        url: `${BASE_URL}/${body?.id}`,
        body: { ...body },
      });
    },
  };
};

export const teamqueries = {
  Read, Invite, Onboard, Del,
};

import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { saveLocalStorage } from '@/utils';
import routes from '@/utils/routes';
import config from '@/utils/config';
import api from '../../api';
import queryKey from './keys';
import {
  LoginRequest, VerifyAccount, IResetPassword,
  LoginResponse,
} from './types';

const BASE_URL = '/api/auth';

const Login = (options = {}) => {
  const { push } = useRouter();

  const basePath = routes.givens.path;
  const search = useSearchParams();
  const next = search.get('next');

  const { mutate, ...response } = useMutation({
    mutationFn: api.post,
    mutationKey: [queryKey.login],
    ...options,
    onSuccess: (data: LoginResponse) => {
      toast.success(data.description);
      saveLocalStorage(config.tokenKey, data.data.accessToken);

      if (data.data?.profile) {
        push(next || basePath);
      }
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
    mutate: (body: LoginRequest) => {
      mutate({ url: `${BASE_URL}/login`, body: { ...body } });
    },
  };
};

const Read = (options: VerifyAccount = { confirmToken: '', action: '' }) => {
  const { confirmToken, action } = options;

  const url = `v1/auth/verify-account?confirmToken=${confirmToken}&action=${action}`;

  const response = useQuery({
    queryFn: () => api.get({ url }),
    queryKey: [queryKey.read],
    ...options,
    enabled: !!confirmToken && !!action,
    refetchOnMount: 'always',
  });

  if (response.isSuccess) {
    toast.success(response.data?.message);
  }
  if (response.isError) {
    toast.error(response.data?.message);
  }

  return {
    ...response,
    data: (response.data || {}) as {},
  };
};

const ForgotPassword = (
  options = { },
) => {
  const { push } = useRouter();

  const { mutate, ...response } = useMutation({
    mutationFn: api.post,
    mutationKey: [queryKey.forgotPassword],
    ...options,
    onSuccess: (data: Omit<LoginResponse, 'data'>) => {
      toast.success(data.description);
      push(routes.auth.resetPassword.path);
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
    mutate: (body: { email: string }) => {
      mutate({ url: `${BASE_URL}/password/forgot`, body: { ...body } });
    },
  };
};

const ResetPassword = () => {
  const { push } = useRouter();

  const { mutate, ...response } = useMutation({
    mutationFn: api.post,
    mutationKey: [queryKey.resetPassword],
    onSuccess: (data: Omit<LoginResponse, 'data'>) => {
      toast.success(data.description);
      push(routes.home.path);
    },
    onError: (err: any) => {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
    },
  });
  // const forgotpass = getLocalStorage("forgotpass-token")
  return {
    ...response,
    mutate: (body: IResetPassword) => {
      mutate({
        url: `${BASE_URL}/password/reset`,
        body: { ...body },
      });
    },
  };
};

export const authQueries = {
  Login, Read, ForgotPassword, ResetPassword,
};

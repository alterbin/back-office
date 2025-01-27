import { getQueryKeys } from '../../helper';

const namespace = 'auth';

const queryKeys = {
  ...getQueryKeys(namespace),
  login: `${namespace}/login`,
  register: `${namespace}/register`,
  revalidate: `${namespace}/revalidate-account`,
  forgotPassword: `${namespace}/forgotPassword`,
  resetPassword: `${namespace}/resetPassword`,
};

export default queryKeys;

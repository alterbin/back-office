import { getQueryKeys } from '@/services/helper';

const namespace = 'users';

export default {
  ...getQueryKeys(namespace),
  readTransaction: `${namespace}/Transaction`,
};

import { useQuery } from '@tanstack/react-query';
import { errorToast } from '@/services/helper';
import { useQueryString } from '@/hooks/use-query';
import api from '../../api';
import queryKey from './keys';
import {
  ICampaigns,
  PageQuery,
} from './types';

const BASE_URL = '/v1/campaigns';

const readFn = (query: Partial<PageQuery>) => {
  let url = `${BASE_URL}?page=${query.page}&take=${query.take}&sortDir=${query.sortDir}`;

  if (query.searchTerm) {
    url += `&searchTerm=${query?.searchTerm}`;
  }

  if (query.toDate && query.fromDate) {
    url += `&toDate=${query?.toDate}&fromDate=${query?.fromDate}`;
  }

  if (query.maxAmount && query.minAmount) {
    url += `&minAmount=${query?.minAmount}&maxAmount=${query?.maxAmount}`;
  }

  if (query.maxFollowers && query.minFollowers) {
    url += `&minFollowers=${query?.minFollowers}&maxFollowers=${query?.maxFollowers}`;
  }
  if (query.platforms?.length) {
    url += `&platforms=${query?.platforms}`;
  }
  if (query.status) {
    url += `&status=${query?.status}`;
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
  const campaignsData = response?.data?.data || {
    data: [],
    total: 0,
  };

  return {
    ...response,
    data: campaignsData as ICampaigns,
  };
};

export const campaignsqueries = {
  Read,
};

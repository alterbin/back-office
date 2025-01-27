import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { errorToast, successToast } from '@/services/helper';
import { useQueryString } from '@/hooks/use-query';
import { useModals } from '@/contexts/modals';
import { AxiosError } from 'axios';
import api from '../../../api';
import queryKey from '../keys';
import {
  ApprovalResponse,
  ApproveProjectParam,
  PageQuery,
} from '../types';
import {
  IBudgets, ICampaignDetail, IProjects, IProposals, ISubmissions,
} from './types';

const BASE_URL = '/v1/campaigns';

const readProposalsFn = (query: Partial<PageQuery>) => {
  let url = `${BASE_URL}/${query.id}/proposals?page=${query.page}&take=${query.take}&sortDir=${query.sortDir}`;

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

const readBudgetsFn = (query: Partial<PageQuery>) => {
  let url = `${BASE_URL}/${query.id}/budgets?page=${query.page}&take=${query.take}&sortDir=${query.sortDir}`;

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

const readProjectsFn = (query: Partial<PageQuery>) => {
  let url = `${BASE_URL}/${query.id}/projects?page=${query.page}&take=${query.take}&sortDir=${query.sortDir}`;

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

const readSubmissionsFn = (query: Partial<PageQuery>) => {
  let url = `${BASE_URL}/project/${query.id}/submissions?page=${query.page}&take=${query.take}&sortDir=${query.sortDir}`;

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

const ReadDetails = (
  options: Partial<PageQuery> = {
    page: 1,
    sortDir: 'ASC',
    take: 10,
    searchTerm: '',
    id: '',
  },
) => {
  const url = `${BASE_URL}/${options?.id}`;

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

  return {
    ...response,
    data: response?.data?.data as ICampaignDetail,
  };
};

const ReadProposals = (
  options: Partial<PageQuery> = {
    page: 1,
    sortDir: 'ASC',
    take: 10,
    searchTerm: '',
    id: '',
  },
) => {
  const url = readProposalsFn({ ...options });

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

  return {
    ...response,
    data: response?.data?.data as IProposals,
  };
};

const ReadProjects = (
  options: Partial<PageQuery> = {
    page: 1,
    sortDir: 'ASC',
    take: 10,
    searchTerm: '',
    id: '',
  },
) => {
  const url = readProjectsFn({ ...options });

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

  return {
    ...response,
    data: response?.data?.data as IProjects,
  };
};

const ReadSubmissions = (
  options: Partial<PageQuery> = {
    page: 1,
    sortDir: 'ASC',
    take: 10,
    searchTerm: '',
    id: '',
  },
) => {
  const url = readSubmissionsFn({ ...options });

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

  return {
    ...response,
    data: response?.data?.data as ISubmissions,
  };
};

const ReadBudgets = (
  options: Partial<PageQuery> = {
    page: 1,
    sortDir: 'ASC',
    take: 10,
    searchTerm: '',
    id: '',
  },
) => {
  const url = readBudgetsFn({ ...options });

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

  return {
    ...response,
    data: response?.data?.data as IBudgets,
  };
};

const ApproveProject = () => {
  const { setModals } = useModals();
  const queryClient = useQueryClient();

  const { mutate, ...response } = useMutation({
    mutationFn: api.post,
    mutationKey: [queryKey.put],
    onSuccess: (data: ApprovalResponse) => {
      successToast(data.description);
      setModals((prev) => ({ ...prev, show: false }));
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
    mutate: (body: ApproveProjectParam) => {
      mutate({ url: `${BASE_URL}/projects/${body.id}/approve` });
    },
  };
};

export const campaigndetailsqueries = {
  ReadDetails,
  ReadProposals,
  ReadProjects,
  ReadSubmissions,
  ReadBudgets,
  ApproveProject,
};

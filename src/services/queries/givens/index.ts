import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { errorToast, successToast } from "@/services/helper";
import toast from "react-hot-toast";
import { useQueryString } from "@/hooks/use-query";
import api from "../../api";
import queryKey from "./keys";
import { ReadRequest, Givens, Given } from "./types";
import { Interests } from "../interest/types";
import { useModals } from "@/contexts/modals";

const BASE_URL = "/api/given";

const Read = (
  options: ReadRequest = {
    page: 1,
    order: "ASC",
    take: 10,
    searchTerm: "",
    fromDate: "",
    toDate: "",
  }
) => {
  const { page, order, take, searchTerm, toDate, fromDate } = options;
  const url = `${BASE_URL}?page=${page}&order=${order}&take=${take}&search=${searchTerm}${fromDate && toDate && `&fromDate=${fromDate}&toDate=${toDate}`}`;
  const { asPath } = useQueryString();

  const response = useQuery({
    queryFn: () => api.get({ url }),
    queryKey: [queryKey.read, asPath],
    ...options,
    refetchOnMount: "always",
  });
  if (response.isError) {
    errorToast((response?.error as any)?.response?.data?.message);
  }

  return {
    ...response,
    data: response?.data as Givens,
  };
};

const Del = () => {
  const queryClient = useQueryClient();

  const { mutate, ...response } = useMutation({
    mutationFn: api.delete,
    mutationKey: [queryKey.delete],
    onSuccess: async (data: any) => {
      successToast(data?.description || "Success");
      queryClient.invalidateQueries({
        queryKey: [queryKey.read],
        type: "all",
        exact: false,
      });
      document.body.click();
    },
    onError: (err: any) => {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong");
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

const ReadInterest = (
  options: ReadRequest & {id: string} = {
    page: 1,
    order: "ASC",
    take: 10,
    searchTerm: "",
    id: ""
  }
) => {
  const { page, order, take, searchTerm, id } = options;
  const url = `${BASE_URL}/interests?page=${page}&order=${order}&take=${take}&search=${searchTerm}&id=${id}`;

  const response = useQuery({
    queryFn: () => api.get({ url }),
    queryKey: [queryKey.read, id],
    enabled: !!id,
    ...options,
    refetchOnMount: "always",
  });
  if (response.isError) {
    errorToast((response?.error as any)?.response?.data?.message);
  }

  return {
    ...response,
    data: response?.data as Interests,
  };
};

const Put = (options = {}) => {
  const queryClient = useQueryClient();
  const { setModals } = useModals();

  const { mutate, ...response } = useMutation({
    mutationFn: api.patch,
    mutationKey: [queryKey.patch],
    ...options,
    onSuccess: async (data: any) => {
      successToast(data.message);
      await queryClient.invalidateQueries({ queryKey: [queryKey.read] });
      setModals((old) => ({ ...old, edit: false }));
    },
    onError: (err: any) => {
      if (err.response && err.response.data && err.response.data.message) {
        errorToast(err.response.data.message);
      } else {
        errorToast("Something went wrong");
      }
    },
  });
  return {
    ...response,
    mutate: (body: Partial<Given>) => {
      mutate({ url: `${BASE_URL}`, body: { ...body } });
    },
  };
};

export const givenQueries = {
  Read,
  Del,
  ReadInterest,
  Put,
};

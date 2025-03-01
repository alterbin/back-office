import { User } from "../auth/types";

export interface Given {
  id: string;
  address: string;
  description: string;
  name: string;
  photos: string[];
  location: string;
  contact: string;
  rank: number;
  isFulfilled: boolean;
  userId?: string;
  interests?: string;
  status?: string;
  hidden: boolean;
}
export interface Givens {
  data: Given[];
  total: number;
}

export interface ReadRequest {
  page?: number;
  order?: string;
  take?: number;
  searchTerm?: string | string[] | undefined;
  fromDate?: string;
  toDate?: string;
}

export interface InviteResponse {
  statusCode: number;
  description: string;
  data: Given;
}

export type CreateGivenDto = {
  name: string;
  description: string;
  photos: string[];
  address: string;
  contact: string;
};

export interface GetRequest {
  page: number;
  take: number;
  order: "asc" | "desc";
  search: string;
  fromDate?: string;
  toDate?: string;
  given?: string;
}

export interface Transaction {
  amount: string;
  createdAt: string;
  currency: string;
  id: string;
  reference: string;
  source: string;
  status: string;
  type: string;
  user: User;
}

export interface TempData {
  amount: string;
  createdAt: string;
  currency: string;
  id: string;
  ref: string;
  source: string;
  status: string;
  type: string;
}

export interface Transactions {
  data: Transaction[];
  total: number;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  type: string;
}

export interface PageQuery {
  page: number;
  sortDir: string;
  take: number;
  searchTerm: string;
  maxAmount: string;
  minAmount: string;
  fromDate: string;
  toDate: string;
  type: string;
  source: string;
  currencyType: string;
  status: string;

}

export interface CancelTransactionResponse {
  statusCode: number;
  description: string;
}

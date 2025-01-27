export interface ICampaign {
   id: string;
  name: string;
  userId: string;
  description: string;
  coverArtUrl: string;
  createdAt: string;
  amount: string;
  status: string;
  campaignUrl: string;
  platforms: null | string[];
  budgets: IBudget[];
}

export interface IBudget {
  id: string;
  edd: string | null;
  amount: number;
  noOfLikes: number;
  noOfWinner: number;
  maxFollowers: number;
  minFollowers: number;
  noOfEngagements: number;
}

export interface ICampaigns {
  data: ICampaign[];
  total: number;
}

export interface PageQuery {
  page: number;
  sortDir: string;
  take: number;
  searchTerm: string;
  status: string;
  maxAmount: string;
  minAmount: string;
  maxFollowers: string;
  minFollowers: string;
  platforms: string[];
  fromDate: string;
  toDate: string;
  id?: string;
}

export interface ApprovalResponse {
  statusCode: number;
  description: string;
}

export interface ApproveProjectParam {
  id: string;
}

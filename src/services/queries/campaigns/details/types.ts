export interface ICampaignDetail {
  name: string;
  description: string;
  campaignUrl: string;
  platforms: string[];
  guidelines: string[];
  coverArtUrl: string;
  id: string;
  createdAt: string;
  amount: number;
  userId: string;
  status: string;
  open: boolean;
  proposalCount: number;
  brand: IBrand;
}

export interface IProposal {
  id: string;
  campaignId: string;
  notes: string | null;
  createdAt: string;
  fullName: string;
  stageName: string;
  imgUrl: string;
  country: string;
  socialLinks: ISocialLinks;
  budget: IBudget;
}

export interface IProject {
  id: string;
  campaignId: string;
  createdAt: string;
  status: string;
  influencer: IInfluencer;
  budget: IBudget;
}

export interface ISubmission {
  id: string;
  campaignId: string;
  budgetId: string;
  projectId: string;
  userId: string;
  url: string;
  reviewContent: string[] | null;
  reviewReasons: string[] | null;
  platforms: string[] | null;
  createdAt: string;
  status: string;
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

export interface ICampaignDetails {
  data: ICampaignDetails[];
  total: number;
}

export interface IBudgets {
  data: IBudget[];
  total: number;
}

export interface IProposals {
  data: IProposal[];
  total: number;
}

export interface IProjects {
  data: IProject[];
  total: number;
}

export interface ISubmissions {
  data: ISubmission[];
  total: number;
}

export interface ISocialLinks {
  tiktok: string;
  youtube: string;
  instagram: string;
}

export interface IInfluencer {
  id: string;
  email: string;
  imgUrl: string;
  fullName: string;
  stageName: string;
  socialLinks: string | null;
}

export interface IBrand {
  email: string;
  fullName: string;
  socialLinks: Record<string, string>;
  industry: string | null;
  status: string;
  country: string;
  imgUrl: string;
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

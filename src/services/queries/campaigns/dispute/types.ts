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

export interface IDisputes {
  data: IDispute[];
  total: number;
}

export enum CampaignDisputeStatus {
  Pending = 'pending',
  Resolved = 'resolved',
}

export interface PageQuery {
  page: number;
  sortDir: string;
  take: number;
  searchTerm: string;
  status: string;
  id?: string;
}

export interface DisputeResponse {
  statusCode: number;
  description: string;
  data: IDisputes;
}

export type IDispute = {
  id: string;
  projectId: string;
  complaint: string;
  proofs: string;
  status: string;
  defendantId: string;
  complainantId: string;
  createdAt: string;
  upstringdAt: string;
  project: Project;
  defendant: UserType;
  complainant: UserType;
};

export type Project = {
  id: string;
  budget: TBudget;
  status: string;
  userId: string;
  campaign: Campaign;
};

export type TDispute = {
  id: string;
  projectId: string;
  complaint: string;
  proofs: string[];
  status: string;
  title: string;
  defendantId: string;
  complainantId: string;
  createdAt: string;
  upstringdAt: string;
  project: Project;
  defendant: UserType;
  complainant: UserType;
  resolvedAt: Date;
};

export type TBudget = {
  id: string;
  edd: string;
  amount: number;
  noOfLikes: number;
  noOfWinner: number;
  maxFollowers: number;
  minFollowers: number;
  noOfEngagements: number;
};

export type UserType = {
  id: string;
  email: string;
  imgUrl: string;
  fullName: string;
  stageName: string;
  socialLinks: socialLink;
  type: string;
};
export type socialLink = {
  tiktok: string;
  youtube: string;
  instagram: string;
};
export type Campaign = {
  id: string;
  name: string;
  open: boolean;
  status: string;
  createdAt: Date;
  platforms: string[];
  guidelines: null;
  campaignUrl: string;
  coverArtUrl: string;
  description: string;
};

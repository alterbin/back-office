

export interface ICollection {
    id: string;
    title: string;
    description: string;
    name: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
  }
  export interface ICollections {
    data: ICollection[];
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
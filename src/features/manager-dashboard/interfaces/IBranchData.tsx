export interface IBranchData {
  sales: number;
  orders: number;
  manager: string;
  branchDTO: {
    branchId: number;
    branchName: string;
    branchAddress: string;
    branchContact: string;
    branchFax: string;
    branchEmail: string;
    branchDescription: string;
    branchImage: string | null; // Assuming branchImage can be a URL or null
    branchStatus: boolean;
    branchLocation: string;
    branchCreatedOn: string;
    branchCreatedBy: string;
  };
}

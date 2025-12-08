export interface IBranchData {
  branchId: number;
  branchName: string;
  branchAddress: string;
  branchContact: string;
  branchEmail: string;
  branchLocation: string;
  branchStatus: boolean;
  branchImageUrl: string | null;
  totalSales: number;
  orderCount: number;
  employeeCount: number;
  itemCount: number;
  lowStockItemCount: number;
}

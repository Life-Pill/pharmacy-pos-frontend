interface OrderData {
  branchName: string;
  orderAmount: number;
}

const branchOrderDetails: OrderData[] = [
  { branchName: 'Branch A', orderAmount: 15000 },
  { branchName: 'Branch B', orderAmount: 20000 },
  { branchName: 'Branch C', orderAmount: 18000 },
  { branchName: 'Branch D', orderAmount: 22000 },
  { branchName: 'Branch E', orderAmount: 17000 },
];

export default branchOrderDetails;

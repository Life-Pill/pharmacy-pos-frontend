import { Order } from '../interfaces/OrderDetails';

export const filterOrdersByBranch = (order: Order, selectedBranch: string) => {
  const branchFilter =
    selectedBranch === '' || order.branchId.toString() === selectedBranch;

  return branchFilter;
};

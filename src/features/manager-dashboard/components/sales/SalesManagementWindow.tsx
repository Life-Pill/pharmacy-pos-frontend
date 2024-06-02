import React from 'react';
import BranchSalesSummary from '../../../branch-sales-summary/layouts/BranchSalesSummary';

type Props = {};

const SalesManagementWindow = (props: Props) => {
  return (
    <div data-testid='sales-management-window'>
      <BranchSalesSummary />
    </div>
  );
};

export default SalesManagementWindow;

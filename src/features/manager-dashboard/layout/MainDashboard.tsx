import React, { useState } from 'react';
import ManagerNavbar from '../components/navbar/ManagerNavbar';
import ManagerSidebar from '../components/sidebar/ManagerSidebar';
import Dashboard from '../components/main/Dashboard';
import CashierManagementWindow from '../components/cashiers/CashierManagementWindow';
import BranchManagementWindow from '../components/branches/BranchManagementWindow';
import SalesManagementWindow from '../components/sales/SalesManagementWindow';
import ItemsManagementWindow from '../components/items/ItemsManagementWindow';
import SavedReportsWindow from '../components/reports/SavedReportsWindow';
import FeedbacksManagementWindow from '../components/feedbacks/FeedbacksManagementWindow';

type Props = {};

const MainDashboard = (props: Props) => {
  const [selectedItem, setSelectedItem] = useState<String>('Dashboard');

  const handleItemClick = (itemName: String) => {
    setSelectedItem(itemName);
  };

  const renderSelectedItem = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <Dashboard />;
        break;
      case 'Cashiers':
        return <CashierManagementWindow />;
        break;
      case 'Branches':
        return <BranchManagementWindow />;
        break;
      case 'Summary':
        return <SalesManagementWindow />;
        break;
      case 'Items':
        return <ItemsManagementWindow />;
        break;
      case 'Reports':
        return <SavedReportsWindow />;
        break;
      case 'Feedbacks':
        return <FeedbacksManagementWindow />;
      default:
        return <Dashboard />;
        break;
    }
  };

  return (
    <div className='w-full max-h-screen overflow-hidden'>
      <ManagerNavbar />
      <div className='flex flex-row'>
        <ManagerSidebar onItemClick={handleItemClick} />
        <div className='flex flex-col w-full p-4 font-poppins'>
          {renderSelectedItem()}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;

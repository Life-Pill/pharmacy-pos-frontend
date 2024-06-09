import { useState } from 'react';
import ManagerNavbar from '../components/navbar/ManagerNavbar';
import ManagerSidebar from '../components/sidebar/ManagerSidebar';
import Dashboard from '../components/main/Dashboard';
import CashierManagementWindow from '../components/cashiers/CashierManagementWindow';
import SalesManagementWindow from '../components/sales/SalesManagementWindow';
import ItemsManagementWindow from '../components/items/ItemsManagementWindow';
import SavedReportsWindow from '../components/reports/SavedReportsWindow';
import FeedbacksManagementWindow from '../components/feedbacks/FeedbacksManagementWindow';
import { useParams } from 'react-router-dom';
import SellerManagementWindow from '../components/seller/SellerManagementWindow';
import OrderManagementWindow from '../../order-management/layouts/OrderManagementWindow';

const MainDashboard = () => {
  const { item } = useParams();
  const [selectedItem, setSelectedItem] = useState<String>(item || 'Dashboard');

  const handleItemClick = (itemName: String) => {
    setSelectedItem(itemName);
  };

  const renderSelectedItem = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Cashiers':
        return <CashierManagementWindow />;
      case 'Branches':
        return <SellerManagementWindow />;
      case 'Summary':
        return <SalesManagementWindow />;
      case 'Items':
        return <ItemsManagementWindow />;
      case 'Reports':
        return <SavedReportsWindow />;
      case 'Orders':
        return <OrderManagementWindow />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className='w-full max-h-screen overflow-hidden'>
      <ManagerNavbar />
      <div className='flex flex-row'>
        <ManagerSidebar onItemClick={handleItemClick} />
        <div className='flex flex-col w-full p-4 font-poppins scroll-mb-8'>
          {renderSelectedItem()}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;

import MainManagerDashboard from '../../../main-manager-dashboard/layout/MainManagerDashboard';

interface DashboardProps {
  onNavigateToOrders?: () => void;
}

const Dashboard = ({ onNavigateToOrders }: DashboardProps) => {
  return <MainManagerDashboard onNavigateToOrders={onNavigateToOrders} />;
};

export default Dashboard;

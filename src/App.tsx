import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/login-page';
import LogInCashierPasswordPage from './pages/cashier-password-page';
import CashierTemporaryLogOutPage from './pages/temporary-logout-page';
import CashierDashBoardPage from './pages/cashier-dashboard';
import {
  AddCashier,
  CashierBankDetails,
  UpdateCashier,
  ViewCashier,
} from './features/cashier-management';
import ErrorRoutePage from './pages/error-route-page';
import {
  AddItems,
  UpdateItems,
} from './features/items-management';
import MainDashboard from './features/manager-dashboard';
import { useUserContext } from './context/UserContext';
import ViewItem from './features/items-management/layout/ViewItem';

function App() {
  const { user } = useUserContext();
  const isAdmin = user?.role === 'OWNER'; // Assuming 'OWNER' is the role for admin/owner

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LogInPage />} />
        <Route
          path='/login-cashier-password'
          element={<LogInCashierPasswordPage />}
        />
        <Route
          path='/temporary-logout'
          element={<CashierTemporaryLogOutPage />}
        />

        {isAdmin ? (
          <>
            {/* Routes for OWNER */}
            <Route path='/manager-dashboard' element={<MainDashboard />} />
            <Route path='/add-cashier' element={<AddCashier />} />
            <Route
              path='/cashier-bank-details'
              element={<CashierBankDetails />}
            />
            <Route
              path='/update-cashier/:employerId'
              element={<UpdateCashier />}
            />
            <Route
              path='/manager-dashboard/:item'
              element={<MainDashboard />}
            />
            <Route path='/view-cashier/:employerId' element={<ViewCashier />} />
            <Route path='/add-items' element={<AddItems />} />
            <Route path='/update-items/:itemId' element={<UpdateItems />} />
            <Route path='/view-item/:itemId' element={<ViewItem />} />
          </>
        ) : (
          <>
            {/* Routes for CASHIER */}
            <Route
              path='/cashier-dashboard'
              element={<CashierDashBoardPage />}
            />
            {/* Add more routes specific to CASHIER if needed */}
          </>
        )}

        {/* Error route */}
        <Route path='/*' element={<ErrorRoutePage />} />
      </Routes>
    </Router>
  );
}

export default App;

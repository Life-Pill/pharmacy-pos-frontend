import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/login-page';
import LogInCashierPasswordPage from './pages/cashier-password-page';
import CashierTemporaryLogOutPage from './pages/temporary-logout-page';
import CashierDashBoardPage from './pages/cashier-dashboard';
import ManagerDashboardPage from './pages/manager-dashboard';
import {
  AddCashier,
  CashierBankDetails,
  UpdateCashier,
  ViewCashier,
} from './features/cashier-management';
import ErrorRoutePage from './pages/error-route-page';
import {
  AddItems,
  RemoveItems,
  UpdateItems,
} from './features/items-management';
import MainDashboard from './features/manager-dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' Component={LogInPage} />
        <Route
          path='/login-cashier-password'
          Component={LogInCashierPasswordPage}
        />
        <Route path='/' Component={CashierTemporaryLogOutPage} /> */}
        {/* <Route path='/cashier-dashboard' Component={CashierDashBoardPage} /> */}

        {/* to view admin side uncomment below */}

        <Route path='/' element={<MainDashboard />} />

        {/* Cashier management details */}

        <Route path='/add-cashier' element={<AddCashier />} />
        <Route path='/cashier-bank-details' element={<CashierBankDetails />} />
        <Route path='/update-cashier' element={<UpdateCashier />} />
        <Route path='/view-cashier' element={<ViewCashier />} />

        <Route path='/add-items' element={<AddItems />} />
        <Route path='/update-items' element={<UpdateItems />} />
        <Route path='/remove-items' element={<RemoveItems />} />

        {/* Invalid routes goes here */}

        <Route path='*' element={<ErrorRoutePage />} />
      </Routes>
    </Router>
  );
}

export default App;

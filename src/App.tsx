import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/login-page';
import LogInCashierPasswordPage from './pages/cashier-password-page';
import CashierTemporaryLogOutPage from './pages/temporary-logout-page';
import CashierDashBoardPage from './pages/cashier-dashboard';
import ManagerDashboardPage from './pages/manager-dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={LogInPage} />
        <Route
          path='/login-cashier-password'
          Component={LogInCashierPasswordPage}
        />
        <Route path='/' Component={CashierTemporaryLogOutPage} />
        <Route path='/cashier-dashboard' Component={CashierDashBoardPage} />
        {/* <Route path='/' Component={ManagerDashboardPage} /> */}
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import LogInCashierPasswordPage from './pages/LogInCashierPasswordPage';
import CashierTemporaryLogOutPage from './pages/CashierTemporaryLogOutPage';
import CashierDashBoardPage from './pages/CashierDashBoardPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' Component={LogInPage} /> */}
        <Route
          path='/login-cashier-password'
          Component={LogInCashierPasswordPage}
        />
        <Route path='/' Component={CashierTemporaryLogOutPage} />
        <Route path='/cashier-dashboard' Component={CashierDashBoardPage} />
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
import LogInCashierPasswordPage from './pages/LogInCashierPasswordPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={LogInPage} />
        <Route
          path='/login-cashier-password'
          Component={LogInCashierPasswordPage}
        />
      </Routes>
    </Router>
  );
}

export default App;

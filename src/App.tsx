import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LogInPage from './pages/LogInPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={LogInPage} />
      </Routes>
    </Router>
  );
}

export default App;

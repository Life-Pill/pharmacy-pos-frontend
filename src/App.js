import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';

function App() {
  return (
    <div className='font-poppins'>
      <Router>
        <Routes>
          <Route path='/' Component={LoginPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

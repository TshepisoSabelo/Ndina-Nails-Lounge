import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Confirm from './components/Confirm';
import LandingPage from './pages/LandingPage';
import PricesPage from './pages/PricesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path = "/PricesPage" element={<PricesPage />} />
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/confirm" element={<Confirm />} />
    </Routes>
  )
}

export default App

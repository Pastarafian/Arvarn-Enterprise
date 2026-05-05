import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('arvarn_admin_token'));
  const login = (t: string) => { localStorage.setItem('arvarn_admin_token', t); setToken(t); };
  const logout = () => { localStorage.removeItem('arvarn_admin_token'); setToken(null); };
  return { token, login, logout };
};

export default function App() {
  const { token, login, logout } = useAuth();
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Login setAuth={login} />} />
        <Route path="/login" element={<Login setAuth={login} />} />
        <Route path="/dashboard" element={token ? <Dashboard token={token} logout={logout} /> : <Login setAuth={login} />} />
      </Routes>
    </HashRouter>
  );
}

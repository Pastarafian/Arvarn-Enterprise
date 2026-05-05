import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('marli_admin_token'));
  const login = (t: string) => { localStorage.setItem('marli_admin_token', t); setToken(t); };
  const logout = () => { localStorage.removeItem('marli_admin_token'); setToken(null); };
  return { token, login, logout };
};

export default function App() {
  const { token, login, logout } = useAuth();
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/onboarding" element={<Login setAuth={login} />} />
        <Route path="/login" element={<Login setAuth={login} />} />
        <Route path="/dashboard" element={token ? <Dashboard token={token} logout={logout} /> : <Login setAuth={login} />} />
      </Routes>
    </HashRouter>
  );
}


import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import PromptManagement from './pages/PromptManagement';
import AlertsPage from './pages/AlertsPage';
import CompetitorsPage from './pages/CompetitorsPage';
import SettingsPage from './pages/SettingsPage';
import BillingPage from './pages/BillingPage';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check simple local storage for auth state simulation
  useEffect(() => {
    const auth = localStorage.getItem('lodestone_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const login = () => {
    localStorage.setItem('lodestone_auth', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('lodestone_auth');
    setIsAuthenticated(false);
  };

  return (
    <HashRouter>
      <Routes>
        {/* Public Route - Login is now the landing page */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/app" /> : <AuthPage onLogin={login} />} 
        />

        {/* Private App Routes */}
        <Route path="/app" element={isAuthenticated ? <Layout onLogout={logout} /> : <Navigate to="/" />}>
          <Route index element={<Dashboard />} />
          <Route path="prompts" element={<PromptManagement />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="competitors" element={<CompetitorsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="billing" element={<BillingPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;

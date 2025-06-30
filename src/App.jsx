import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster.jsx';
import LandingPage from '@/components/LandingPage.jsx';
import AuthPage from '@/components/AuthPage.jsx';
import Dashboard from '@/components/Dashboard.jsx';
import { useLocalStorage } from '@/hooks/useLocalStorage.js';
import { mockUser, defaultUser } from '@/data/mockData.js';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useLocalStorage('userProfile', mockUser);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (loginData) => {
    if (loginData === 'default') {
      setUser(defaultUser);
    } else if (loginData) {
      setUser(prevUser => ({ ...prevUser, ...loginData }));
    }
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
    setUser(mockUser);
  };

  const renderPage = () => {
    if (isLoggedIn && currentPage === 'dashboard') {
      return <Dashboard onLogout={handleLogout} user={user} />;
    }

    switch (currentPage) {
      case 'auth':
        return <AuthPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'dashboard':
        return isLoggedIn ? <Dashboard onLogout={handleLogout} user={user} /> : <AuthPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>3M - Mejora Movilidad Móvil</title>
        <meta name="description" content="Plataforma de ejercicios y bienestar diseñada para adultos mayores. Sesiones presenciales y online con instructores certificados en Santiago de Chile." />
        <meta name="keywords" content="adultos mayores, ejercicios, bienestar, salud, santiago de chile, movilidad, 3m" />
        <meta name="author" content="3M" />
        <meta property="og:title" content="3M - Mejora Movilidad Móvil" />
        <meta property="og:description" content="Únete a nuestra comunidad de bienestar para adultos mayores. Ejercicios seguros y personalizados." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://3m.cl" />
      </Helmet>
      
      <div className="App">
        {renderPage()}
        <Toaster />
      </div>
    </>
  );
}

export default App;
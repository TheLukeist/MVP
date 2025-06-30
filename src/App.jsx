import React, { useState, useEffect } from 'react';
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

  // Inicializar datos de Carlos si es el usuario por defecto
  useEffect(() => {
    if (user.email === 'carlos.ruiz@3m.cl') {
      // Configurar sesiones completadas para Carlos
      const carlosCompletedSessions = [1, 2, 3, 5, 6]; // 5 sesiones completadas
      localStorage.setItem('completedSessions', JSON.stringify(carlosCompletedSessions));
      localStorage.setItem('userCoins', JSON.stringify(5)); // 5 monedas
      localStorage.setItem('bookedSessions', JSON.stringify([4])); // Una sesión reservada
      
      // Actualizar progreso del usuario
      const updatedUser = {
        ...user,
        weeklyProgress: {
          ...user.weeklyProgress,
          sessionsCompleted: 5,
          exerciseMinutes: 225
        }
      };
      setUser(updatedUser);
    }
  }, [user.email, setUser]);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (loginData) => {
    if (loginData === 'default') {
      setUser(defaultUser);
      // Configurar datos específicos de Carlos
      const carlosCompletedSessions = [1, 2, 3, 5, 6]; // 5 sesiones completadas
      localStorage.setItem('completedSessions', JSON.stringify(carlosCompletedSessions));
      localStorage.setItem('userCoins', JSON.stringify(5)); // 5 monedas
      localStorage.setItem('bookedSessions', JSON.stringify([4])); // Una sesión reservada
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
    // Limpiar datos de sesiones al cerrar sesión
    localStorage.removeItem('completedSessions');
    localStorage.removeItem('userCoins');
    localStorage.removeItem('bookedSessions');
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
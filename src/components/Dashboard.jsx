import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Home, Calendar, Dumbbell, User, Bell, LogOut, Menu, X, TrendingUp, Clock, Users, MapPin, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import SessionsPage from './SessionsPage.jsx';
import ExercisesPage from './ExercisesPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import { useLocalStorage } from '@/hooks/useLocalStorage.js';
import { mockUser as defaultUser, mockSessions } from '@/data/mockData.js';

export default function Dashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useLocalStorage('userProfile', defaultUser);
  const [bookedSessions] = useLocalStorage('bookedSessions', []);
  const [completedSessions] = useLocalStorage('completedSessions', []);
  const [userCoins, setUserCoins] = useLocalStorage('userCoins', 0);
  const { toast } = useToast();

  // Sincronizar monedas con sesiones completadas
  useEffect(() => {
    const newCoins = completedSessions.length;
    if (newCoins !== userCoins) {
      setUserCoins(newCoins);
    }
  }, [completedSessions.length, userCoins, setUserCoins]);

  // Actualizar progreso del usuario basado en sesiones completadas reales
  useEffect(() => {
    const realSessionsCompleted = completedSessions.length;
    if (user.weeklyProgress.sessionsCompleted !== realSessionsCompleted) {
      const updatedUser = {
        ...user,
        weeklyProgress: {
          ...user.weeklyProgress,
          sessionsCompleted: realSessionsCompleted,
          exerciseMinutes: realSessionsCompleted * 45 // 45 minutos promedio por sesión
        }
      };
      setUser(updatedUser);
    }
  }, [completedSessions.length, user, setUser]);

  const menuItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'sessions', label: 'Sesiones', icon: Calendar },
    { id: 'exercises', label: 'Ejercicios', icon: Dumbbell },
    { id: 'profile', label: 'Perfil', icon: User }
  ];

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "¡Hasta pronto! Esperamos verte de nuevo."
    });
    onLogout();
  };

  const handleNotification = () => {
    toast({
      title: "🔔 Notificaciones",
      description: "No tienes notificaciones nuevas en este momento."
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'sessions':
        return <SessionsPage />;
      case 'exercises':
        return <ExercisesPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  const HomePage = () => {
    const myUpcomingSessions = mockSessions.filter(session => bookedSessions.includes(session.id));
    const myCompletedSessions = mockSessions.filter(session => completedSessions.includes(session.id));

    // Usar progreso real actualizado
    const realSessionsCompleted = user.weeklyProgress.sessionsCompleted;
    const realTotalSessions = user.weeklyProgress.totalSessions;
    const realExerciseMinutes = user.weeklyProgress.exerciseMinutes;
    const realWeeklyGoal = user.weeklyProgress.weeklyGoal;

    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">¡Hola, {user.name}!</h1>
              <p className="opacity-90">Bienvenido/a a tu panel de bienestar</p>
              <div className="flex items-center mt-2">
                <Coins className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{userCoins} monedas 3M</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-75">Progreso semanal</div>
              <div className="text-2xl font-bold">{realTotalSessions > 0 ? Math.round((realSessionsCompleted / realTotalSessions) * 100) : 0}%</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Mis Próximas Sesiones
              </CardTitle>
            </CardHeader>
            <CardContent>
              {myUpcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {myUpcomingSessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{session.title}</h4>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="mr-4">{session.date}</span>
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="mr-4">{session.time}</span>
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{session.location}</span>
                        </div>
                      </div>
                      <Badge variant={session.type === 'Online' ? 'secondary' : 'default'}>
                        {session.type}
                      </Badge>
                    </div>
                  ))}
                  {myUpcomingSessions.length > 3 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('sessions')}
                      className="w-full"
                    >
                      Ver todas las sesiones ({myUpcomingSessions.length})
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No tienes sesiones reservadas.</p>
                  <Button onClick={() => setActiveTab('sessions')}>
                    Explorar Sesiones
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Sesiones Completadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              {myCompletedSessions.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {myCompletedSessions.length}
                    </div>
                    <div className="text-sm text-gray-600">Sesiones completadas</div>
                    <div className="flex items-center justify-center mt-2">
                      <Coins className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-gray-700">{userCoins} monedas ganadas</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {myCompletedSessions.slice(0, 2).map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">{session.title}</h4>
                          <p className="text-xs text-gray-500">{session.instructor}</p>
                        </div>
                        <Badge variant="success" className="text-xs">
                          Completada
                        </Badge>
                      </div>
                    ))}
                  </div>
                  {myCompletedSessions.length > 2 && (
                    <Button 
                      variant="outline" 
                      onClick={() => setActiveTab('sessions')}
                      className="w-full"
                    >
                      Ver todas las completadas
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Aún no has completado sesiones.</p>
                  <Button onClick={() => setActiveTab('sessions')}>
                    Ver Sesiones Reservadas
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Progreso Semanal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Sesiones completadas</span>
                  <span>{realSessionsCompleted}/{realTotalSessions}</span>
                </div>
                <Progress value={realTotalSessions > 0 ? (realSessionsCompleted / realTotalSessions) * 100 : 0} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Minutos de ejercicio</span>
                  <span>{realExerciseMinutes}/{realWeeklyGoal}</span>
                </div>
                <Progress value={realWeeklyGoal > 0 ? (realExerciseMinutes / realWeeklyGoal) * 100 : 0} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-gray-900">3M</div>
                <div className="text-xs text-gray-500">Mejora Movilidad Móvil</div>
              </div>
            </div>

            <nav className="hidden md:flex space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                    activeTab === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              {user.isPremium && (
                <Badge className="bg-yellow-500 text-white hidden sm:inline-flex">Premium</Badge>
              )}
              <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1">
                <Coins className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium text-gray-700">{userCoins}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleNotification}>
                <Bell className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-3 rounded-md text-lg font-medium transition-colors ${
                    activeTab === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-6 h-6 mr-3" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
}
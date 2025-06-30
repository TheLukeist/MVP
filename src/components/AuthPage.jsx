import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Eye, EyeOff, ArrowLeft, Search, TrendingUp, Calendar, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import { defaultUser } from '@/data/mockData.js';

export default function AuthPage({ onNavigate, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showProgressViewer, setShowProgressViewer] = useState(false);
  const [progressCode, setProgressCode] = useState('');
  const [sharedProgress, setSharedProgress] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    phone: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      if (formData.email === defaultUser.email && formData.password === 'password123') {
        toast({
          title: `¡Bienvenido de vuelta, ${defaultUser.name}!`,
          description: "Has iniciado sesión correctamente."
        });
        onLogin('default');
        return;
      }

      if (formData.email && formData.password) {
        toast({
          title: "¡Bienvenido de vuelta!",
          description: "Has iniciado sesión correctamente."
        });
        // Crear usuario temporal con datos básicos
        const tempUser = {
          name: formData.email.split('@')[0] || "Usuario",
          email: formData.email,
          age: 65,
          phone: "",
          address: "Santiago, Chile",
          emergencyContact: "",
          memberSince: new Date().toLocaleDateString('es-CL'),
          isPremium: false,
          healthMetrics: {
            weight: "70 kg",
            height: "1.70 m",
            bloodPressure: "120/80",
            heartRate: "75 bpm"
          },
          preferences: {
            notifications: true,
            privateMode: false,
            medicationReminders: true,
            shareProgress: true
          },
          weeklyProgress: {
            sessionsCompleted: 0,
            totalSessions: 4,
            exerciseMinutes: 0,
            weeklyGoal: 240
          },
          progressHistory: []
        };
        onLogin(tempUser);
      } else {
        toast({
          title: "Error de inicio de sesión",
          description: "Por favor, completa todos los campos.",
          variant: "destructive"
        });
      }
    } else {
      if (formData.email && formData.password && formData.name && formData.age) {
        toast({
          title: "¡Cuenta creada exitosamente!",
          description: "Bienvenido a 3M. Ya puedes comenzar tu viaje hacia el bienestar."
        });
        const newUserData = {
          name: formData.name,
          age: parseInt(formData.age) || 0,
          email: formData.email,
          phone: formData.phone || "",
          address: "Santiago, Chile",
          emergencyContact: "",
          memberSince: new Date().toLocaleDateString('es-CL'),
          isPremium: false,
          healthMetrics: {
            weight: "70 kg",
            height: "1.70 m",
            bloodPressure: "120/80",
            heartRate: "75 bpm"
          },
          preferences: {
            notifications: true,
            privateMode: false,
            medicationReminders: true,
            shareProgress: true
          },
          weeklyProgress: {
            sessionsCompleted: 0,
            totalSessions: 4,
            exerciseMinutes: 0,
            weeklyGoal: 240
          },
          progressHistory: []
        };
        onLogin(newUserData);
      } else {
        toast({
          title: "Error de registro",
          description: "Por favor, completa todos los campos obligatorios (*).",
          variant: "destructive"
        });
      }
    }
  };

  const handleProgressView = (e) => {
    e.preventDefault();
    if (progressCode.trim()) {
      // Buscar datos compartidos específicos del código
      const shareData = localStorage.getItem(`shareData_${progressCode.toUpperCase()}`);
      
      if (shareData) {
        try {
          const parsedData = JSON.parse(shareData);
          
          // Crear sesiones recientes basadas en el número de sesiones completadas
          const recentSessions = [
            { name: "Equilibrio y Coordinación", date: "Hoy", completed: true },
            { name: "Yoga Suave para Seniors", date: "Ayer", completed: true },
            { name: "Aqua Aeróbicos", date: "Hace 2 días", completed: true },
            { name: "Fortalecimiento Muscular", date: "Hace 3 días", completed: true },
            { name: "Pilates para Flexibilidad", date: "Hace 4 días", completed: true },
            { name: "Caminata Activa", date: "Hace 5 días", completed: true },
          ].slice(0, parsedData.completedSessionsCount);
          
          const realProgress = {
            userName: parsedData.userName,
            age: parsedData.age,
            memberSince: parsedData.memberSince,
            weeklyProgress: parsedData.weeklyProgress,
            progressHistory: parsedData.progressHistory,
            recentSessions: recentSessions
          };
          
          setSharedProgress(realProgress);
          toast({
            title: "Progreso encontrado",
            description: `Mostrando progreso real de ${realProgress.userName}`
          });
        } catch (error) {
          console.error('Error parsing share data:', error);
          showMockProgress();
        }
      } else if (progressCode.toUpperCase() === 'CARLOS' || progressCode.toUpperCase() === 'CR2024') {
        // Datos específicos de Carlos con progreso real hardcodeado
        const carlosProgress = {
          userName: "Carlos Ruiz",
          age: 72,
          memberSince: "15/01/2024",
          weeklyProgress: {
            sessionsCompleted: 5,
            totalSessions: 6,
            exerciseMinutes: 225,
            weeklyGoal: 270
          },
          progressHistory: [
            { week: "Esta semana", sessions: 5, minutes: 225 },
            { week: "Semana pasada", sessions: 4, minutes: 180 },
            { week: "Hace 2 semanas", sessions: 3, minutes: 135 },
            { week: "Hace 3 semanas", sessions: 4, minutes: 180 },
          ],
          recentSessions: [
            { name: "Equilibrio y Coordinación", date: "Hoy", completed: true },
            { name: "Yoga Suave para Seniors", date: "Ayer", completed: true },
            { name: "Aqua Aeróbicos", date: "Hace 2 días", completed: true },
            { name: "Pilates para Flexibilidad", date: "Hace 3 días", completed: true },
            { name: "Caminata Activa", date: "Hace 4 días", completed: true },
          ]
        };
        
        setSharedProgress(carlosProgress);
        toast({
          title: "Progreso encontrado",
          description: `Mostrando progreso de ${carlosProgress.userName}`
        });
      } else {
        showMockProgress();
      }
    } else {
      toast({
        title: "Código requerido",
        description: "Por favor, ingresa un código de progreso válido.",
        variant: "destructive"
      });
    }
  };

  const showMockProgress = () => {
    // Simular datos de progreso compartido para otros códigos
    const mockSharedProgress = {
      userName: "María González",
      age: 68,
      memberSince: "15/03/2024",
      weeklyProgress: {
        sessionsCompleted: 4,
        totalSessions: 5,
        exerciseMinutes: 180,
        weeklyGoal: 200
      },
      progressHistory: [
        { week: "Esta semana", sessions: 4, minutes: 180 },
        { week: "Semana pasada", sessions: 5, minutes: 200 },
        { week: "Hace 2 semanas", sessions: 3, minutes: 150 },
        { week: "Hace 3 semanas", sessions: 4, minutes: 170 },
      ],
      recentSessions: [
        { name: "Yoga Suave", date: "Hoy", completed: true },
        { name: "Equilibrio y Coordinación", date: "Ayer", completed: true },
        { name: "Aqua Aeróbicos", date: "Hace 2 días", completed: true },
        { name: "Caminata Activa", date: "Hace 3 días", completed: true },
      ]
    };
    
    setSharedProgress(mockSharedProgress);
    toast({
      title: "Progreso encontrado",
      description: `Mostrando progreso de ${mockSharedProgress.userName}`
    });
  };

  const ProgressViewer = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Progreso de {sharedProgress.userName}
          </CardTitle>
          <p className="text-gray-600">
            {sharedProgress.age} años • Miembro desde {sharedProgress.memberSince}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progreso Semanal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Progreso Semanal
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Sesiones completadas</span>
                  <span>{sharedProgress.weeklyProgress.sessionsCompleted}/{sharedProgress.weeklyProgress.totalSessions}</span>
                </div>
                <Progress value={(sharedProgress.weeklyProgress.sessionsCompleted / sharedProgress.weeklyProgress.totalSessions) * 100} />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Minutos de ejercicio</span>
                  <span>{sharedProgress.weeklyProgress.exerciseMinutes}/{sharedProgress.weeklyProgress.weeklyGoal}</span>
                </div>
                <Progress value={(sharedProgress.weeklyProgress.exerciseMinutes / sharedProgress.weeklyProgress.weeklyGoal) * 100} />
              </div>
            </div>
          </div>

          {/* Historial */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-600" />
              Historial de Progreso
            </h3>
            <div className="space-y-3">
              {sharedProgress.progressHistory.map((week, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{week.week}</span>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span>{week.sessions} sesiones</span>
                    <span>{week.minutes} minutos</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sesiones Recientes */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
              Sesiones Recientes
            </h3>
            <div className="space-y-2">
              {sharedProgress.recentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">{session.name}</span>
                    <p className="text-sm text-gray-600">{session.date}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={() => {
              setShowProgressViewer(false);
              setSharedProgress(null);
              setProgressCode('');
            }} variant="outline" className="flex-1">
              Volver
            </Button>
            <Button onClick={() => onNavigate('auth')} className="flex-1">
              Crear mi cuenta
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          onClick={() => onNavigate('landing')}
          variant="ghost"
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al inicio
        </Button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="font-bold text-2xl text-gray-900">3M</div>
              <div className="text-gray-500 text-sm">Mejora Movilidad Móvil</div>
            </div>
          </div>
        </div>

        {sharedProgress ? (
          <ProgressViewer />
        ) : !showProgressViewer ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </CardTitle>
                <p className="text-gray-600">
                  {isLogin 
                    ? 'Ingresa a tu cuenta para continuar' 
                    : 'Únete a nuestra comunidad de bienestar'
                  }
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre completo *
                        </label>
                        <Input
                          name="name"
                          type="text"
                          placeholder="Ingresa tu nombre completo"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Edad *
                        </label>
                        <Input
                          name="age"
                          type="number"
                          placeholder="Ingresa tu edad"
                          value={formData.age}
                          onChange={handleInputChange}
                          min="18"
                          max="120"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Teléfono
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          placeholder="Ingresa tu teléfono"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Correo electrónico *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="carlos.ruiz@3m.cl"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contraseña *
                    </label>
                    <div className="relative">
                      <Input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="password123"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {isLogin 
                      ? '¿No tienes cuenta? Regístrate aquí' 
                      : '¿Ya tienes cuenta? Inicia sesión aquí'
                    }
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setShowProgressViewer(true)}
                    className="text-gray-600 hover:text-gray-800 text-sm flex items-center justify-center mx-auto"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Visualizar progreso con código
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Visualizar Progreso
                </CardTitle>
                <p className="text-gray-600">
                  Ingresa el código compartido para ver el progreso
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProgressView} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Código de progreso
                    </label>
                    <Input
                      type="text"
                      placeholder="Ejemplo: CARLOS"
                      value={progressCode}
                      onChange={(e) => setProgressCode(e.target.value)}
                      className="text-center font-mono text-lg"
                      maxLength={10}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Ingresa el código que te compartió tu familiar
                    </p>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Search className="w-5 h-5 mr-2" />
                    Ver Progreso
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowProgressViewer(false)}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Volver al inicio de sesión
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
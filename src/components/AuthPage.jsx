import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Eye, EyeOff, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { defaultUser } from '@/data/mockData';

export default function AuthPage({ onNavigate, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showProgressViewer, setShowProgressViewer] = useState(false);
  const [progressCode, setProgressCode] = useState('');
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
        onLogin();
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
          age: formData.age,
          email: formData.email,
          phone: formData.phone,
          memberSince: new Date().toLocaleDateString('es-CL'),
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
      toast({
        title: "Progreso encontrado",
        description: `Mostrando progreso para el código: ${progressCode}`
      });
    } else {
      toast({
        title: "Código requerido",
        description: "Por favor, ingresa un código de progreso válido.",
        variant: "destructive"
      });
    }
  };

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

        {!showProgressViewer ? (
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
                      placeholder="Ingresa el código"
                      value={progressCode}
                      onChange={(e) => setProgressCode(e.target.value)}
                      className="text-center font-mono text-lg"
                      maxLength={6}
                    />
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
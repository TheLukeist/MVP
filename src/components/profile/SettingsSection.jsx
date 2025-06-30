import React from 'react';
import { Settings, Bell, Shield, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { useToast } from '@/components/ui/use-toast.js';

export default function SettingsSection({ userProfile, handlePreferenceChange }) {
  const { toast } = useToast();

  const handleNotImplemented = () => {
    toast({
      title: "🚧 Funcionalidad en construcción",
      description: "Esta funcionalidad no está implementada aún—¡pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Configuración y Preferencias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Notificaciones</div>
              <div className="text-sm text-gray-600">Recibir recordatorios de sesiones</div>
            </div>
            <Switch
              checked={userProfile.preferences.notifications}
              onCheckedChange={(checked) => handlePreferenceChange('notifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Modo Privado</div>
              <div className="text-sm text-gray-600">Ocultar progreso de otros usuarios</div>
            </div>
            <Switch
              checked={userProfile.preferences.privateMode}
              onCheckedChange={(checked) => handlePreferenceChange('privateMode', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Recordatorios de Medicamentos</div>
              <div className="text-sm text-gray-600">Alertas para tomar medicamentos</div>
            </div>
            <Switch
              checked={userProfile.preferences.medicationReminders}
              onCheckedChange={(checked) => handlePreferenceChange('medicationReminders', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Compartir Progreso</div>
              <div className="text-sm text-gray-600">Permitir compartir logros con familiares</div>
            </div>
            <Switch
              checked={userProfile.preferences.shareProgress}
              onCheckedChange={(checked) => handlePreferenceChange('shareProgress', checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acciones de Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" onClick={handleNotImplemented}>
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
            <Button variant="outline" onClick={handleNotImplemented}>
              <Bell className="w-4 h-4 mr-2" />
              Notificaciones
            </Button>
            <Button variant="outline" onClick={handleNotImplemented}>
              <Shield className="w-4 h-4 mr-2" />
              Privacidad
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estado de Suscripción</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">
                {userProfile.isPremium ? 'Plan Premium' : 'Plan Gratuito'}
              </div>
              <div className="text-sm text-gray-600">
                {userProfile.isPremium 
                  ? 'Acceso completo a todas las funciones'
                  : 'Funciones básicas disponibles'
                }
              </div>
            </div>
            {userProfile.isPremium ? (
              <Badge className="bg-yellow-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Premium Activo
              </Badge>
            ) : (
              <Button onClick={handleNotImplemented} className="bg-yellow-500 hover:bg-yellow-600">
                <Crown className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
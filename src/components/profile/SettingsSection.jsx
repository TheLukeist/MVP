import React from 'react';
import { Settings, Bell, Shield, Crown, User, Lock, Trash2, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Switch } from '@/components/ui/switch.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { useToast } from '@/components/ui/use-toast.js';

export default function SettingsSection({ userProfile, handlePreferenceChange }) {
  const { toast } = useToast();

  const handleChangePassword = () => {
    toast({
      title: "Cambiar Contraseña",
      description: "Se ha enviado un enlace de restablecimiento a tu correo electrónico."
    });
  };

  const handleExportData = () => {
    const userData = {
      profile: userProfile,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `3m-datos-${userProfile.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Datos exportados",
      description: "Tus datos han sido descargados exitosamente."
    });
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            toast({
              title: "Datos importados",
              description: "Tus datos han sido importados exitosamente."
            });
          } catch (error) {
            toast({
              title: "Error al importar",
              description: "El archivo no tiene el formato correcto.",
              variant: "destructive"
            });
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Eliminar Cuenta",
      description: "Para eliminar tu cuenta, contacta a soporte en contacto@3m.cl",
      variant: "destructive"
    });
  };

  const handleUpgradeToPremium = () => {
    toast({
      title: "Actualizar a Premium",
      description: "Serás redirigido a la página de pago para actualizar tu plan."
    });
  };

  const handleManageSubscription = () => {
    toast({
      title: "Gestionar Suscripción",
      description: "Serás redirigido al portal de gestión de suscripciones."
    });
  };

  const handleContactSupport = () => {
    toast({
      title: "Contactar Soporte",
      description: "Puedes contactarnos en contacto@3m.cl o llamar al +56 9 1234 5678"
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
          <CardTitle>Seguridad de la Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleChangePassword}>
              <Lock className="w-4 h-4 mr-2" />
              Cambiar Contraseña
            </Button>
            <Button variant="outline" onClick={handleContactSupport}>
              <Shield className="w-4 h-4 mr-2" />
              Centro de Seguridad
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gestión de Datos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Exportar Datos
            </Button>
            <Button variant="outline" onClick={handleImportData}>
              <Upload className="w-4 h-4 mr-2" />
              Importar Datos
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Puedes exportar todos tus datos personales y de progreso en formato JSON.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estado de Suscripción</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
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
              <Button onClick={handleUpgradeToPremium} className="bg-yellow-500 hover:bg-yellow-600">
                <Crown className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
            )}
          </div>
          
          {userProfile.isPremium && (
            <div className="pt-4 border-t">
              <Button variant="outline" onClick={handleManageSubscription} className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Gestionar Suscripción
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Soporte y Ayuda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleContactSupport}>
              <Bell className="w-4 h-4 mr-2" />
              Contactar Soporte
            </Button>
            <Button variant="outline" onClick={() => window.open('https://3m.cl/ayuda', '_blank')}>
              <User className="w-4 h-4 mr-2" />
              Centro de Ayuda
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Zona de Peligro</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-red-600 mb-2">Eliminar Cuenta</h4>
              <p className="text-sm text-gray-600 mb-4">
                Esta acción eliminará permanentemente tu cuenta y todos los datos asociados. Esta acción no se puede deshacer.
              </p>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar Cuenta
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
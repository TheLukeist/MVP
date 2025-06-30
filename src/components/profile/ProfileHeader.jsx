import React from 'react';
import { Crown, CheckCircle, Star, Calendar, Heart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { useToast } from '@/components/ui/use-toast.js';

const premiumBenefits = [
  { icon: Calendar, title: "Sesiones ilimitadas", description: "Acceso sin restricciones a todas las sesiones" },
  { icon: Heart, title: "Consultas personalizadas", description: "Asesoramiento directo con profesionales" },
  { icon: Shield, title: "Descuentos en salud", description: "Ofertas especiales en productos de bienestar" },
  { icon: Star, title: "Acceso prioritario", description: "Reservas preferenciales en eventos especiales" }
];

export default function ProfileHeader({ userProfile }) {
  const { toast } = useToast();

  const upgradeToPremium = () => {
    toast({
      title: "🚀 Actualizar a Premium",
      description: "Serás redirigido a la página de pago. Plan Premium por solo $3.990 CLP/mes"
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-3xl font-bold text-blue-600">
                {userProfile.name ? userProfile.name.split(' ').map(n => n[0]).join('') : 'U'}
              </span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
                {userProfile.isPremium && (
                  <Badge className="bg-yellow-500 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-gray-600">{userProfile.age > 0 ? `${userProfile.age} años` : 'Edad no especificada'}</p>
              <p className="text-sm text-gray-500">Miembro desde {userProfile.memberSince}</p>
            </div>
            {!userProfile.isPremium && (
              <Button onClick={upgradeToPremium} size="lg" className="bg-yellow-500 hover:bg-yellow-600 w-full sm:w-auto">
                <Crown className="w-4 h-4 mr-2" />
                Actualizar a Premium
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {userProfile.isPremium && (
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Crown className="w-6 h-6 text-yellow-600 mr-2" />
              <h3 className="text-xl font-bold text-yellow-800">Beneficios Premium Activos</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {premiumBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{benefit.title}</h4>
                    <p className="text-xs text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-yellow-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-800">Plan Premium Activo</p>
                  <p className="text-xs text-yellow-700">$3.990 CLP/mes • Próximo pago: 15 Feb 2025</p>
                </div>
                <CheckCircle className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
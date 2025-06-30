import React, { useState } from 'react';
import { Crown, CheckCircle, Star, Calendar, Heart, Shield, Coins, Gift, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import { useLocalStorage } from '@/hooks/useLocalStorage.js';

const premiumBenefits = [
  { icon: Calendar, title: "Sesiones ilimitadas", description: "Acceso sin restricciones a todas las sesiones" },
  { icon: Heart, title: "Consultas personalizadas", description: "Asesoramiento directo con profesionales" },
  { icon: Shield, title: "Descuentos en salud", description: "Ofertas especiales en productos de bienestar" },
  { icon: Star, title: "Acceso prioritario", description: "Reservas preferenciales en eventos especiales" }
];

const rewardItems = [
  { id: 1, name: "Descuento 10% Farmacia", cost: 5, icon: Heart, description: "Descuento en medicamentos y productos de salud" },
  { id: 2, name: "Consulta Nutricional", cost: 8, icon: Star, description: "Sesión personalizada con nutricionista" },
  { id: 3, name: "Kit de Ejercicios", cost: 12, icon: Gift, description: "Set completo de accesorios para ejercicios en casa" },
  { id: 4, name: "Masaje Terapéutico", cost: 15, icon: Heart, description: "Sesión de masaje relajante de 60 minutos" },
  { id: 5, name: "Clase Premium Grupal", cost: 3, icon: Calendar, description: "Acceso a clase especial con instructor premium" },
  { id: 6, name: "Evaluación Médica", cost: 20, icon: Shield, description: "Chequeo médico completo con especialista" }
];

export default function ProfileHeader({ userProfile }) {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [completedSessions] = useLocalStorage('completedSessions', []);
  const [userCoins, setUserCoins] = useLocalStorage('userCoins', completedSessions.length);
  const { toast } = useToast();

  const handlePremiumUpgrade = () => {
    toast({
      title: "🚀 Redirigiendo a pago",
      description: "Serás redirigido a la página de pago segura para completar tu suscripción Premium."
    });
    setShowPremiumModal(false);
  };

  const handleRedeemReward = (item) => {
    if (userCoins >= item.cost) {
      setUserCoins(userCoins - item.cost);
      toast({
        title: "¡Recompensa canjeada!",
        description: `Has canjeado ${item.name}. Te contactaremos pronto para coordinar.`,
        variant: "success"
      });
    } else {
      toast({
        title: "Monedas insuficientes",
        description: `Necesitas ${item.cost - userCoins} monedas más para canjear esta recompensa.`,
        variant: "destructive"
      });
    }
  };

  const PremiumModal = () => (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle className="flex items-center text-2xl">
          <Crown className="w-6 h-6 text-yellow-600 mr-2" />
          Plan Premium 3M
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6 py-4">
        <div className="text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-2xl p-8 mb-6">
            <div className="text-5xl font-bold mb-2">$3.990</div>
            <div className="text-yellow-100 text-lg">CLP/mes</div>
            <div className="text-sm text-yellow-200 mt-2">Sin compromisos • Cancela cuando quieras</div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Beneficios incluidos:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {premiumBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button onClick={handlePremiumUpgrade} size="lg" className="flex-1 bg-yellow-500 hover:bg-yellow-600">
            <Crown className="w-5 h-5 mr-2" />
            Suscribirse Ahora
          </Button>
          <Button onClick={() => setShowPremiumModal(false)} variant="outline" size="lg">
            Cancelar
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  const RewardsModal = () => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center text-2xl">
          <Coins className="w-6 h-6 text-yellow-600 mr-2" />
          Tienda de Recompensas
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-6 py-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Tus Monedas 3M</h3>
              <p className="text-sm text-blue-700">Gana 1 moneda por cada sesión completada</p>
            </div>
            <div className="flex items-center bg-white rounded-full px-4 py-2">
              <Coins className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-xl font-bold text-gray-900">{userCoins}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewardItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <div className="flex items-center mt-1">
                      <Coins className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-gray-700">{item.cost} monedas</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
              <Button 
                onClick={() => handleRedeemReward(item)}
                disabled={userCoins < item.cost}
                className="w-full"
                variant={userCoins >= item.cost ? "default" : "outline"}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {userCoins >= item.cost ? "Canjear" : "Monedas insuficientes"}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </DialogContent>
  );

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
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <Coins className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium text-gray-700">{userCoins} monedas 3M</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              {!userProfile.isPremium ? (
                <Dialog open={showPremiumModal} onOpenChange={setShowPremiumModal}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 w-full sm:w-auto">
                      <Crown className="w-4 h-4 mr-2" />
                      Actualizar a Premium
                    </Button>
                  </DialogTrigger>
                  <PremiumModal />
                </Dialog>
              ) : (
                <Dialog open={showRewardsModal} onOpenChange={setShowRewardsModal}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 w-full sm:w-auto">
                      <Coins className="w-4 h-4 mr-2" />
                      Canjear Recompensas
                    </Button>
                  </DialogTrigger>
                  <RewardsModal />
                </Dialog>
              )}
            </div>
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
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const premiumFeatures = [
  "Sesiones ilimitadas",
  "Consultas personalizadas",
  "Descuentos en productos de salud",
  "Cupones para farmacias",
  "Acceso prioritario a eventos",
  "Seguimiento médico básico"
];

export default function PremiumPlan({ onNavigate }) {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Plan Premium 3M
            </h2>
            <p className="text-xl text-gray-600">
              Accede a beneficios exclusivos por solo $4.990 CLP/mes
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Beneficios Premium
                </h3>
                <ul className="space-y-4">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-2xl p-8 mb-6">
                  <div className="text-4xl font-bold mb-2">$4.990</div>
                  <div className="text-blue-100">CLP/mes</div>
                </div>
                <Button 
                  onClick={() => onNavigate('auth')}
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Comenzar Plan Premium
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  Cancela cuando quieras • Sin compromisos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
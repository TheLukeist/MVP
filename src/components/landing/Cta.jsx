import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

export default function Cta({ onNavigate }) {
  return (
    <section className="py-20 gradient-blue text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para comenzar tu viaje hacia el bienestar?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Únete a cientos de adultos mayores que ya están disfrutando de una vida más activa y saludable
        </p>
        <div className="flex justify-center">
          <Button 
            onClick={() => onNavigate('auth')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Comenzar Gratis <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
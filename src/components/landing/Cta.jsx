import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useToast } from '@/components/ui/use-toast.js';

export default function Cta({ onNavigate }) {
  const { toast } = useToast();

  const handleMoreInfo = () => {
    toast({
      title: "📞 Contacto",
      description: "Llámanos al +56 9 1234 5678 para más información"
    });
  };

  return (
    <section className="py-20 gradient-blue text-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para comenzar tu viaje hacia el bienestar?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Únete a cientos de adultos mayores que ya están disfrutando de una vida más activa y saludable
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => onNavigate('auth')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Comenzar Gratis <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            onClick={handleMoreInfo}
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-blue-600"
          >
            Más Información
          </Button>
        </div>
      </div>
    </section>
  );
}
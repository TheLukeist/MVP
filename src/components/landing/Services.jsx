import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Activity, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    icon: Calendar,
    title: "Sesiones Programadas",
    description: "Reserva sesiones presenciales u online con instructores certificados. Horarios flexibles adaptados a tus necesidades."
  },
  {
    icon: Activity,
    title: "Ejercicios Personalizados",
    description: "Biblioteca de ejercicios adaptados para diferentes niveles de movilidad y condiciones de salud específicas."
  },
  {
    icon: Heart,
    title: "Seguimiento de Salud",
    description: "Monitorea tu progreso con métricas de salud personalizadas y reportes detallados de tu evolución."
  }
];

export default function Services() {
  return (
    <section id="services-section" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una gama completa de servicios diseñados específicamente para el bienestar de adultos mayores
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <service.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
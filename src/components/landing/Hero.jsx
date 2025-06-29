import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const slides = [
  {
    id: 1,
    title: "Sesiones Personalizadas de Bienestar",
    subtitle: "Ejercicios adaptados para adultos mayores",
    description: "Participa en sesiones presenciales y online diseñadas específicamente para mantener tu salud y vitalidad. Nuestros profesionales certificados te guían en cada paso.",
    features: ["Instructores certificados", "Ejercicios seguros", "Grupos reducidos"],
    gradient: "gradient-blue",
    cta: "Comenzar Ahora",
  },
  {
    id: 2,
    title: "Seguimiento de tu Progreso",
    subtitle: "Visualiza tus logros día a día",
    description: "Monitorea tu progreso con métricas claras y motivadoras. Celebra cada logro y mantente motivado en tu camino hacia un envejecimiento saludable.",
    features: ["Métricas de salud", "Logros visuales", "Reportes semanales"],
    gradient: "gradient-purple",
    cta: "Comenzar Ahora",
  },
  {
    id: 3,
    title: "Comunidad de Bienestar",
    subtitle: "Conecta con personas como tú",
    description: "Únete a una comunidad activa de adultos mayores. Comparte experiencias, motívense mutuamente y disfruta de actividades grupales.",
    features: ["Grupos de apoyo", "Actividades sociales", "Conexiones reales"],
    gradient: "gradient-orange",
    cta: "Comenzar Ahora",
  }
];

export default function Hero({ onNavigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 ${slides[currentSlide].gradient} flex items-center justify-center text-white`}
        >
          <div className="container mx-auto px-6 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-shadow"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {slides[currentSlide].title}
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl mb-8 opacity-90"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {slides[currentSlide].subtitle}
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center gap-6 mb-12"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {slides[currentSlide].features.map((feature, index) => (
                <div key={index} className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button 
                onClick={() => onNavigate('auth')}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
              >
                {slides[currentSlide].cta} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
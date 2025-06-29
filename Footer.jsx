import React from 'react';
import { Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-xl">3M</div>
                <div className="text-gray-400 text-sm">Mejora Movilidad Móvil</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Dedicados a mejorar la calidad de vida de los adultos mayores a través de ejercicio seguro y personalizado.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Sesiones Presenciales</li>
              <li>Clases Online</li>
              <li>Ejercicios Personalizados</li>
              <li>Seguimiento de Progreso</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li>+56 9 1234 5678</li>
              <li>contacto@3m.cl</li>
              <li>Santiago, Chile</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Ubicación</h3>
            <p className="text-gray-400">
              Santiago de Chile<br />
              Región Metropolitana<br />
              Chile
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 3M. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
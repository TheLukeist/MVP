import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, ChevronRight, Dumbbell, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import { mockExercises, categories } from '@/data/mockData.js';

export default function ExercisesPage() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [showVideo, setShowVideo] = useState(false);
  const { toast } = useToast();

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Muy Fácil': return 'bg-green-500';
      case 'Fácil': return 'bg-blue-500';
      case 'Moderado': return 'bg-yellow-500';
      case 'Difícil': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleStartExercise = (exercise) => {
    toast({
      title: `Iniciando: ${exercise.name}`,
      description: "¡Excelente elección! Recuerda mantener una postura correcta."
    });
  };

  const handleWatchVideo = (exercise) => {
    setShowVideo(true);
    toast({
      title: `Reproduciendo video: ${exercise.name}`,
      description: "Sigue las instrucciones del video cuidadosamente."
    });
  };

  const filteredExercises = activeCategory === 'Todas'
    ? mockExercises
    : mockExercises.filter(ex => ex.category.toLowerCase() === activeCategory.toLowerCase());

  const ExerciseModal = ({ exercise }) => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">{exercise.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 py-4">
        {showVideo ? (
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Video del Ejercicio</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowVideo(false)}
              >
                <X className="w-4 h-4 mr-2" />
                Cerrar Video
              </Button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                src={exercise.videoUrl}
                title={`Video de ${exercise.name}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <img 
              src={exercise.image} 
              alt={exercise.imageDescription} 
              className="w-full max-w-md mx-auto rounded-lg shadow-md object-cover h-64"
            />
            <Button 
              onClick={() => handleWatchVideo(exercise)} 
              className="mt-4"
              variant="outline"
            >
              <Play className="w-4 h-4 mr-2" />
              Ver Video Demostrativo
            </Button>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold">{exercise.duration}</div>
            <div className="text-sm text-gray-600">Duración</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="font-semibold">{exercise.difficulty}</div>
            <div className="text-sm text-gray-600">Dificultad</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg col-span-2 md:col-span-1">
            <div className="w-6 h-6 bg-purple-600 rounded mx-auto mb-2"></div>
            <div className="font-semibold">{exercise.category}</div>
            <div className="text-sm text-gray-600">Categoría</div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Descripción</h3>
          <p className="text-gray-600">{exercise.description}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Instrucciones paso a paso</h3>
          <ol className="space-y-2">
            {exercise.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">{index + 1}</span>
                <span className="text-gray-700">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Beneficios</h3>
          <div className="flex flex-wrap gap-2">
            {exercise.benefits.map((benefit, index) => (
              <Badge key={index} variant="secondary" className="py-1 px-3">{benefit}</Badge>
            ))}
          </div>
        </div>
        <div className="text-center pt-4 flex gap-4 justify-center">
          <Button onClick={() => handleStartExercise(exercise)} size="lg">
            <Play className="w-5 h-5 mr-2" />
            Comenzar Ejercicio
          </Button>
          {!showVideo && (
            <Button onClick={() => handleWatchVideo(exercise)} variant="outline" size="lg">
              <Play className="w-5 h-5 mr-2" />
              Ver Video
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Biblioteca de Ejercicios</h1>
        <p className="text-gray-600">Ejercicios adaptados para tu bienestar</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Categorías de Ejercicios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant={activeCategory === category ? 'default' : 'outline'} 
                onClick={() => setActiveCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise, index) => (
          <motion.div key={exercise.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Dialog onOpenChange={(open) => {
              if (!open) {
                setSelectedExercise(null);
                setShowVideo(false);
              }
            }}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors">{exercise.name}</CardTitle>
                      <Badge variant="secondary" className="mb-2 capitalize">{exercise.category}</Badge>
                    </div>
                    <Badge className={`${getDifficultyColor(exercise.difficulty)} text-white`}>{exercise.difficulty}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="mb-4">
                    <img 
                      src={exercise.image} 
                      alt={exercise.imageDescription} 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{exercise.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-1" /><span>{exercise.duration}</span></div>
                    <div className="flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-500" /><span>{exercise.difficulty}</span></div>
                  </div>
                  <DialogTrigger asChild>
                    <Button className="w-full mt-auto" onClick={() => setSelectedExercise(exercise)}>
                      <Play className="w-4 h-4 mr-2" />
                      Ver Ejercicio
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </DialogTrigger>
                </CardContent>
              </Card>
              {selectedExercise && selectedExercise.id === exercise.id && <ExerciseModal exercise={selectedExercise} />}
            </Dialog>
          </motion.div>
        ))}
      </div>
      {filteredExercises.length === 0 && (
         <div className="text-center py-12 col-span-full">
          <div className="text-gray-400 mb-4"><Dumbbell className="w-16 h-16 mx-auto" /></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron ejercicios</h3>
          <p className="text-gray-600">No hay ejercicios disponibles en esta categoría.</p>
        </div>
      )}
    </div>
  );
}
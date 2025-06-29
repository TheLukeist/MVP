import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, ChevronRight, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { mockExercises, categories } from '@/data/mockData';

export default function ExercisesPage() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todas');
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

  const filteredExercises = activeCategory === 'Todas'
    ? mockExercises
    : mockExercises.filter(ex => ex.category.toLowerCase() === activeCategory.toLowerCase());

  const ExerciseModal = ({ exercise }) => (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold">{exercise.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 py-4">
        <div className="exercise-video flex-col">
          <Play className="w-12 h-12 text-gray-400" />
          <p className="mt-2">Video demostrativo del ejercicio</p>
        </div>
        <div className="text-center">
          <img  alt={`Demostración del ejercicio ${exercise.name}`} className="w-full max-w-md mx-auto rounded-lg shadow-md" src="https://images.unsplash.com/photo-1522152881874-22fcbf9cc1fd" />
        </div>
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
        <div className="text-center pt-4">
          <Button onClick={() => handleStartExercise(exercise)} size="lg">
            <Play className="w-5 h-5 mr-2" />
            Comenzar Ejercicio
          </Button>
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
            <Dialog onOpenChange={(open) => !open && setSelectedExercise(null)}>
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
                    <img  alt={exercise.imageDescription} className="w-full h-40 object-cover rounded-lg" src="https://images.unsplash.com/photo-1623874400767-0fcdeedd0f5d" />
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
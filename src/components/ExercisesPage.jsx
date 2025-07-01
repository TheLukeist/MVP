import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Star, ChevronRight, Dumbbell, X, Plus, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import { useLocalStorage } from '@/hooks/useLocalStorage.js';
import { mockExercises, categories } from '@/data/mockData.js';

export default function ExercisesPage() {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [showVideo, setShowVideo] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [customRoutines, setCustomRoutines] = useLocalStorage('customRoutines', []);
  const [showCreateRoutine, setShowCreateRoutine] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState('');
  const [selectedExercisesForRoutine, setSelectedExercisesForRoutine] = useState([]);
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

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  const handleOpenExerciseModal = (exercise) => {
    setSelectedExercise(exercise);
    setShowVideo(false);
    setIsExerciseModalOpen(true);
  };

  const handleCloseExerciseModal = () => {
    setIsExerciseModalOpen(false);
    setSelectedExercise(null);
    setShowVideo(false);
  };

  const handleAddToRoutine = (exercise) => {
    if (!selectedExercisesForRoutine.find(ex => ex.id === exercise.id)) {
      setSelectedExercisesForRoutine([...selectedExercisesForRoutine, exercise]);
      toast({
        title: "Ejercicio agregado",
        description: `${exercise.name} agregado a tu rutina personalizada.`
      });
    } else {
      toast({
        title: "Ya agregado",
        description: "Este ejercicio ya está en tu rutina."
      });
    }
  };

  const handleRemoveFromRoutine = (exerciseId) => {
    setSelectedExercisesForRoutine(selectedExercisesForRoutine.filter(ex => ex.id !== exerciseId));
  };

  const handleSaveRoutine = () => {
    if (!newRoutineName.trim()) {
      toast({
        title: "Nombre requerido",
        description: "Por favor, ingresa un nombre para tu rutina.",
        variant: "destructive"
      });
      return;
    }

    if (selectedExercisesForRoutine.length === 0) {
      toast({
        title: "Ejercicios requeridos",
        description: "Agrega al menos un ejercicio a tu rutina.",
        variant: "destructive"
      });
      return;
    }

    const newRoutine = {
      id: Date.now(),
      name: newRoutineName.trim(),
      exercises: selectedExercisesForRoutine,
      createdAt: new Date().toLocaleDateString('es-CL'),
      totalDuration: selectedExercisesForRoutine.reduce((total, ex) => {
        const minutes = parseInt(ex.duration.split(' ')[0]);
        return total + minutes;
      }, 0)
    };

    setCustomRoutines([...customRoutines, newRoutine]);
    
    // Limpiar el formulario
    setNewRoutineName('');
    setSelectedExercisesForRoutine([]);
    setShowCreateRoutine(false);
    
    toast({
      title: "¡Rutina creada!",
      description: `Tu rutina "${newRoutine.name}" ha sido guardada exitosamente.`
    });
  };

  const handleDeleteRoutine = (routineId) => {
    setCustomRoutines(customRoutines.filter(routine => routine.id !== routineId));
    toast({
      title: "Rutina eliminada",
      description: "La rutina ha sido eliminada exitosamente."
    });
  };

  const handleStartRoutine = (routine) => {
    toast({
      title: `Iniciando rutina: ${routine.name}`,
      description: `Duración total: ${routine.totalDuration} minutos. ¡Vamos a ejercitarnos!`
    });
  };

  const filteredExercises = activeCategory === 'Todas'
    ? mockExercises
    : mockExercises.filter(ex => ex.category.toLowerCase() === activeCategory.toLowerCase());

  const ExerciseModal = ({ exercise, isOpen, onClose }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                  onClick={handleCloseVideo}
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
            {showCreateRoutine && (
              <Button onClick={() => handleAddToRoutine(exercise)} variant="outline" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Agregar a Rutina
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const CreateRoutineModal = () => (
    <Dialog open={showCreateRoutine} onOpenChange={setShowCreateRoutine}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Crear Rutina Personalizada</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de la rutina *
            </label>
            <Input
              value={newRoutineName}
              onChange={(e) => setNewRoutineName(e.target.value)}
              placeholder="Ej: Mi rutina matutina"
              className="w-full"
              maxLength={50}
            />
            <p className="text-xs text-gray-500 mt-1">
              Ingresa un nombre descriptivo para tu rutina personalizada
            </p>
          </div>

          {selectedExercisesForRoutine.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Ejercicios seleccionados ({selectedExercisesForRoutine.length})</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedExercisesForRoutine.map((exercise, index) => (
                  <div key={exercise.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <span className="font-medium">{exercise.name}</span>
                        <span className="text-sm text-gray-600 ml-2">({exercise.duration})</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleRemoveFromRoutine(exercise.id)}
                      variant="ghost"
                      size="sm"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Duración total:</strong> {selectedExercisesForRoutine.reduce((total, ex) => {
                    const minutes = parseInt(ex.duration.split(' ')[0]);
                    return total + minutes;
                  }, 0)} minutos
                </p>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold mb-3">Seleccionar ejercicios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
              {mockExercises.map((exercise) => (
                <div key={exercise.id} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{exercise.name}</h4>
                      <p className="text-xs text-gray-600">{exercise.duration} • {exercise.difficulty}</p>
                    </div>
                    <Button
                      onClick={() => handleAddToRoutine(exercise)}
                      variant="outline"
                      size="sm"
                      disabled={selectedExercisesForRoutine.find(ex => ex.id === exercise.id)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button 
              onClick={handleSaveRoutine} 
              size="lg" 
              className="flex-1"
              disabled={!newRoutineName.trim() || selectedExercisesForRoutine.length === 0}
            >
              <Save className="w-5 h-5 mr-2" />
              Guardar Rutina
            </Button>
            <Button 
              onClick={() => {
                setShowCreateRoutine(false);
                setNewRoutineName('');
                setSelectedExercisesForRoutine([]);
              }} 
              variant="outline" 
              size="lg"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Ejercicios y Rutinas</h1>
        <p className="text-gray-600">Ejercicios adaptados para tu bienestar</p>
      </div>

      <Tabs defaultValue="exercises" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exercises">Biblioteca de Ejercicios</TabsTrigger>
          <TabsTrigger value="routines">Mis Rutinas ({customRoutines.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Categorías de Ejercicios</CardTitle>
                <Button onClick={() => setShowCreateRoutine(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Crear Rutina
                </Button>
              </div>
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
                    <Button 
                      className="w-full mt-auto" 
                      onClick={() => handleOpenExerciseModal(exercise)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Ver Ejercicio
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </CardContent>
                </Card>
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
        </TabsContent>

        <TabsContent value="routines" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Mis Rutinas Personalizadas</h2>
            <Button onClick={() => setShowCreateRoutine(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Nueva Rutina
            </Button>
          </div>

          {customRoutines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customRoutines.map((routine) => (
                <motion.div key={routine.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{routine.name}</CardTitle>
                          <p className="text-sm text-gray-600">
                            {routine.exercises.length} ejercicios • {routine.totalDuration} min
                          </p>
                          <p className="text-xs text-gray-500">Creada el {routine.createdAt}</p>
                        </div>
                        <Button
                          onClick={() => handleDeleteRoutine(routine.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {routine.exercises.slice(0, 3).map((exercise, index) => (
                          <div key={exercise.id} className="flex items-center text-sm">
                            <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-2">
                              {index + 1}
                            </span>
                            <span>{exercise.name}</span>
                            <span className="text-gray-500 ml-auto">{exercise.duration}</span>
                          </div>
                        ))}
                        {routine.exercises.length > 3 && (
                          <p className="text-sm text-gray-500 ml-7">
                            +{routine.exercises.length - 3} ejercicios más
                          </p>
                        )}
                      </div>
                      <Button onClick={() => handleStartRoutine(routine)} className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Iniciar Rutina
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4"><Dumbbell className="w-16 h-16 mx-auto" /></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes rutinas personalizadas</h3>
              <p className="text-gray-600 mb-4">Crea tu primera rutina combinando tus ejercicios favoritos.</p>
              <Button onClick={() => setShowCreateRoutine(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Crear Mi Primera Rutina
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Modal de ejercicio */}
      {selectedExercise && (
        <ExerciseModal 
          exercise={selectedExercise} 
          isOpen={isExerciseModalOpen}
          onClose={handleCloseExerciseModal}
        />
      )}

      {/* Modal de crear rutina */}
      <CreateRoutineModal />
    </div>
  );
}
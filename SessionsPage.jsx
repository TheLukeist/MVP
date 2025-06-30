import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Clock, MapPin, Users, Video } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import { mockSessions, locations, sessionTypes } from '@/data/mockData.js';
import { useLocalStorage } from '@/hooks/useLocalStorage.js';

export default function SessionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Todos los tipos');
  const [selectedLocation, setSelectedLocation] = useState('Todas las ubicaciones');
  const [bookedSessions, setBookedSessions] = useLocalStorage('bookedSessions', []);
  const { toast } = useToast();

  const filteredSessions = mockSessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Todos los tipos' || session.type === selectedType;
    const matchesLocation = selectedLocation === 'Todas las ubicaciones' || session.location === selectedLocation;
    
    return matchesSearch && matchesType && matchesLocation;
  });

  const handleBookSession = (sessionId) => {
    const session = mockSessions.find(s => s.id === sessionId);
    if (session.status === 'Completo') {
      toast({
        title: "Sesión completa",
        description: "Esta sesión ya no tiene cupos disponibles.",
        variant: "destructive"
      });
      return;
    }

    if (bookedSessions.includes(sessionId)) {
      toast({
        title: "Ya reservada",
        description: "Ya tienes esta sesión reservada.",
      });
      return;
    }

    setBookedSessions([...bookedSessions, sessionId]);
    toast({
      title: "¡Sesión reservada!",
      description: `Has reservado "${session.title}" exitosamente.`,
      variant: "success"
    });
  };

  const isSessionBooked = (sessionId) => {
    return bookedSessions.includes(sessionId);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Sesiones Disponibles</h1>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar por título o instructor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger><SelectValue placeholder="Tipo de sesión" /></SelectTrigger>
              <SelectContent>{sessionTypes.map((type) => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger><SelectValue placeholder="Ubicación" /></SelectTrigger>
              <SelectContent>{locations.map((location) => <SelectItem key={location} value={location}>{location}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSessions.map((session, index) => (
          <motion.div key={session.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{session.title}</CardTitle>
                    <p className="text-gray-600 font-medium">{session.instructor}</p>
                  </div>
                  <Badge variant={session.type === 'Online' ? 'secondary' : 'default'} className="ml-2">{session.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <div className="mb-4">
                  <img  alt={`Imagen de la sesión ${session.title}`} className="w-full h-48 object-cover rounded-lg" src="https://images.unsplash.com/photo-1669152670466-f65964bca7c2" />
                </div>
                <p className="text-gray-600 mb-4 flex-grow">{session.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600"><Calendar className="w-4 h-4 mr-2" /><span>{session.date}</span></div>
                  <div className="flex items-center text-sm text-gray-600"><Clock className="w-4 h-4 mr-2" /><span>{session.time}</span></div>
                  <div className="flex items-center text-sm text-gray-600">
                    {session.type === 'Online' ? <Video className="w-4 h-4 mr-2" /> : <MapPin className="w-4 h-4 mr-2" />}
                    <span>{session.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600"><Users className="w-4 h-4 mr-2" /><span>{session.participants}</span></div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t">
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">Disponibilidad:</span>
                    <Badge variant={session.status === 'Disponible' ? 'success' : 'destructive'}>{session.status}</Badge>
                  </div>
                  {isSessionBooked(session.id) ? (
                    <Button disabled className="bg-green-600 hover:bg-green-600">Reservada</Button>
                  ) : (
                    <Button onClick={() => handleBookSession(session.id)} disabled={session.status === 'Completo'}>
                      {session.status === 'Completo' ? 'Completo' : 'Reservar'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4"><Calendar className="w-16 h-16 mx-auto" /></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron sesiones</h3>
          <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda.</p>
        </div>
      )}
    </div>
  );
}
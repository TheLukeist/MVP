import React, { useState, useEffect } from 'react';
import { Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx';
import { useToast } from '@/components/ui/use-toast.js';
import { useLocalStorage } from '@/hooks/useLocalStorage.js';
import { mockUser } from '@/data/mockData.js';

import ProfileHeader from '@/components/profile/ProfileHeader.jsx';
import PersonalInformation from '@/components/profile/PersonalInformation.jsx';
import HealthMetrics from '@/components/profile/HealthMetrics.jsx';
import ProgressSection from '@/components/profile/ProgressSection.jsx';
import SettingsSection from '@/components/profile/SettingsSection.jsx';

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useLocalStorage('userProfile', mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);
  const { toast } = useToast();

  useEffect(() => {
    setEditedProfile(userProfile);
  }, [userProfile]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Perfil actualizado",
      description: "Tus cambios han sido guardados exitosamente."
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(userProfile);
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleHealthMetricChange = (metric, value) => {
    setEditedProfile(prev => ({
      ...prev,
      healthMetrics: { ...prev.healthMetrics, [metric]: value }
    }));
  };

  const handlePreferenceChange = (preference, value) => {
    const updatedProfile = {
      ...userProfile,
      preferences: { ...userProfile.preferences, [preference]: value }
    };
    setUserProfile(updatedProfile);
    setEditedProfile(updatedProfile);
    toast({
      title: "Preferencia actualizada",
      description: "Tu configuración se ha guardado."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Mi Perfil</h1>
        {!isEditing ? (
          <Button onClick={handleEdit} size="lg">
            <Edit className="w-5 h-5 mr-2" />
            Editar Perfil
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={handleSave} size="lg" className="bg-green-600 hover:bg-green-700">
              <Save className="w-5 h-5 mr-2" />
              Guardar
            </Button>
            <Button onClick={handleCancel} variant="outline" size="lg">
              <X className="w-5 h-5 mr-2" />
              Cancelar
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="health">Salud</TabsTrigger>
          <TabsTrigger value="progress">Progreso</TabsTrigger>
          <TabsTrigger value="settings">Ajustes</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <ProfileHeader userProfile={userProfile} />
          <PersonalInformation 
            isEditing={isEditing} 
            editedProfile={editedProfile} 
            handleInputChange={handleInputChange} 
          />
        </TabsContent>

        <TabsContent value="health">
          <HealthMetrics 
            isEditing={isEditing} 
            editedProfile={editedProfile} 
            handleHealthMetricChange={handleHealthMetricChange} 
          />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressSection userProfile={userProfile} />
        </TabsContent>

        <TabsContent value="settings">
          <SettingsSection 
            userProfile={userProfile} 
            handlePreferenceChange={handlePreferenceChange} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
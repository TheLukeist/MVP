import React from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PersonalInformation({ isEditing, editedProfile, handleInputChange }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre completo
            </label>
            {isEditing ? (
              <Input
                value={editedProfile.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            ) : (
              <p className="text-gray-900 p-3 bg-gray-50 rounded-lg min-h-[48px]">{editedProfile.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Edad
            </label>
            {isEditing ? (
              <Input
                type="number"
                value={editedProfile.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            ) : (
              <p className="text-gray-900 p-3 bg-gray-50 rounded-lg min-h-[48px]">{editedProfile.age > 0 ? `${editedProfile.age} años` : ''}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            {isEditing ? (
              <Input
                type="email"
                value={editedProfile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            ) : (
              <p className="text-gray-900 p-3 bg-gray-50 rounded-lg min-h-[48px]">{editedProfile.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            {isEditing ? (
              <Input
                value={editedProfile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            ) : (
              <p className="text-gray-900 p-3 bg-gray-50 rounded-lg min-h-[48px]">{editedProfile.phone}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección
            </label>
            {isEditing ? (
              <Input
                value={editedProfile.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            ) : (
              <p className="text-gray-900 p-3 bg-gray-50 rounded-lg min-h-[48px]">{editedProfile.address}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contacto de emergencia
            </label>
            {isEditing ? (
              <Input
                value={editedProfile.emergencyContact}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              />
            ) : (
              <p className="text-gray-900 p-3 bg-gray-50 rounded-lg min-h-[48px]">{editedProfile.emergencyContact}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
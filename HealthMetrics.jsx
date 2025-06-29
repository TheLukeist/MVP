import React from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HealthMetrics({ isEditing, editedProfile, handleHealthMetricChange }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Métricas de Salud</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600 mb-1">
              {isEditing ? (
                <Input
                  value={editedProfile.healthMetrics.weight}
                  onChange={(e) => handleHealthMetricChange('weight', e.target.value)}
                  className="text-center"
                />
              ) : (
                editedProfile.healthMetrics.weight
              )}
            </div>
            <div className="text-sm text-gray-600">Peso</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {isEditing ? (
                <Input
                  value={editedProfile.healthMetrics.height}
                  onChange={(e) => handleHealthMetricChange('height', e.target.value)}
                  className="text-center"
                />
              ) : (
                editedProfile.healthMetrics.height
              )}
            </div>
            <div className="text-sm text-gray-600">Altura</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {isEditing ? (
                <Input
                  value={editedProfile.healthMetrics.bloodPressure}
                  onChange={(e) => handleHealthMetricChange('bloodPressure', e.target.value)}
                  className="text-center"
                />
              ) : (
                editedProfile.healthMetrics.bloodPressure
              )}
            </div>
            <div className="text-sm text-gray-600">Presión Arterial</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {isEditing ? (
                <Input
                  value={editedProfile.healthMetrics.heartRate}
                  onChange={(e) => handleHealthMetricChange('heartRate', e.target.value)}
                  className="text-center"
                />
              ) : (
                editedProfile.healthMetrics.heartRate
              )}
            </div>
            <div className="text-sm text-gray-600">Frecuencia Cardíaca</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
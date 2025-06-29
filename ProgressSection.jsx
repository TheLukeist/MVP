import React, { useState } from 'react';
import { Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

export default function ProgressSection({ userProfile }) {
  const [shareCode, setShareCode] = useState('');
  const { toast } = useToast();

  const generateShareCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setShareCode(code);
    toast({
      title: "Código generado",
      description: `Tu código de progreso es: ${code}`
    });
  };

  const copyShareCode = () => {
    if (!shareCode) return;
    navigator.clipboard.writeText(shareCode);
    toast({
      title: "Código copiado",
      description: "El código ha sido copiado al portapapeles."
    });
  };
  
  const sessionsPercentage = userProfile.weeklyProgress.totalSessions > 0 
    ? (userProfile.weeklyProgress.sessionsCompleted / userProfile.weeklyProgress.totalSessions) * 100 
    : 0;
    
  const minutesPercentage = userProfile.weeklyProgress.weeklyGoal > 0 
    ? (userProfile.weeklyProgress.exerciseMinutes / userProfile.weeklyProgress.weeklyGoal) * 100
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Progreso Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Sesiones completadas</span>
                <span>{userProfile.weeklyProgress.sessionsCompleted}/{userProfile.weeklyProgress.totalSessions}</span>
              </div>
              <Progress value={sessionsPercentage} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Minutos de ejercicio</span>
                <span>{userProfile.weeklyProgress.exerciseMinutes}/{userProfile.weeklyProgress.weeklyGoal}</span>
              </div>
              <Progress value={minutesPercentage} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Progreso</CardTitle>
        </CardHeader>
        <CardContent>
          {userProfile.progressHistory.length > 0 ? (
            <div className="space-y-3">
              {userProfile.progressHistory.map((week, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{week.week}</span>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span>{week.sessions} sesiones</span>
                    <span>{week.minutes} minutos</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Aún no hay historial de progreso.</p>
          )}
        </CardContent>
      </Card>

      {userProfile.preferences.shareProgress && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share2 className="w-5 h-5 mr-2" />
              Compartir Progreso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Genera un código para que tus familiares puedan ver tu progreso.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={generateShareCode} className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">
                Generar Código
              </Button>
              {shareCode && (
                <div className="flex items-center space-x-2 w-full">
                  <Input value={shareCode} readOnly className="font-mono text-center" />
                  <Button onClick={copyShareCode} variant="outline" size="icon">
                    <Copy className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
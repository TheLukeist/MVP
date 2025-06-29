import React from 'react';
import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

export default function ProfileHeader({ userProfile }) {
  const { toast } = useToast();

  const upgradeToPremium = () => {
    toast({
      title: "🚧 Actualización Premium",
      description: "Esta funcionalidad no está implementada aún—¡pero no te preocupes! Puedes solicitarla en tu próximo prompt! 🚀"
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-3xl font-bold text-blue-600">
              {userProfile.name ? userProfile.name.split(' ').map(n => n[0]).join('') : 'U'}
            </span>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{userProfile.name}</h2>
              {userProfile.isPremium && (
                <Badge className="bg-yellow-500 text-white">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            <p className="text-gray-600">{userProfile.age > 0 ? `${userProfile.age} años` : 'Edad no especificada'}</p>
            <p className="text-sm text-gray-500">Miembro desde {userProfile.memberSince}</p>
          </div>
          {!userProfile.isPremium && (
            <Button onClick={upgradeToPremium} size="lg" className="bg-yellow-500 hover:bg-yellow-600 w-full sm:w-auto">
              <Crown className="w-4 h-4 mr-2" />
              Actualizar a Premium
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
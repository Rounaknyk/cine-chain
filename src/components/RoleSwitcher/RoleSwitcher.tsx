'use client';

import { useState } from 'react';
import { ChevronDown, Building, Package, Settings, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type UserRole = 'shipper' | 'recipient' | 'operations';

interface RoleSwitcherProps {
  currentRole: UserRole;
}

export default function RoleSwitcher({ currentRole }: RoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const roles = [
    {
      id: 'shipper' as UserRole,
      label: 'Shipper',
      icon: Building,
      description: 'Manage shipments',
      color: 'blue'
    },
    {
      id: 'recipient' as UserRole,
      label: 'Recipient',
      icon: Package,
      description: 'Track packages',
      color: 'green'
    },
    {
      id: 'operations' as UserRole,
      label: 'Operations',
      icon: Settings,
      description: 'Monitor network',
      color: 'orange'
    }
  ];

  const currentRoleData = roles.find(role => role.id === currentRole);
  const CurrentIcon = currentRoleData?.icon || Building;

  const handleRoleChange = (roleId: UserRole) => {
    if (roleId !== currentRole) {
      window.location.href = `/dashboard/${roleId}`;
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2"
      >
        <CurrentIcon className="h-4 w-4" />
        <span>{currentRoleData?.label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 mt-2 w-64 z-50 shadow-lg">
          <CardContent className="p-2">
            <div className="space-y-1">
              {roles.map((role) => {
                const Icon = role.icon;
                const isCurrent = role.id === currentRole;
                
                return (
                  <Button
                    key={role.id}
                    variant="ghost"
                    className={`w-full justify-start h-auto p-3 ${
                      isCurrent ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleRoleChange(role.id)}
                  >
                    <div className="flex items-center space-x-3 w-full">
                      <div className={`p-2 rounded-lg ${
                        role.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                        role.color === 'green' ? 'bg-green-100 text-green-600' :
                        'bg-orange-100 text-orange-600'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{role.label}</span>
                          {isCurrent && <Check className="h-4 w-4 text-green-600" />}
                        </div>
                        <div className="text-sm text-gray-500">{role.description}</div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
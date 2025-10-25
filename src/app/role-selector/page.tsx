'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Truck, Package, Settings, ArrowRight, Users, Building, User, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type UserRole = 'shipper' | 'recipient' | 'operations';

export default function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const router = useRouter();

  const roles = [
    {
      id: 'shipper' as UserRole,
      title: 'Shipper',
      subtitle: 'Companies sending goods',
      icon: Building,
      description: 'Track your shipments, monitor customer satisfaction, and optimize your logistics operations.',
      features: [
        'Real-time shipment tracking',
        'Customer impact analytics',
        'Sustainability metrics',
        'Brand storytelling tools'
      ],
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'recipient' as UserRole,
      title: 'Recipient',
      subtitle: 'End customers receiving packages',
      icon: Package,
      description: 'Follow your package\'s journey with engaging stories and transparent updates.',
      features: [
        'Cinematic package stories',
        'Real-time delivery updates',
        'Transparent delay explanations',
        'Exciting delivery anticipation'
      ],
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      buttonClass: 'bg-green-600 hover:bg-green-700 text-white',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'operations' as UserRole,
      title: 'Operations Team',
      subtitle: 'Logistics managers and coordinators',
      icon: Settings,
      description: 'Monitor your entire supply network, optimize performance, and make data-driven decisions.',
      features: [
        'Network-wide visibility',
        'Performance analytics',
        'Bottleneck identification',
        'Resource optimization'
      ],
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      buttonClass: 'bg-orange-600 hover:bg-orange-700 text-white',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // Navigate to role-specific dashboard after a brief delay
    setTimeout(() => {
      router.push(`/dashboard/${role}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 px-4"
      >
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
            <Truck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">LogiVision</h1>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Role</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select your role to access your personalized logistics dashboard with immersive storytelling and real-time insights
        </p>
      </motion.div>

      {/* Role Selection Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? `ring-2 ring-${role.color}-500 shadow-xl` 
                      : 'hover:shadow-lg'
                  } ${role.bgColor} ${role.borderColor}`}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardHeader className="text-center">
                    <div className={`w-20 h-20 ${role.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`h-10 w-10 ${role.iconColor}`} />
                    </div>
                    <CardTitle className="text-2xl">{role.title}</CardTitle>
                    <CardDescription className="text-lg">{role.subtitle}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <Image
                      src={role.image}
                      alt={role.title}
                      width={400}
                      height={200}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                    
                    <p className="text-gray-600 text-center">{role.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-900">Key Features:</h4>
                      <ul className="space-y-2">
                        {role.features.map((feature, featureIndex) => (
                          <motion.li
                            key={featureIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 + featureIndex * 0.05 }}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      {isSelected ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="flex items-center justify-center space-x-2 bg-green-100 text-green-800 py-3 px-4 rounded-lg"
                        >
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Accessing Dashboard...</span>
                        </motion.div>
                      ) : (
                        <Button 
                          className={`w-full ${role.buttonClass} py-3`}
                          size="lg"
                        >
                          Access Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white border-t border-gray-200 py-12"
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Multi-Role Support</h3>
          </div>
          <p className="text-gray-600 text-lg">
            Switch between roles anytime to see different perspectives of the same logistics data. 
            Perfect for teams that need to understand multiple viewpoints and optimize their entire supply chain.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
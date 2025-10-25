'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Building, Package, Settings, Truck, MapPin, BarChart3 } from 'lucide-react';
import ShipmentStory from '@/components/ShipmentStory';
import LiveTracking from '@/components/LiveTracking';
import SupplyChainMap from '@/components/SupplyChainMap';
import { sampleShipments, dashboardMetrics, supplyChainNodes } from '@/data/logisticsData';
import RoleSwitcher from '@/components/RoleSwitcher';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

type UserRole = 'shipper' | 'recipient' | 'operations';

export default function RoleDashboard() {
  const params = useParams();
  const role = params.role as UserRole;
  const [selectedShipment, setSelectedShipment] = useState(sampleShipments[0]);
  const [activeTab, setActiveTab] = useState<'story' | 'tracking' | 'network'>('story');

  const roleConfig = {
    shipper: {
      title: 'Shipper Dashboard',
      subtitle: 'Manage your shipments and customer satisfaction',
      icon: Building,
      color: 'blue',
      bgGradient: 'from-blue-500 to-blue-700',
      ringColor: 'ring-blue-500',
      tabActiveClass: 'bg-blue-600 text-white shadow-md',
      tabs: [
        { id: 'story', label: 'Shipment Stories', icon: Package },
        { id: 'tracking', label: 'Live Tracking', icon: Truck },
        { id: 'network', label: 'Supply Network', icon: MapPin }
      ],
      metrics: [
        { label: 'Active Shipments', value: dashboardMetrics.totalShipments, icon: Package },
        { label: 'Customer Satisfaction', value: `${dashboardMetrics.customerSatisfaction}/5`, icon: BarChart3 },
        { label: 'On-Time Delivery', value: `${dashboardMetrics.onTimeDelivery}%`, icon: Truck },
        { label: 'Cost Savings', value: `$${dashboardMetrics.costSavings.toLocaleString()}`, icon: BarChart3 }
      ]
    },
    recipient: {
      title: 'My Package Journey',
      subtitle: 'Follow your package\'s exciting adventure',
      icon: Package,
      color: 'green',
      bgGradient: 'from-green-500 to-green-700',
      ringColor: 'ring-green-500',
      tabActiveClass: 'bg-green-600 text-white shadow-md',
      tabs: [
        { id: 'story', label: 'My Package Story', icon: Package },
        { id: 'tracking', label: 'Live Updates', icon: Truck },
        { id: 'network', label: 'Journey Map', icon: MapPin }
      ],
      metrics: [
        { label: 'Package Status', value: 'In Transit', icon: Package },
        { label: 'Progress', value: `${selectedShipment.progress}%`, icon: BarChart3 },
        { label: 'ETA', value: selectedShipment.estimatedDelivery.toLocaleDateString(), icon: Truck },
        { label: 'Distance Traveled', value: '2,847 km', icon: MapPin }
      ]
    },
    operations: {
      title: 'Operations Command Center',
      subtitle: 'Monitor and optimize your supply network',
      icon: Settings,
      color: 'orange',
      bgGradient: 'from-orange-500 to-orange-700',
      ringColor: 'ring-orange-500',
      tabActiveClass: 'bg-orange-600 text-white shadow-md',
      tabs: [
        { id: 'story', label: 'Network Stories', icon: Package },
        { id: 'tracking', label: 'Live Monitoring', icon: Truck },
        { id: 'network', label: 'Supply Network', icon: MapPin }
      ],
      metrics: [
        { label: 'Total Shipments', value: dashboardMetrics.totalShipments, icon: Package },
        { label: 'Network Efficiency', value: '94.2%', icon: BarChart3 },
        { label: 'Active Routes', value: '156', icon: Truck },
        { label: 'Carbon Saved', value: `${dashboardMetrics.carbonSaved}kg`, icon: BarChart3 }
      ]
    }
  };

  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`bg-gradient-to-r ${config.bgGradient} text-white`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={() => window.location.href = '/role-selector'}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Role Selection
              </Button>
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{config.title}</h1>
                  <p className="text-white/80">{config.subtitle}</p>
                </div>
              </div>
            </div>
            <RoleSwitcher currentRole={role} />
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {config.metrics.map((metric, index) => {
              const MetricIcon = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Card className="bg-white/10 border-white/20">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <MetricIcon className="h-5 w-5 text-white/80" />
                        <div>
                          <div className="text-2xl font-bold text-white">{metric.value}</div>
                          <div className="text-sm text-white/80">{metric.label}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Shipment Selector (only for shipper and operations) */}
      {(role === 'shipper' || role === 'operations') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 py-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {role === 'shipper' ? 'Your Shipments' : 'Network Shipments'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleShipments.map((shipment) => (
                  <motion.div
                    key={shipment.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedShipment.id === shipment.id 
                          ? `ring-2 ${config.ringColor} shadow-lg` 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedShipment(shipment)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-2xl">
                            {shipment.priority === 'critical' ? '🚨' : 
                             shipment.priority === 'urgent' ? '⚡' : '📦'}
                          </div>
                          <Badge variant={
                            shipment.priority === 'critical' ? 'destructive' :
                            shipment.priority === 'urgent' ? 'default' : 'secondary'
                          }>
                            {shipment.priority.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-semibold">{shipment.story.title}</h3>
                          <p className="text-sm text-gray-600">{shipment.trackingNumber}</p>
                          <p className="text-sm text-gray-600">
                            {shipment.origin.city} → {shipment.destination.city}
                          </p>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{shipment.progress}%</span>
                            </div>
                            <Progress value={shipment.progress} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Recipient-specific content */}
      {role === 'recipient' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 py-6"
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Your Package is on an Adventure! 🎒</h2>
                <p className="text-gray-600 mb-4">Track your package's journey with real-time updates and exciting stories.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>Tracking Number:</strong> {selectedShipment.trackingNumber}
                  </div>
                  <div>
                    <strong>Current Status:</strong> {selectedShipment.status.replace('_', ' ').toUpperCase()}
                  </div>
                  <div>
                    <strong>Progress:</strong> {selectedShipment.progress}% Complete
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 py-6"
      >
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {config.tabs.map((tab) => {
            const TabIcon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all duration-200 ${
                  activeTab === tab.id 
                    ? config.tabActiveClass
                    : 'text-gray-600 hover:bg-white hover:shadow-sm'
                }`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                <TabIcon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Content Area */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-4 pb-12"
      >
        {activeTab === 'story' && (
          <ShipmentStory shipment={selectedShipment} />
        )}
        
        {activeTab === 'tracking' && (
          <LiveTracking shipment={selectedShipment} />
        )}
        
        {activeTab === 'network' && (
          <SupplyChainMap nodes={supplyChainNodes} metrics={dashboardMetrics} />
        )}
      </motion.div>

      {/* Role-specific footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="bg-white border-t border-gray-200 py-12"
      >
        <div className="max-w-7xl mx-auto px-4">
          <Card className={`bg-gradient-to-r ${
            role === 'shipper' ? 'from-blue-50 to-blue-100' :
            role === 'recipient' ? 'from-green-50 to-green-100' :
            'from-orange-50 to-orange-100'
          }`}>
            <CardContent className="p-6 text-center">
              {role === 'shipper' && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Shipper Insights</h3>
                  <p className="text-gray-600">
                    Monitor your brand reputation through transparent logistics storytelling. 
                    Every shipment is an opportunity to delight customers and build trust.
                  </p>
                </div>
              )}
              
              {role === 'recipient' && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Your Package's Story</h3>
                  <p className="text-gray-600">
                    Every package has a journey worth telling. From the moment it leaves the warehouse 
                    to the final delivery, we make sure you're part of the adventure.
                  </p>
                </div>
              )}
              
              {role === 'operations' && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Network Optimization</h3>
                  <p className="text-gray-600">
                    Data-driven insights help you optimize routes, reduce costs, and improve 
                    customer satisfaction across your entire supply network.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
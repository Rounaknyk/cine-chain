'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { SupplyChainNode, DashboardMetrics } from '@/data/logisticsTypes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Factory, 
  Settings, 
  Warehouse, 
  Truck, 
  Store, 
  User, 
  MapPin, 
  TrendingUp, 
  Package,
  Clock,
  DollarSign,
  Activity
} from 'lucide-react';
import Image from 'next/image';

interface SupplyChainMapProps {
  nodes: SupplyChainNode[];
  metrics: DashboardMetrics;
}

export default function SupplyChainMap({ nodes, metrics }: SupplyChainMapProps) {
  const [selectedNode, setSelectedNode] = useState<SupplyChainNode | null>(null);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'supplier': return <Factory className="h-6 w-6" />;
      case 'manufacturer': return <Settings className="h-6 w-6" />;
      case 'warehouse': return <Warehouse className="h-6 w-6" />;
      case 'distributor': return <Truck className="h-6 w-6" />;
      case 'retailer': return <Store className="h-6 w-6" />;
      case 'customer': return <User className="h-6 w-6" />;
      default: return <MapPin className="h-6 w-6" />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'supplier': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'manufacturer': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'warehouse': return 'bg-green-100 text-green-600 border-green-200';
      case 'distributor': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'retailer': return 'bg-pink-100 text-pink-600 border-pink-200';
      case 'customer': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Supply Chain Network</span>
          </CardTitle>
          <CardDescription>Interactive visualization of your global supply chain network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Network Map */}
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Supply chain network map"
                width={600}
                height={400}
                className="rounded-lg w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 rounded-lg" />
              <div className="absolute top-4 left-4 text-white">
                <h3 className="font-semibold">Global Network</h3>
                <p className="text-sm opacity-90">Real-time supply chain visualization</p>
              </div>
            </div>

            {/* Network Stats */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Network Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{nodes.length}</div>
                  <div className="text-sm text-blue-600">Active Nodes</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{metrics.onTimeDelivery}%</div>
                  <div className="text-sm text-green-600">On-Time Rate</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{metrics.totalShipments}</div>
                  <div className="text-sm text-purple-600">Total Shipments</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">94.2%</div>
                  <div className="text-sm text-orange-600">Efficiency</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Nodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-200 ${
                selectedNode?.id === node.id ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedNode(node)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${getNodeColor(node.type)}`}>
                    {getNodeIcon(node.type)}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {node.type.toUpperCase()}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{node.name}</CardTitle>
                <CardDescription className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{node.location.city}, {node.location.country}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Efficiency</span>
                  <span className={`font-semibold ${getEfficiencyColor(node.efficiency)}`}>
                    {node.efficiency}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Capacity</span>
                  <span className="font-semibold">{node.capacity}%</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Status</span>
                  <Badge 
                    variant={node.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {node.status}
                  </Badge>
                </div>

                <div className="pt-2 border-t space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Current Load</span>
                    <span className="font-medium">{node.currentLoad}%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Connections</span>
                    <span className="font-medium">{node.connections.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg ${getNodeColor(selectedNode.type)}`}>
                    {getNodeIcon(selectedNode.type)}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{selectedNode.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedNode.location.city}, {selectedNode.location.country}</span>
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline">{selectedNode.type.toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Efficiency</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedNode.efficiency >= 90 ? 'bg-green-500' :
                              selectedNode.efficiency >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedNode.efficiency}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{selectedNode.efficiency}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Capacity</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${selectedNode.capacity}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{selectedNode.capacity}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Operational Data</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status</span>
                      <Badge variant={selectedNode.status === 'active' ? 'default' : 'secondary'}>
                        {selectedNode.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Current Load</span>
                      <span className="font-medium">{selectedNode.currentLoad}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Connections</span>
                      <span className="font-medium">{selectedNode.connections.length}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Network Impact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Connected Nodes</span>
                      <span className="font-medium">{selectedNode.connections?.length || 0}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Efficiency</span>
                      <Badge variant="outline" className="text-xs">
                        {selectedNode.efficiency}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Network Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Network Analytics</span>
          </CardTitle>
          <CardDescription>Key performance indicators across your supply chain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{metrics.totalShipments}</div>
              <div className="text-sm text-blue-600">Total Shipments</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{metrics.onTimeDelivery}%</div>
              <div className="text-sm text-green-600">On-Time Delivery</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">${metrics.costSavings.toLocaleString()}</div>
              <div className="text-sm text-purple-600">Cost Savings</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Activity className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{metrics.carbonSaved}kg</div>
              <div className="text-sm text-orange-600">Carbon Saved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
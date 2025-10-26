'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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
            {/* Interactive Network Map */}
            <div className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-lg overflow-hidden h-64 border border-blue-800/30">
              {/* Simple dotted background */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: 'radial-gradient(circle, #3B82F6 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
              </div>

              {/* Dotted background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: 'radial-gradient(circle, #60A5FA 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
              </div>

              {/* Network Diagram */}
              <div className="absolute inset-0 p-6">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                  <defs>
                    <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  
                  {/* Delhi to Jaipur */}
                  <motion.line
                    x1="15%" y1="30%" x2="35%" y2="50%"
                    stroke="url(#activeGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  {/* Jaipur to Mumbai */}
                  <motion.line
                    x1="35%" y1="50%" x2="20%" y2="70%"
                    stroke="url(#activeGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                  />
                  {/* Mumbai to Bangalore */}
                  <motion.line
                    x1="20%" y1="70%" x2="50%" y2="75%"
                    stroke="url(#activeGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.9 }}
                  />
                  {/* Bangalore to Chennai */}
                  <motion.line
                    x1="50%" y1="75%" x2="70%" y2="70%"
                    stroke="url(#activeGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.1 }}
                  />
                  {/* Chennai to Kolkata */}
                  <motion.line
                    x1="70%" y1="70%" x2="80%" y2="40%"
                    stroke="url(#activeGradient)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.3 }}
                  />
                  {/* Kolkata to Delhi */}
                  <motion.line
                    x1="80%" y1="40%" x2="15%" y2="30%"
                    stroke="url(#activeGradient)"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  />
                  
                  {/* Animated shipment packets */}
                  <motion.circle
                    r="4"
                    fill="#10B981"
                    filter="url(#glow)"
                    initial={{ cx: '15%', cy: '30%' }}
                    animate={{
                      cx: ['15%', '35%', '20%', '50%'],
                      cy: ['30%', '50%', '70%', '75%'],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.circle
                    r="4"
                    fill="#F59E0B"
                    filter="url(#glow)"
                    initial={{ cx: '70%', cy: '70%' }}
                    animate={{
                      cx: ['70%', '80%', '15%'],
                      cy: ['70%', '40%', '30%'],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1,
                    }}
                  />
                  
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>

                {/* Location Nodes */}
                <div className="relative w-full h-full" style={{ zIndex: 2 }}>
                  {/* Delhi - Origin */}
                  <motion.div
                    className="absolute"
                    style={{ left: '15%', top: '30%', transform: 'translate(-50%, -50%)' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="relative group cursor-pointer">
                      <motion.div
                        className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-300"
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0.7)', '0 0 0 10px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Warehouse className="h-6 w-6 text-white" />
                      </motion.div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-500/90 text-white px-2 py-1 rounded text-xs font-semibold">
                        Delhi
                      </div>
                    </div>
                  </motion.div>

                  {/* Jaipur - Checkpoint */}
                  <motion.div
                    className="absolute"
                    style={{ left: '35%', top: '50%', transform: 'translate(-50%, -50%)' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="relative group cursor-pointer">
                      <motion.div
                        className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-lg border-2 border-purple-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Truck className="h-5 w-5 text-white" />
                      </motion.div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-purple-500/90 text-white px-2 py-1 rounded text-xs font-semibold">
                        Jaipur
                      </div>
                    </div>
                  </motion.div>

                  {/* Mumbai - Hub */}
                  <motion.div
                    className="absolute"
                    style={{ left: '20%', top: '70%', transform: 'translate(-50%, -50%)' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="relative group cursor-pointer">
                      <motion.div
                        className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-green-300"
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0.7)', '0 0 0 10px rgba(34, 197, 94, 0)', '0 0 0 0 rgba(34, 197, 94, 0)']
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      >
                        <Store className="h-6 w-6 text-white" />
                      </motion.div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-green-500/90 text-white px-2 py-1 rounded text-xs font-semibold">
                        Mumbai
                      </div>
                    </div>
                  </motion.div>

                  {/* Bangalore - Distribution */}
                  <motion.div
                    className="absolute"
                    style={{ left: '50%', top: '75%', transform: 'translate(-50%, -50%)' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="relative group cursor-pointer">
                      <motion.div
                        className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-orange-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Factory className="h-5 w-5 text-white" />
                      </motion.div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-orange-500/90 text-white px-2 py-1 rounded text-xs font-semibold">
                        Bangalore
                      </div>
                    </div>
                  </motion.div>

                  {/* Chennai - Port */}
                  <motion.div
                    className="absolute"
                    style={{ left: '70%', top: '70%', transform: 'translate(-50%, -50%)' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.1 }}
                  >
                    <div className="relative group cursor-pointer">
                      <motion.div
                        className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg border-2 border-cyan-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Package className="h-5 w-5 text-white" />
                      </motion.div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-cyan-500/90 text-white px-2 py-1 rounded text-xs font-semibold">
                        Chennai
                      </div>
                    </div>
                  </motion.div>

                  {/* Kolkata - Destination */}
                  <motion.div
                    className="absolute"
                    style={{ left: '80%', top: '40%', transform: 'translate(-50%, -50%)' }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.3 }}
                  >
                    <div className="relative group cursor-pointer">
                      <motion.div
                        className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-pink-300"
                        whileHover={{ scale: 1.1 }}
                        animate={{
                          boxShadow: ['0 0 0 0 rgba(236, 72, 153, 0.7)', '0 0 0 10px rgba(236, 72, 153, 0)', '0 0 0 0 rgba(236, 72, 153, 0)']
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      >
                        <MapPin className="h-6 w-6 text-white" />
                      </motion.div>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-pink-500/90 text-white px-2 py-1 rounded text-xs font-semibold">
                        Kolkata
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Overlay text */}
              <div className="absolute top-4 left-4 text-white z-10">
                <motion.h3 
                  className="font-semibold text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Global Network
                </motion.h3>
                <motion.p 
                  className="text-sm opacity-90"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Real-time supply chain visualization
                </motion.p>
              </div>

              {/* Live indicator */}
              <motion.div 
                className="absolute top-4 right-4 flex items-center space-x-2 bg-green-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-green-500/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
                <span className="text-xs text-green-100 font-medium">LIVE</span>
              </motion.div>
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
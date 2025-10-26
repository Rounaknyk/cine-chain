'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shipment } from '@/data/logisticsTypes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  Thermometer, 
  Droplets, 
  Activity, 
  Gauge, 
  Sun,
  AlertTriangle,
  CheckCircle,
  Loader2,
  Zap,
  Wifi,
  Battery,
  Signal,
  Navigation,
  Route,
  Eye,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  Plane,
  Ship,
  Warehouse
} from 'lucide-react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Suspense } from 'react';

// Dynamically import 3D components to avoid SSR issues
const Canvas = dynamic(() => import('@react-three/fiber').then(mod => ({ default: mod.Canvas })), { ssr: false });
const useGLTF = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.useGLTF })), { ssr: false });
const OrbitControls = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.OrbitControls })), { ssr: false });
const Environment = dynamic(() => import('@react-three/drei').then(mod => ({ default: mod.Environment })), { ssr: false });

// 3D Package Model Component
function PackageModel() {
  if (typeof window === 'undefined') return null;
  
  const { scene } = (useGLTF as any)('/3d/box_package.glb');
  
  return (
    <primitive 
      object={scene} 
      scale={2.5} 
      position={[0, 0, 0]}
      rotation={[0.2, 0, 0]}
    />
  );
}

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(m => m.Polyline), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(m => m.CircleMarker), { ssr: false });
const Tooltip = dynamic(() => import('react-leaflet').then(m => m.Tooltip), { ssr: false });

interface LiveTrackingProps {
  shipment: Shipment;
}

export default function LiveTracking({ shipment }: LiveTrackingProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [realTimeData, setRealTimeData] = useState({
    temperature: 22,
    humidity: 45,
    vibration: 0.1,
    pressure: 1013,
    light: 850,
    speed: 65,
    fuel: 78,
    signal: 95
  });

  const [previousData, setPreviousData] = useState(realTimeData);
  const [trends, setTrends] = useState({
    temperature: 'stable',
    humidity: 'stable',
    vibration: 'stable',
    pressure: 'stable',
    light: 'stable',
    speed: 'stable',
    fuel: 'stable',
    signal: 'stable'
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const dataTimer = setInterval(() => {
      setPreviousData(realTimeData);
      setRealTimeData(prev => {
        const newData = {
          temperature: prev.temperature + (Math.random() - 0.5) * 2,
          humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5) * 5)),
          vibration: Math.max(0, prev.vibration + (Math.random() - 0.5) * 0.1),
          pressure: prev.pressure + (Math.random() - 0.5) * 2,
          light: Math.max(0, prev.light + (Math.random() - 0.5) * 50),
          speed: Math.max(0, Math.min(120, prev.speed + (Math.random() - 0.5) * 10)),
          fuel: Math.max(0, Math.min(100, prev.fuel - Math.random() * 0.5)),
          signal: Math.max(0, Math.min(100, prev.signal + (Math.random() - 0.5) * 5))
        };
        
        // Calculate trends
        setTrends({
          temperature: newData.temperature > prev.temperature ? 'up' : newData.temperature < prev.temperature ? 'down' : 'stable',
          humidity: newData.humidity > prev.humidity ? 'up' : newData.humidity < prev.humidity ? 'down' : 'stable',
          vibration: newData.vibration > prev.vibration ? 'up' : newData.vibration < prev.vibration ? 'down' : 'stable',
          pressure: newData.pressure > prev.pressure ? 'up' : newData.pressure < prev.pressure ? 'down' : 'stable',
          light: newData.light > prev.light ? 'up' : newData.light < prev.light ? 'down' : 'stable',
          speed: newData.speed > prev.speed ? 'up' : newData.speed < prev.speed ? 'down' : 'stable',
          fuel: newData.fuel > prev.fuel ? 'up' : newData.fuel < prev.fuel ? 'down' : 'stable',
          signal: newData.signal > prev.signal ? 'up' : newData.signal < prev.signal ? 'down' : 'stable'
        });
        
        return newData;
      });
    }, 2000);
    return () => clearInterval(dataTimer);
  }, [realTimeData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'out_for_delivery': return 'bg-yellow-100 text-yellow-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'delayed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'out_for_delivery': return <Truck className="h-4 w-4" />;
      case 'in_transit': return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'delayed': return <AlertTriangle className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down': return <TrendingDown className="h-3 w-3 text-red-500" />;
      default: return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  const getMetricColor = (metric: string, value: number) => {
    switch (metric) {
      case 'temperature':
        return value > 30 ? 'text-red-500' : value < 15 ? 'text-blue-500' : 'text-green-500';
      case 'humidity':
        return value > 70 ? 'text-red-500' : value < 30 ? 'text-yellow-500' : 'text-green-500';
      case 'vibration':
        return value > 0.5 ? 'text-red-500' : value > 0.2 ? 'text-yellow-500' : 'text-green-500';
      case 'signal':
        return value > 80 ? 'text-green-500' : value > 50 ? 'text-yellow-500' : 'text-red-500';
      case 'fuel':
        return value > 50 ? 'text-green-500' : value > 20 ? 'text-yellow-500' : 'text-red-500';
      default:
        return 'text-gray-700';
    }
  };

  const toggleLive = () => {
    setIsLive(!isLive);
  };

  const refreshData = () => {
    // Simulate data refresh
    setRealTimeData(prev => ({
      ...prev,
      signal: Math.min(100, prev.signal + Math.random() * 10)
    }));
  };

  const toLatLng = (coords: [number, number]) => [coords[1], coords[0]] as [number, number];
  const checkpoints = [shipment.origin, ...shipment.timeline.map(t => t.location), shipment.destination];
  const positions = checkpoints.map(c => toLatLng(c.coordinates));
  const currentPos = toLatLng(shipment.currentLocation.coordinates);

  // Journey stages data
  const journeyStages = [
    {
      id: 1,
      title: 'Package Received',
      description: 'Shipment initiated at origin facility',
      location: 'Delhi Port, India',
      status: 'completed',
      icon: Package,
      color: 'blue',
      time: '2 hours',
    },
    {
      id: 2,
      title: 'Ground Transit',
      description: 'En route via regional transport network',
      location: 'Jaipur Hub, India',
      status: 'active',
      icon: Truck,
      color: 'blue',
      time: '4 hours',
    },
    {
      id: 3,
      title: 'Delivered',
      description: 'Package ready for final handoff',
      location: 'Mumbai, India',
      status: 'pending',
      icon: CheckCircle,
      color: 'blue',
      time: 'Pending',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Journey Timeline Card */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Route className="h-5 w-5" />
              <span>Shipment Journey</span>
            </CardTitle>
            <CardDescription>Click on any stage to view detailed information</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline connector line */}
            <div className="absolute top-8 left-8 md:left-0 md:top-16 w-1 md:w-full h-full md:h-1 bg-gradient-to-b md:bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200" />
            
            {/* Journey stages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 relative">
              {journeyStages.map((stage, index) => {
                const Icon = stage.icon;
                const isCompleted = stage.status === 'completed';
                const isActive = stage.status === 'active';
                const isPending = stage.status === 'pending';
                return (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Icon circle */}
              {/* Journey stages */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 relative">
                {journeyStages.map((stage, index) => {
                  const Icon = stage.icon;
                  const isCompleted = stage.status === 'completed';
                  const isActive = stage.status === 'active';
                  const isPending = stage.status === 'pending';
                  return (
                    <motion.div
                      key={stage.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="relative flex flex-col items-center text-center"
                    >
                      {/* Icon circle */}
                      <motion.div
                        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 ${
                          isCompleted
                            ? 'bg-blue-500 border-blue-300'
                            : isActive
                            ? 'bg-blue-500 border-blue-300'
                            : 'bg-blue-200 border-blue-100'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        animate={isActive ? {
                          boxShadow: [
                            '0 0 0 0 rgba(59, 130, 246, 0.7)',
                            '0 0 0 15px rgba(59, 130, 246, 0)',
                            '0 0 0 0 rgba(59, 130, 246, 0)'
                          ]
                        } : {}}
                        transition={isActive ? { duration: 2, repeat: Infinity } : {}}
                      >
                        <Icon className={`h-7 w-7 ${
                          isCompleted || isActive ? 'text-white' : 'text-blue-400'
                        }`} />
                      </motion.div>
                      
                      {/* Stage info */}
                      <div className="mt-4 space-y-1">
                        <h4 className={`font-bold text-sm ${
                          isCompleted || isActive ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {stage.title}
                        </h4>
                        <p className="text-xs text-gray-600 max-w-[150px]">
                          {stage.description}
                        </p>
                        <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 mt-2">
                          <MapPin className="h-3 w-3" />
                          <span>{stage.location}</span>
                        </div>
                        <div className="flex items-center justify-center space-x-1 text-xs mt-1">
                          <Clock className="h-3 w-3" />
                          <span className={isCompleted ? 'text-blue-600 font-semibold' : 'text-blue-500'}>
                            {stage.time}
                          </span>
                        </div>
                      </div>
                      
                      {/* Status badge */}
                      {isCompleted && (
                        <Badge className="mt-2 bg-blue-100 text-blue-700 border-blue-300">
                          Completed
                        </Badge>
                      )}
                      {isActive && (
                        <Badge className="mt-2 bg-blue-500 text-white animate-pulse">
                          In Progress
                        </Badge>
                      )}
                      {isPending && (
                        <Badge variant="outline" className="mt-2 text-blue-600 border-blue-300">
                          Pending
                        </Badge>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              {/* ... (rest of the code remains the same) */}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Enhanced Progress Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Route className="h-5 w-5 text-green-600" />
                <span>Journey Progress</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Navigation className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Active Route</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current Progress</span>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">{shipment.progress}%</span>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </motion.div>
                </div>
              </div>
              <div className="relative">
                <Progress value={shipment.progress} className="h-4" />
                <div className="absolute inset-0 flex justify-between items-center px-2">
                  <div className="text-xs font-medium text-gray-600">{shipment.origin.city}</div>
                  <div className="text-xs font-medium text-gray-600">{shipment.destination.city}</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white rounded-lg border">
                  <div className="text-lg font-bold text-blue-600">{realTimeData.speed} mph</div>
                  <div className="text-xs text-gray-500">Current Speed</div>
                </div>
                <div className="p-3 bg-white rounded-lg border">
                  <div className="text-lg font-bold text-orange-600">{realTimeData.fuel.toFixed(0)}%</div>
                  <div className="text-xs text-gray-500">Fuel Level</div>
                </div>
                <div className="p-3 bg-white rounded-lg border">
                  <div className="text-lg font-bold text-purple-600">247 mi</div>
                  <div className="text-xs text-gray-500">Distance Left</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modern Real-time Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key: 'temperature', icon: Thermometer, label: 'Temperature', unit: '°C', value: realTimeData.temperature },
            { key: 'humidity', icon: Droplets, label: 'Humidity', unit: '%', value: realTimeData.humidity },
            { key: 'vibration', icon: Activity, label: 'Vibration', unit: 'g', value: realTimeData.vibration },
            { key: 'pressure', icon: Gauge, label: 'Pressure', unit: 'hPa', value: realTimeData.pressure },
            { key: 'light', icon: Sun, label: 'Light', unit: 'lux', value: realTimeData.light },
            { key: 'speed', icon: Truck, label: 'Speed', unit: 'mph', value: realTimeData.speed },
            { key: 'fuel', icon: Battery, label: 'Fuel', unit: '%', value: realTimeData.fuel },
            { key: 'signal', icon: Wifi, label: 'Signal', unit: '%', value: realTimeData.signal }
          ].map((metric, index) => {
            const Icon = metric.icon;
            const trend = trends[metric.key as keyof typeof trends];
            const color = getMetricColor(metric.key, metric.value);
            
            return (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedMetric(selectedMetric === metric.key ? null : metric.key)}
              >
                <Card className={`border-2 transition-all duration-200 ${
                  selectedMetric === metric.key 
                    ? 'border-blue-400 shadow-lg bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span>{metric.label}</span>
                      </CardTitle>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(trend)}
                        {isLive && (
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                          />
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      key={metric.value}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`text-2xl font-bold ${color}`}
                    >
                      {metric.value.toFixed(metric.key === 'vibration' ? 2 : 0)}{metric.unit}
                    </motion.div>
                    <div className="text-xs text-gray-500 mt-1">
                      {metric.key === 'temperature' && 'Container temp'}
                      {metric.key === 'humidity' && 'Air humidity'}
                      {metric.key === 'vibration' && 'Movement intensity'}
                      {metric.key === 'pressure' && 'Atmospheric pressure'}
                      {metric.key === 'light' && 'Ambient light'}
                      {metric.key === 'speed' && 'Current speed'}
                      {metric.key === 'fuel' && 'Fuel level'}
                      {metric.key === 'signal' && 'GPS signal'}
                    </div>
                    {selectedMetric === metric.key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 p-2 bg-blue-100 rounded text-xs"
                      >
                        <div className="font-medium">Previous: {previousData[metric.key as keyof typeof previousData].toFixed(metric.key === 'vibration' ? 2 : 0)}{metric.unit}</div>
                        <div className="text-gray-600">Trend: {trend}</div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Enhanced Location & Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <span>Live Location</span>
                </CardTitle>
                <CardDescription>Real-time GPS tracking and route optimization</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
                <span className="text-sm font-medium text-green-600">GPS Active</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Truck className="h-6 w-6 text-blue-600" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-lg">In Transit</div>
                    <div className="text-sm text-gray-600">Highway I-95, Georgia • Speed: {realTimeData.speed} mph</div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                  <Signal className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              </div>
              
              <div className="relative">
                <div className="rounded-lg overflow-hidden">
                  <MapContainer center={currentPos} zoom={4} className="w-full h-48" scrollWheelZoom={false}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Polyline positions={positions} pathOptions={{ color: '#6366F1', weight: 4 }} />
                    {positions.map((pos, idx) => (
                      <CircleMarker key={idx} center={pos} radius={6} pathOptions={{
                        color: idx <= nearestIndex ? '#16A34A' : '#9CA3AF',
                        fillColor: idx <= nearestIndex ? '#16A34A' : '#9CA3AF',
                        fillOpacity: 0.9
                      }}>
                        <Tooltip>{checkpoints[idx].name}</Tooltip>
                      </CircleMarker>
                    ))}
                    <CircleMarker center={currentPos} radius={8} pathOptions={{ color: '#2563EB', fillColor: '#2563EB', fillOpacity: 1 }}>
                      <Tooltip>Current Position</Tooltip>
                    </CircleMarker>
                  </MapContainer>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                  <div className="text-xs text-gray-600">Last Update</div>
                  <div className="font-mono text-sm">{formatTime(currentTime)}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border text-center">
                  <div className="text-2xl font-bold text-blue-600">247 mi</div>
                  <div className="text-sm text-gray-500">Distance Remaining</div>
                </div>
                <div className="p-4 bg-white rounded-lg border text-center">
                  <div className="text-2xl font-bold text-green-600">2:30 PM</div>
                  <div className="text-sm text-gray-500">Estimated Arrival</div>
                </div>
                <div className="p-4 bg-white rounded-lg border text-center">
                  <div className="text-2xl font-bold text-purple-600">{realTimeData.signal.toFixed(0)}%</div>
                  <div className="text-sm text-gray-500">GPS Signal</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Smart Alerts & Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Smart Alerts & Notifications</span>
            </CardTitle>
            <CardDescription>AI-powered insights and real-time alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                </motion.div>
                <div className="flex-1">
                  <div className="font-medium text-yellow-800 flex items-center space-x-2">
                    <span>Weather Alert</span>
                    <Badge variant="outline" className="text-xs">High Priority</Badge>
                  </div>
                  <div className="text-sm text-yellow-700 mt-1">
                    Heavy rain expected in the next 2 hours. Delivery may be delayed by 30-45 minutes.
                  </div>
                  <div className="text-xs text-yellow-600 mt-2">
                    Alert triggered: {formatTime(new Date(Date.now() - 300000))}
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200"
              >
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium text-green-800 flex items-center space-x-2">
                    <span>Package Secured</span>
                    <Badge variant="outline" className="text-xs bg-green-100">Normal</Badge>
                  </div>
                  <div className="text-sm text-green-700 mt-1">
                    Package is safely stored in climate-controlled container. Temperature: {realTimeData.temperature.toFixed(1)}°C
                  </div>
                  <div className="text-xs text-green-600 mt-2">
                    Status updated: {formatTime(new Date(Date.now() - 120000))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <Navigation className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium text-blue-800 flex items-center space-x-2">
                    <span>Route Optimization</span>
                    <Badge variant="outline" className="text-xs bg-blue-100">Info</Badge>
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    AI has identified a faster route that could save 15 minutes. Current ETA: 2:30 PM
                  </div>
                  <div className="text-xs text-blue-600 mt-2">
                    Route updated: {formatTime(new Date(Date.now() - 600000))}
                  </div>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
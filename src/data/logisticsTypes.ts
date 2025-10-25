// Logistics Dashboard Types - The Future of Supply Chain Visualization

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: ShipmentStatus;
  origin: Location;
  destination: Location;
  currentLocation: Location;
  progress: number; // 0-100
  estimatedDelivery: Date;
  actualDelivery?: Date;
  story: ShipmentStory;
  timeline: TimelineEvent[];
  priority: 'standard' | 'express' | 'urgent' | 'critical';
  value: number;
  weight: number;
  dimensions: Dimensions;
  specialHandling: string[];
  weatherImpact?: WeatherCondition;
  trafficImpact?: TrafficCondition;
}

export interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  type: 'warehouse' | 'distribution_center' | 'airport' | 'port' | 'customs' | 'final_destination';
  address: string;
  city: string;
  country: string;
  timezone: string;
  capacity?: number;
  currentLoad?: number;
}

export interface ShipmentStory {
  title: string;
  description: string;
  heroMoment: string;
  challenges: string[];
  milestones: string[];
  customerImpact: string;
  sustainability: SustainabilityMetrics;
}

export interface TimelineEvent {
  id: string;
  timestamp: Date;
  location: Location;
  status: ShipmentStatus;
  description: string;
  icon: string;
  emotion: 'excitement' | 'concern' | 'relief' | 'anticipation' | 'satisfaction';
  data: {
    temperature?: number;
    humidity?: number;
    vibration?: number;
    light?: number;
    pressure?: number;
  };
  images?: string[];
  notes?: string;
}

export interface SustainabilityMetrics {
  carbonFootprint: number;
  renewableEnergy: number;
  packagingEfficiency: number;
  routeOptimization: number;
}

export interface WeatherCondition {
  type: 'clear' | 'rain' | 'snow' | 'storm' | 'fog';
  severity: 'light' | 'moderate' | 'severe';
  impact: 'none' | 'minor' | 'major' | 'critical';
  description: string;
}

export interface TrafficCondition {
  level: 'light' | 'moderate' | 'heavy' | 'severe';
  incidents: number;
  averageSpeed: number;
  impact: 'none' | 'minor' | 'major' | 'critical';
  description: string;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: 'cm' | 'in';
}

export type ShipmentStatus = 
  | 'pending'
  | 'picked_up'
  | 'in_transit'
  | 'at_facility'
  | 'out_for_delivery'
  | 'delivered'
  | 'delayed'
  | 'exception'
  | 'returned';

export interface DashboardMetrics {
  totalShipments: number;
  onTimeDelivery: number;
  averageTransitTime: number;
  customerSatisfaction: number;
  carbonSaved: number;
  costSavings: number;
  routeOptimizations: number;
}

export interface SupplyChainNode {
  id: string;
  name: string;
  type: 'supplier' | 'manufacturer' | 'warehouse' | 'distributor' | 'retailer' | 'customer';
  location: Location;
  capacity: number;
  currentLoad: number;
  efficiency: number;
  connections: string[];
  status: 'operational' | 'maintenance' | 'overloaded' | 'offline';
}


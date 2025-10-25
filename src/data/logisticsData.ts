import { Shipment, DashboardMetrics, SupplyChainNode, TimelineEvent } from './logisticsTypes';

// Cinematic Sample Data - Real Stories, Real Impact
export const sampleShipments: Shipment[] = [
  {
    id: 'ship-001',
    trackingNumber: 'LV2024HERO001',
    status: 'in_transit',
    origin: {
      id: 'loc-001',
      name: 'Shanghai Mega Hub',
      coordinates: [121.4737, 31.2304],
      type: 'warehouse',
      address: '123 Logistics Boulevard',
      city: 'Shanghai',
      country: 'China',
      timezone: 'Asia/Shanghai',
      capacity: 10000,
      currentLoad: 7500
    },
    destination: {
      id: 'loc-002',
      name: 'New York Distribution Center',
      coordinates: [-74.006, 40.7128],
      type: 'distribution_center',
      address: '456 Supply Chain Avenue',
      city: 'New York',
      country: 'USA',
      timezone: 'America/New_York',
      capacity: 15000,
      currentLoad: 12000
    },
    currentLocation: {
      id: 'loc-003',
      name: 'Pacific Ocean Transit',
      coordinates: [-150.0000, 30.0000],
      type: 'port',
      address: 'International Waters',
      city: 'Pacific Ocean',
      country: 'International',
      timezone: 'UTC'
    },
    progress: 65,
    estimatedDelivery: new Date('2024-01-15T14:30:00Z'),
    story: {
      title: 'The Midnight Express',
      description: 'A critical medical device racing against time to save lives',
      heroMoment: 'Successfully navigated through a severe storm in the Pacific',
      challenges: ['Severe weather conditions', 'Customs clearance delays', 'High priority medical cargo'],
      milestones: ['Left Shanghai on time', 'Survived Pacific storm', 'Cleared customs in record time'],
      customerImpact: 'This device will enable life-saving surgery for 3 patients',
      sustainability: {
        carbonFootprint: 2.3,
        renewableEnergy: 85,
        packagingEfficiency: 92,
        routeOptimization: 78
      }
    },
    timeline: [
      {
        id: 'event-001',
        timestamp: new Date('2024-01-10T08:00:00Z'),
        location: {
          id: 'loc-001',
          name: 'Shanghai Mega Hub',
          coordinates: [121.4737, 31.2304],
          type: 'warehouse',
          address: '123 Logistics Boulevard',
          city: 'Shanghai',
          country: 'China',
          timezone: 'Asia/Shanghai'
        },
        status: 'picked_up',
        description: 'Package picked up from origin facility',
        icon: '📦',
        emotion: 'excitement',
        data: { temperature: 22, humidity: 45, vibration: 0.1 }
      },
      {
        id: 'event-002',
        timestamp: new Date('2024-01-10T14:30:00Z'),
        location: {
          id: 'loc-004',
          name: 'Shanghai Port',
          coordinates: [121.4737, 31.2304],
          type: 'port',
          address: 'Shanghai International Port',
          city: 'Shanghai',
          country: 'China',
          timezone: 'Asia/Shanghai'
        },
        status: 'in_transit',
        description: 'Loaded onto container ship "Pacific Express"',
        icon: '🚢',
        emotion: 'anticipation',
        data: { temperature: 18, humidity: 60, vibration: 0.3 }
      }
    ],
    priority: 'critical',
    value: 15000,
    weight: 2.5,
    dimensions: { length: 40, width: 30, height: 20, unit: 'cm' },
    specialHandling: ['medical_device', 'temperature_controlled', 'fragile'],
    weatherImpact: {
      type: 'storm',
      severity: 'severe',
      impact: 'major',
      description: 'Navigating through Pacific storm - 2 day delay expected'
    }
  },
  {
    id: 'ship-002',
    trackingNumber: 'LV2024ECO002',
    status: 'out_for_delivery',
    origin: {
      id: 'loc-005',
      name: 'Amsterdam Green Hub',
      coordinates: [4.9041, 52.3676],
      type: 'warehouse',
      address: '789 Sustainable Street',
      city: 'Amsterdam',
      country: 'Netherlands',
      timezone: 'Europe/Amsterdam',
      capacity: 8000,
      currentLoad: 6000
    },
    destination: {
      id: 'loc-006',
      name: 'Berlin Eco Center',
      coordinates: [13.4050, 52.5200],
      type: 'distribution_center',
      address: '321 Green Logistics Way',
      city: 'Berlin',
      country: 'Germany',
      timezone: 'Europe/Berlin',
      capacity: 12000,
      currentLoad: 9000
    },
    currentLocation: {
      id: 'loc-007',
      name: 'Berlin Delivery Route',
      coordinates: [13.4050, 52.5200],
      type: 'final_destination',
      address: 'Final delivery route',
      city: 'Berlin',
      country: 'Germany',
      timezone: 'Europe/Berlin'
    },
    progress: 95,
    estimatedDelivery: new Date('2024-01-12T16:00:00Z'),
    story: {
      title: 'The Green Revolution',
      description: 'Sustainable packaging materials making their way to eco-conscious consumers',
      heroMoment: 'Achieved 100% carbon-neutral delivery route',
      challenges: ['Urban traffic congestion', 'Eco-friendly delivery requirements'],
      milestones: ['Sourced from sustainable suppliers', 'Optimized route for minimal emissions', 'Electric vehicle delivery'],
      customerImpact: 'Delivering hope for a sustainable future',
      sustainability: {
        carbonFootprint: 0.8,
        renewableEnergy: 100,
        packagingEfficiency: 95,
        routeOptimization: 88
      }
    },
    timeline: [
      {
        id: 'event-003',
        timestamp: new Date('2024-01-11T09:00:00Z'),
        location: {
          id: 'loc-005',
          name: 'Amsterdam Green Hub',
          coordinates: [4.9041, 52.3676],
          type: 'warehouse',
          address: '789 Sustainable Street',
          city: 'Amsterdam',
          country: 'Netherlands',
          timezone: 'Europe/Amsterdam'
        },
        status: 'picked_up',
        description: 'Picked up by electric delivery vehicle',
        icon: '🚛',
        emotion: 'excitement',
        data: { temperature: 15, humidity: 70, vibration: 0.2 }
      }
    ],
    priority: 'standard',
    value: 250,
    weight: 1.2,
    dimensions: { length: 30, width: 25, height: 15, unit: 'cm' },
    specialHandling: ['eco_friendly', 'fragile']
  }
];

export const dashboardMetrics: DashboardMetrics = {
  totalShipments: 1247,
  onTimeDelivery: 94.2,
  averageTransitTime: 3.2,
  customerSatisfaction: 4.8,
  carbonSaved: 1250,
  costSavings: 45000,
  routeOptimizations: 156
};

export const supplyChainNodes: SupplyChainNode[] = [
  {
    id: 'node-001',
    name: 'Shanghai Manufacturing Hub',
    type: 'manufacturer',
    location: {
      id: 'loc-001',
      name: 'Shanghai Manufacturing Hub',
      coordinates: [121.4737, 31.2304],
      type: 'warehouse',
      address: '123 Manufacturing Street',
      city: 'Shanghai',
      country: 'China',
      timezone: 'Asia/Shanghai'
    },
    capacity: 10000,
    currentLoad: 7500,
    efficiency: 92,
    connections: ['node-002', 'node-003'],
    status: 'operational'
  },
  {
    id: 'node-002',
    name: 'Pacific Distribution Network',
    type: 'distributor',
    location: {
      id: 'loc-002',
      name: 'Pacific Distribution Network',
      coordinates: [-150.0000, 30.0000],
      type: 'distribution_center',
      address: 'International Waters',
      city: 'Pacific Ocean',
      country: 'International',
      timezone: 'UTC'
    },
    capacity: 50000,
    currentLoad: 35000,
    efficiency: 88,
    connections: ['node-001', 'node-004'],
    status: 'operational'
  }
];



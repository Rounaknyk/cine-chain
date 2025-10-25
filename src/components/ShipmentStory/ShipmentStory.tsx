'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shipment } from '@/data/logisticsTypes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Truck, MapPin, Clock, Package, AlertTriangle, Cloud, Sun, CloudRain, Snowflake } from 'lucide-react';
import Image from 'next/image';

interface ShipmentStoryProps {
  shipment: Shipment;
}

export default function ShipmentStory({ shipment }: ShipmentStoryProps) {
  const { story, timeline, progress, weatherImpact } = shipment;
  const storyRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Story section animation
    gsap.fromTo(storyRef.current,
      { y: 30, opacity: 0, scale: 0.95 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Timeline animation with stagger
    if (timelineRef.current?.children) {
      gsap.fromTo(timelineRef.current.children,
        { x: -30, opacity: 0, scale: 0.9 },
        { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6, 
          stagger: 0.1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Progress animation
    gsap.fromTo(progressRef.current,
      { scaleX: 0, opacity: 0 },
      { 
        scaleX: 1, 
        opacity: 1,
        duration: 1.5, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: progressRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const getWeatherIcon = (type: string) => {
    switch (type) {
      case 'storm': return <Cloud className="h-6 w-6 text-red-500" />;
      case 'rain': return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'snow': return <Snowflake className="h-6 w-6 text-blue-300" />;
      default: return <Sun className="h-6 w-6 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'urgent': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div ref={storyRef} className="space-y-6">
      {/* Weather Alert */}
      {weatherImpact && weatherImpact.impact !== 'none' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className={`border-l-4 ${
            weatherImpact.severity === 'high' ? 'border-red-500 bg-red-50' :
            weatherImpact.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
            'border-blue-500 bg-blue-50'
          }`}>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                {getWeatherIcon(weatherImpact.type)}
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Weather Impact: {weatherImpact.severity.charAt(0).toUpperCase() + weatherImpact.severity.slice(1)} {weatherImpact.type}
                  </h4>
                  <p className="text-sm text-gray-600">{weatherImpact.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Story Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{story.title}</CardTitle>
              <CardDescription className="text-lg">{story.subtitle}</CardDescription>
            </div>
            <Badge variant={getPriorityColor(shipment.priority)}>
              {shipment.priority.toUpperCase()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Package className="h-4 w-4" />
                <span>{shipment.trackingNumber}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{shipment.origin.city} → {shipment.destination.city}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>ETA: {shipment.estimatedDelivery.toLocaleDateString()}</span>
              </div>
            </div>
            
            <div ref={progressRef} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Story Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Truck className="h-5 w-5" />
            <span>Journey Story</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">{story.description}</p>
            
            {story.heroMoment && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900 mb-2">🌟 Hero Moment</h4>
                <p className="text-blue-800">{story.heroMoment}</p>
              </div>
            )}

            {story.challenges && story.challenges.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">Challenges Overcome</h4>
                <ul className="space-y-1">
                  {story.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Journey Timeline</CardTitle>
          <CardDescription>Key milestones in your package's adventure</CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={timelineRef} className="space-y-4">
            {timeline.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex space-x-4"
              >
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    event.status === 'completed' ? 'bg-green-100 text-green-600' :
                    event.status === 'current' ? 'bg-blue-100 text-blue-600' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {event.status === 'completed' ? '✓' :
                     event.status === 'current' ? '→' : '○'}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                    <span className="text-xs text-gray-500">{event.timestamp.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  {event.location && (
                    <div className="flex items-center space-x-1 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{event.location.city}, {event.location.country}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visual Story Element */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Logistics journey"
              width={600}
              height={300}
              className="rounded-lg mx-auto"
            />
            <p className="text-sm text-gray-600 mt-2">
              Your package's journey through the global supply chain
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
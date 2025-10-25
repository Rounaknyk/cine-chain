'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Truck, MapPin, BarChart3, Package, Clock, TrendingUp, ArrowRight, Play, CheckCircle, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

// Rolling Number Component
function RollingNumber({ end, duration = 2000, suffix = "", prefix = "" }: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string; 
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * end;
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else if (num % 1 !== 0) {
      return num.toFixed(1);
    } else {
      return Math.floor(num).toLocaleString();
    }
  };

  return (
    <motion.span 
      ref={ref} 
      className="text-5xl font-bold mb-2"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.span>
  );
}

export default function Home() {
  // Video configuration - using local videos from public/videos folder
  const videoConfig = {
    // Primary video (place your main video here as hero-background.mp4)
    primary: "/videos/hero-background.mp4",
    // Backup video (place alternative video here as hero-background-2.mp4)
    secondary: "/videos/hero-background-2.mp4",
    // Fallback image (place fallback image here as fallback-image.jpg)
    fallback: "/videos/fallback-image.jpg"
  };

  // External video options (if you prefer to use online videos):
  // const videoConfig = {
  //   primary: "https://videos.pexels.com/video-files/3195391/3195391-uhd_2560_1440_25fps.mp4",
  //   secondary: "https://videos.pexels.com/video-files/3195392/3195392-uhd_2560_1440_25fps.mp4",
  //   fallback: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          {/* Video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={videoConfig.fallback}
            onLoadStart={() => console.log('Video loading started')}
            onCanPlay={() => console.log('Video can play')}
            onError={(e) => {
              console.log('Video failed to load:', e);
              // Show fallback image if video fails
              const fallbackDiv = document.getElementById('video-fallback');
              if (fallbackDiv) fallbackDiv.style.display = 'block';
            }}
          >
            <source src={videoConfig.primary} type="video/mp4" />
            <source src={videoConfig.secondary} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Fallback Image - Hidden by default, shown only if video fails */}
          <div 
            id="video-fallback" 
            className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 hidden"
          >
        <Image
              src={videoConfig.fallback}
              alt="Logistics background"
              fill
              className="object-cover opacity-60"
          priority
        />
          </div>
          
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              🚀 The Future of Logistics
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              LogiVision
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Experience supply chain visibility like never before with cinematic storytelling, 
              real-time animations, and clear data signals that transform complex logistics into human stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/role-selector">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  Choose Your Role
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose LogiVision?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your logistics operations with cutting-edge technology and intuitive design
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Truck className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Real-time Tracking</CardTitle>
                  <CardDescription>
                    Track every shipment with cinematic precision and real-time updates across your entire supply chain
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Real-time tracking"
                    width={400}
                    height={250}
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Global Visibility</CardTitle>
                  <CardDescription>
                    See your entire supply chain network with interactive maps and comprehensive analytics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Global visibility"
                    width={400}
                    height={250}
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Smart Analytics</CardTitle>
                  <CardDescription>
                    Get insights that matter with AI-powered analytics, predictions, and automated recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Smart analytics"
                    width={400}
                    height={250}
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-blue-100">Numbers that speak for themselves</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-10 w-10" />
              </div>
              <RollingNumber end={1000000} suffix="+" duration={2500} />
              <div className="text-xl text-blue-100">Packages Tracked Daily</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10" />
              </div>
              <RollingNumber end={99.9} suffix="%" duration={2000} />
              <div className="text-xl text-blue-100">On-time Delivery Rate</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10" />
              </div>
              <RollingNumber end={25} suffix="%" duration={1800} />
              <div className="text-xl text-blue-100">Average Cost Reduction</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Logistics?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of companies already using LogiVision to revolutionize their supply chain operations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/role-selector">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  Choose Your Role
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
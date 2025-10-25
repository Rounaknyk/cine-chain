import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useGSAPEffects = (role: string) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shipmentCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Only apply GSAP effects for shipper dashboard
    if (role === 'shipper') {
      // Header animation with enhanced effects
      gsap.fromTo(headerRef.current, 
        { y: -50, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.2
        }
      );
      
      // Metrics cards animation with stagger and bounce
      if (metricsRef.current?.children) {
        gsap.fromTo(metricsRef.current.children, 
          { y: 50, opacity: 0, scale: 0.8, rotationX: 15 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            rotationX: 0,
            duration: 0.8, 
            stagger: 0.2, 
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: metricsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
      
      // Tabs animation with slide effect
      if (tabsRef.current?.children) {
        gsap.fromTo(tabsRef.current.children,
          { x: -30, opacity: 0, scale: 0.9 },
          { 
            x: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.6, 
            stagger: 0.1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
      
      // Content sections animation with enhanced effects
      gsap.fromTo(contentRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.2, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Shipment cards animation with 3D effect
      if (shipmentCardsRef.current?.children) {
        gsap.fromTo(shipmentCardsRef.current.children,
          { y: 40, opacity: 0, rotationX: 15, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            rotationX: 0, 
            scale: 1,
            duration: 0.8, 
            stagger: 0.15, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: shipmentCardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
      
      // Add floating animation to key elements
      gsap.to(".floating-element", {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
      
      // Add pulse animation to metrics
      gsap.to(".pulse-metric", {
        scale: 1.05,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
      
      // Add wave animation to tabs
      gsap.to(".wave-tab", {
        y: -5,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2
      });
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [role]);

  return {
    headerRef,
    metricsRef,
    tabsRef,
    contentRef,
    shipmentCardsRef
  };
};

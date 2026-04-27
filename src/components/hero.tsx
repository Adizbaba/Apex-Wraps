'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [stats, setStats] = useState({ vehicles: 0, experience: 0, satisfaction: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setStats({
        vehicles: Math.floor(progress * 2400),
        experience: Math.floor(progress * 12),
        satisfaction: Math.floor(progress * 98)
      });
      if (currentStep >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="https://res.cloudinary.com/dse63uv5p/video/upload/v177333581/0428_cs5ksk.mov" type="video/quicktime" />
          <source src="https://res.cloudinary.com/dse63uv5p/video/upload/v177333581/0428_cs5ksk.mov" type="video/mp4" />
        </video>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-background animate-grid opacity-30 z-1" />
      <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-orange/10 blur-[150px] rounded-full z-1" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col justify-center h-full">
        {/* Badge */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-sm px-4 py-2 w-fit mb-8 rounded-full">
          <div className="w-2 h-2 rounded-full bg-orange animate-pulse-orange" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
            Premium Vehicle Wrapping Studio
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-headline leading-[0.92] tracking-tighter text-white mb-6 uppercase" style={{ fontSize: 'clamp(64px, 12vw, 140px)' }}>
          Transform your <span className="text-[#FF4D00]">Ride</span>,<br />
          one wrap at a time.
        </h1>

        {/* Subheading */}
        <p className="font-body text-white/60 text-lg max-w-[460px] leading-relaxed mb-10">
          Premium car & truck wrapping with precision installation, 
          top-tier vinyl materials, and designs that turn heads on every road.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap gap-5">
          <Button variant="primary" size="lg">View Portfolio</Button>
          <Button variant="outline" size="lg">Our Services</Button>
        </div>

        {/* Stats Panel */}
        <div className="absolute bottom-12 right-6 md:right-12 flex flex-col items-end gap-6 text-right">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 bg-black/40 backdrop-blur-md border border-white/10 p-8 chamfer-clip">
            <div className="flex flex-col">
              <span className="text-3xl font-headline text-orange">{stats.vehicles.toLocaleString()}+</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Vehicles Wrapped</span>
            </div>
            <div className="w-px h-10 bg-white/10 hidden md:block self-center" />
            <div className="flex flex-col">
              <span className="text-3xl font-headline text-white">{stats.experience}yr</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Experience</span>
            </div>
            <div className="w-px h-10 bg-white/10 hidden md:block self-center" />
            <div className="flex flex-col">
              <span className="text-3xl font-headline text-white">{stats.satisfaction}%</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Client Satisfaction</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
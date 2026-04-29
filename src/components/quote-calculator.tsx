
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import { Truck, MoveRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const vehicleTypes = [
  { 
    id: 'car', 
    name: 'Car', 
    icon: 'https://res.cloudinary.com/dse63uv5p/image/upload/v1777478196/car_v7atfj.png', 
    isImage: true,
    basePrice: 1800 
  },
  { 
    id: 'suv', 
    name: 'SUV', 
    icon: 'https://res.cloudinary.com/dse63uv5p/image/upload/v1777481309/suv_nnertc.png', 
    isImage: true,
    basePrice: 2200 
  },
  { id: 'truck', name: 'Truck', icon: Truck, basePrice: 2500 },
  { id: 'fleet', name: 'Fleet', icon: MoveRight, basePrice: 1500 }
];

const serviceTypes = [
  { id: 'full', name: 'Full Wrap', multiplier: 1 },
  { id: 'partial', name: 'Partial Wrap', multiplier: 0.6 },
  { id: 'ppf', name: 'PPF Protection', multiplier: 1.5 },
  { id: 'chrome', name: 'Chrome Delete', multiplier: 0.3 }
];

const finishTypes = [
  { id: 'gloss', name: 'Gloss', color: '#ffffff', extra: 0 },
  { id: 'matte', name: 'Matte', color: '#222222', extra: 200 },
  { id: 'satin', name: 'Satin', color: '#555555', extra: 250 },
  { id: 'shift', name: 'Color Shift', color: 'linear-gradient(45deg, #ff00ff, #00ffff)', extra: 600 }
];

export function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    vehicle: null as any,
    service: null as any,
    finish: null as any
  });

  const calculatePrice = () => {
    if (!selections.vehicle || !selections.service) return 0;
    const base = selections.vehicle.basePrice;
    const mult = selections.service.multiplier;
    const extra = selections.finish?.extra || 0;
    return Math.round(base * mult + extra);
  };

  const nextStep = () => setStep(s => s + 1);
  const reset = () => {
    setStep(1);
    setSelections({ vehicle: null, service: null, finish: null });
  };

  const estimatedPrice = calculatePrice();

  return (
    <section id="calculator" className="py-24 bg-[#111111]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16 text-center">
          <SectionLabel className="justify-center">Instant Pricing</SectionLabel>
          <h2 className="text-5xl font-headline text-white uppercase">
            Quote <span className="text-orange">Calculator</span>
          </h2>
        </div>

        <div className="bg-black border border-white/5 p-8 md:p-12 chamfer-clip relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-white/10 font-headline text-6xl">0{step}</span>
          </div>

          {step === 1 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-subheading font-bold text-white">Select Vehicle Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {vehicleTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => { setSelections({ ...selections, vehicle: type }); nextStep(); }}
                    className={cn(
                      "flex flex-col items-center justify-center p-8 border transition-all duration-300 gap-4 group",
                      selections.vehicle?.id === type.id ? "bg-orange border-orange text-black" : "bg-white/5 border-white/10 text-white/40 hover:border-orange hover:text-white"
                    )}
                  >
                    {type.isImage ? (
                      <div className="relative w-12 h-12">
                        <Image 
                          src={type.icon as string} 
                          alt={type.name} 
                          fill 
                          className={cn("object-contain", selections.vehicle?.id === type.id ? "brightness-0" : "opacity-40 group-hover:opacity-100 group-hover:brightness-200")}
                        />
                      </div>
                    ) : (
                      <type.icon className="w-10 h-10" />
                    )}
                    <span className="font-headline uppercase tracking-widest">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-subheading font-bold text-white">Choose Service</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceTypes.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => { setSelections({ ...selections, service }); nextStep(); }}
                    className={cn(
                      "flex items-center justify-between p-6 border transition-all duration-300 group",
                      selections.service?.id === service.id ? "bg-orange border-orange text-black" : "bg-white/5 border-white/10 text-white/40 hover:border-orange hover:text-white"
                    )}
                  >
                    <span className="font-headline text-xl uppercase tracking-widest">{service.name}</span>
                    <MoveRight className="w-6 h-6" />
                  </button>
                ))}
              </div>
              <Button variant="outline" onClick={() => setStep(1)} className="text-xs">← Back</Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 text-center">
              <h3 className="text-2xl font-subheading font-bold text-white">Estimated Investment</h3>
              <div className="py-12 bg-white/5 border-y border-white/5">
                <span className="block text-white/40 text-sm uppercase tracking-widest mb-2">Estimated Price Range</span>
                <span className="text-7xl font-headline text-orange">
                  ${(estimatedPrice * 0.9).toLocaleString()} – ${(estimatedPrice * 1.1).toLocaleString()}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left space-y-2">
                  <p className="text-white/60 text-sm">Vehicle: <span className="text-white font-bold">{selections.vehicle.name}</span></p>
                  <p className="text-white/60 text-sm">Service: <span className="text-white font-bold">{selections.service.name}</span></p>
                </div>
                <div className="flex flex-col gap-4">
                  <Button variant="primary" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    Get My Exact Quote →
                  </Button>
                  <button onClick={reset} className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest">
                    Start Over
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

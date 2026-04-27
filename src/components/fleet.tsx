
import React from 'react';
import { SectionLabel } from '@/components/ui/section-label';

const benefits = [
  'Dedicated fleet account manager',
  'Phased install — vehicles stay in service',
  'Volume discounts from 5 vehicles',
  'Brand consistency guarantee',
  'Priority repair for fleet clients'
];

const makes = [
  { name: 'Ford', highlighted: false },
  { name: 'Mercedes', highlighted: false },
  { name: 'Ram', highlighted: false },
  { name: 'Chevy', highlighted: false },
  { name: 'GMC', highlighted: false },
  { name: 'Any Make', highlighted: true }
];

export function Fleet() {
  return (
    <section id="fleet" className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-headline text-white/[0.04] whitespace-nowrap leading-none uppercase translate-y-24">
          Fleet Wraps
        </span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <SectionLabel>Commercial Solutions</SectionLabel>
            <h2 className="text-5xl font-headline text-white uppercase mb-8 leading-none">
              Built for <span className="text-orange">Business</span>
            </h2>
            <div className="space-y-6 text-white/60 mb-10 text-lg">
              <p>
                Your fleet is your most valuable advertising asset. At Apex Wraps, we specialize in high-impact commercial branding that ensures your business stays visible and professional on every mile.
              </p>
              <p>
                From single van wraps to nationwide multi-vehicle logistics, our team manages the entire process so you can focus on your business.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4 group">
                  <span className="text-orange text-xl group-hover:scale-125 transition-transform">✦</span>
                  <span className="text-white/80 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {makes.map((make) => (
              <div 
                key={make.name}
                className={`
                  aspect-square flex items-center justify-center p-6 border transition-all duration-300
                  ${make.highlighted 
                    ? 'bg-orange border-orange text-black' 
                    : 'bg-black/50 border-white/5 text-white/40 hover:border-orange hover:text-white hover:bg-black'}
                `}
              >
                <span className="text-xl font-headline uppercase tracking-widest">{make.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

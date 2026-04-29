import React from 'react';

const tickerItems = [
  'Full Vehicle Wraps',
  'Color Change Wraps',
  'Commercial Fleet Branding',
  'Chrome & Matte Finishes',
  'Paint Protection Film',
  'Custom Graphics',
  'Truck & Van Wraps'
];

export function Ticker() {
  return (
    <div className="w-full bg-orange py-4 overflow-hidden border-y border-white/10 relative z-20">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {/* Quadrupled for extra seamlessness on ultra-wide screens while keeping the -50% keyframe valid */}
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center mx-8">
            <span className="text-white font-headline text-2xl uppercase tracking-wider">{item}</span>
            <span className="text-white/40 ml-16 text-2xl">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}

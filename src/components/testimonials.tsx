
import React from 'react';
import { SectionLabel } from '@/components/ui/section-label';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Julian Vance',
    business: 'Exotic Car Collector',
    quote: 'The precision on my Huracán was beyond anything I’ve seen. They handled the disassembly with surgical care. Apex is the only shop I trust.'
  },
  {
    name: 'Sarah Chen',
    business: 'Marketing Director, TechFlow',
    quote: 'We wrapped our entire fleet of 12 vans. The brand consistency across different vehicle models was perfect. Highly recommend their fleet service.'
  },
  {
    name: 'Marcus Thorne',
    business: 'Owner, Thorne Contracting',
    quote: 'My truck is my business card. The matte black wrap they did turns heads daily. It’s been 2 years and it still looks brand new.'
  },
  {
    name: 'Elena Rodriguez',
    business: 'Luxury Real Estate Agent',
    quote: 'The color-shift wrap on my Porsche is a conversation starter at every showing. Professional team, fast turnaround, and elite quality.'
  },
  {
    name: 'David Miller',
    business: 'Fleet Manager, Logistics Express',
    quote: 'Phased installation saved our schedule. We never had more than 2 vehicles out of service at once. Exceptional project management.'
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#111111]">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <SectionLabel className="justify-center">Testimonials</SectionLabel>
          <h2 className="text-5xl font-headline text-white uppercase leading-none">
            What Our <span className="text-orange">Clients Say</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-black border border-white/5 p-8 chamfer-clip flex flex-col justify-between hover:border-orange/30 transition-colors"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange text-orange" />
                  ))}
                </div>
                <p className="text-white/70 italic mb-8 leading-relaxed">
                  "{review.quote}"
                </p>
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">{review.name}</h4>
                <p className="text-orange text-[10px] uppercase tracking-widest font-bold">
                  {review.business}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

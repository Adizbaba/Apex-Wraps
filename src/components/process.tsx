
import React from 'react';
import { SectionLabel } from '@/components/ui/section-label';

const steps = [
  {
    num: '01',
    title: 'Consultation & Quote',
    desc: 'Initial expert assessment to determine the best material and budget for your vision.',
    icon: '💬'
  },
  {
    num: '02',
    title: 'Design Mockup',
    desc: 'Our artists create high-fidelity digital renderings of your vehicle before we touch it.',
    icon: '🎨'
  },
  {
    num: '03',
    title: 'Precision Installation',
    desc: 'Certified installers apply your wrap in a dust-free, temperature-controlled environment.',
    icon: '🛠️'
  },
  {
    num: '04',
    title: 'Quality Inspection',
    desc: 'A final 50-point checklist ensures every edge and seam meets our elite standards.',
    icon: '✅'
  }
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center md:text-left">
          <SectionLabel>Our Method</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-subheading font-extrabold text-white uppercase leading-none">
            From Concept to Completion — <span className="text-orange">Our Process</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0.5 bg-white/5 border border-white/5">
          {steps.map((step) => (
            <div 
              key={step.num} 
              className="group relative bg-[#0a0a0a] p-10 min-h-[320px] flex flex-col justify-between overflow-hidden"
            >
              {/* Sliding Orange Border */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-orange -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-20" />
              
              <div className="relative z-10">
                <span className="block text-7xl font-headline text-white/5 mb-4 leading-none select-none">
                  {step.num}
                </span>
                <h3 className="text-2xl font-subheading font-bold text-white mb-4 group-hover:text-orange transition-colors">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-[200px]">
                  {step.desc}
                </p>
              </div>

              <div className="relative z-10 flex justify-end">
                <span className="text-3xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  {step.icon}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    id: 'port-1',
    title: 'Lamborghini Huracán',
    subtitle: 'Ember Flame Wrap',
    tag: 'Full Wrap · Sports Car',
    isLarge: true
  },
  {
    id: 'port-2',
    title: 'BMW M3',
    subtitle: 'Deep Ocean Satin Blue',
    tag: 'Color Change · Sedan',
    isLarge: false
  },
  {
    id: 'port-3',
    title: 'Ford F-250 Fleet',
    subtitle: 'Brand Identity Wrap',
    tag: 'Fleet · Commercial',
    isLarge: false
  },
  {
    id: 'port-4',
    title: 'Porsche 911',
    subtitle: 'Gloss Purple Shift',
    tag: 'Chrome · Luxury',
    isLarge: false
  },
  {
    id: 'port-5',
    title: 'Mercedes Transit',
    subtitle: 'Brushed Chrome',
    tag: 'Chrome · Van',
    isLarge: false
  }
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <h2 className="text-5xl font-headline text-white uppercase leading-none">
            Recent <span className="text-orange">Excellence</span>
          </h2>
          <Button variant="outline" className="border-white/20 text-white/60 hover:text-white">
            View All Projects →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const img = PlaceHolderImages.find(i => i.id === project.id);
            return (
              <div 
                key={project.id}
                className={`group relative overflow-hidden bg-card ${project.isLarge ? 'lg:col-span-2 aspect-[16/9]' : 'aspect-square md:aspect-[4/5] lg:aspect-square'}`}
              >
                {img && (
                  <Image 
                    src={img.imageUrl} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-headline text-white uppercase mb-1">{project.title}</h3>
                    <p className="text-white/60 text-sm mb-4">{project.subtitle}</p>
                    
                    <div className="h-0 group-hover:h-8 overflow-hidden transition-all duration-300">
                      <span className="inline-block bg-orange text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 chamfer-clip">
                        {project.tag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

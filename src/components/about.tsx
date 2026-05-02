import React from 'react';
import Image from 'next/image';
import { SectionLabel } from '@/components/ui/section-label';
import { Target, ShieldCheck, Palette, Zap } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const pillars = [
  { icon: Target, title: 'Precision Install', desc: 'Micron-perfect seams' },
  { icon: ShieldCheck, title: '5-Year Warranty', desc: 'Guaranteed durability' },
  { icon: Palette, title: 'Custom Design', desc: 'One-of-one aesthetics' },
  { icon: Zap, title: 'Fast Turnaround', desc: 'Back on the road sooner' }
];

export function About() {
  const topImg = PlaceHolderImages.find(img => img.id === 'about-top');
  const sq1 = PlaceHolderImages.find(img => img.id === 'about-square-1');
  const sq2 = PlaceHolderImages.find(img => img.id === 'about-square-2');

  return (
    <section id="about" className="py-24 bg-[#111111]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <SectionLabel>About ApexWraper</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-subheading font-extrabold text-white mb-8 leading-tight">
              Shaping the Future of Vehicle Aesthetics with Precision & Passion
            </h2>
            <div className="space-y-6 text-white/60 mb-12">
              <p>
                Founded on the principles of uncompromising quality and innovative design, Apex Wraper has emerged as the premier destination for automotive customization. Our team combines technical mastery with an artist's eye to deliver results that redefine vehicle identity.
              </p>
              <p>
                We don't just apply vinyl; we engineer transformations. Using only the highest grade materials from industry leaders like 3M, Avery Dennison, and Inozetek, we ensure every project meets our rigorous standards for excellence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="group p-6 bg-black border border-white/5 hover:border-orange/50 transition-all duration-300">
                  <pillar.icon className="w-8 h-8 text-orange mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="text-white font-bold mb-1">{pillar.title}</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 relative aspect-[16/9] overflow-hidden group">
              {topImg && (
                <Image 
                  src={topImg.imageUrl} 
                  alt={topImg.description} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 text-[10px] font-bold text-white uppercase tracking-[0.2em] bg-orange px-3 py-1">
                Precision Workshop
              </span>
            </div>
            <div className="relative aspect-square overflow-hidden group">
              {sq1 && (
                <Image 
                  src={sq1.imageUrl} 
                  alt={sq1.description} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-4 left-4 text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Gloss Ember Orange
              </span>
            </div>
            <div className="relative aspect-square overflow-hidden group">
              {sq2 && (
                <Image 
                  src={sq2.imageUrl} 
                  alt={sq2.description} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-4 left-4 text-[10px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Matte Black
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

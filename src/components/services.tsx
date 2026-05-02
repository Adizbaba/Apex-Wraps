import React from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionLabel } from '@/components/ui/section-label';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const serviceList = [
  {
    id: '01',
    title: 'Full Vehicle Wrap',
    desc: 'Complete transformation of your vehicle\'s appearance with premium vinyl materials.',
    tags: ['Edge Wrapping', 'Disassembly', '5yr Warranty']
  },
  {
    id: '02',
    title: 'Color Change Wrap',
    desc: 'Switch to any finish imaginable: matte, satin, gloss, or metallic without permanent paint.',
    tags: ['3M Authorized', 'Avery Dennison', 'UV Protection']
  },
  {
    id: '03',
    title: 'Commercial Fleet Branding',
    desc: 'Turn your vehicles into moving billboards with high-impact corporate branding.',
    tags: ['Bulk Pricing', 'Install Network', 'High Visibility']
  },
  {
    id: '04',
    title: 'Paint Protection Film (PPF)',
    desc: 'Self-healing, invisible defense against rock chips, scratches, and road debris.',
    tags: ['Xpel Certified', 'Edge Sealing', 'Impact Resistant']
  },
  {
    id: '05',
    title: 'Custom Graphics & Decals',
    desc: 'Precision-cut accents, racing stripes, and custom-designed visual elements.',
    tags: ['Vivid Color', 'Die-Cut', 'Removable']
  },
  {
    id: '06',
    title: 'Ceramic Coating',
    desc: 'Nano-technology shield that adds extreme gloss and hydrophobic properties.',
    tags: ['Gtechniq', 'Long-Lasting', 'Hydrophobic']
  }
];

export function Services() {
  const showcaseBg = PlaceHolderImages.find(img => img.id === 'services-showcase-bg');

  return (
    <section id="services" className="py-24 bg-[#111111]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Accordion */}
          <div>
            <SectionLabel>Core Services</SectionLabel>
            <h2 className="text-5xl font-headline text-white uppercase mb-12">
              Premium <span className="text-orange">Solutions</span>
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {serviceList.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border-white/5">
                  <AccordionTrigger className="hover:no-underline group">
                    <div className="flex items-center gap-6 text-left">
                      <span className="text-orange font-headline text-2xl group-data-[state=open]:rotate-90 transition-transform">
                        {item.id}
                      </span>
                      <span className="text-2xl font-headline text-white group-hover:text-orange transition-colors">
                        {item.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-16 text-white/60">
                    <p className="mb-4 max-w-md">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-orange border border-orange/20 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right: Sticky Showcase */}
          <div className="lg:sticky lg:top-24">
            <div className="group bg-black border border-white/5 p-8 chamfer-clip relative overflow-hidden aspect-[4/5] flex flex-col items-center justify-center text-center transition-all duration-500">
              {/* Background Image */}
              {showcaseBg && (
                <Image 
                  src={showcaseBg.imageUrl} 
                  alt={showcaseBg.description} 
                  fill 
                  className="object-cover opacity-40 group-hover:opacity-100 transition-opacity duration-700 z-0"
                />
              )}
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-700 z-0" />

              {/* Grid Background */}
              <div className="absolute inset-0 grid-background opacity-20 pointer-events-none z-1" />
              
              <h3 className="text-3xl font-headline text-white uppercase mb-4 relative z-10 transition-colors group-hover:text-white">
                Ready for a <span className="text-orange">Transformation?</span>
              </h3>
              <p className="text-white/40 text-sm mb-8 max-w-xs relative z-10 group-hover:text-white/80 transition-colors">
                Join thousands of satisfied clients who trust Apex Wraper with their most valuable assets.
              </p>

              <div className="grid grid-cols-2 gap-8 w-full border-t border-white/5 pt-8 mt-auto relative z-10">
                <div className="text-left">
                  <span className="block text-2xl font-headline text-orange">2,400+</span>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white/60">Wraps Completed</span>
                </div>
                <div className="text-right">
                  <span className="block text-2xl font-headline text-white">4.9★</span>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white/60">Client Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

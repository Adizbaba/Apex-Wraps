
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const beforeImg = PlaceHolderImages.find(img => img.id === 'slider-1-before');
  const afterImg = PlaceHolderImages.find(img => img.id === 'slider-1-after');

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  };

  const onMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-headline text-white uppercase">
            Visual <span className="text-orange">Impact</span>
          </h2>
          <p className="text-white/40 mt-4">Slide to reveal the transformation</p>
        </div>

        <div 
          ref={containerRef}
          className="relative aspect-[16/9] w-full max-w-5xl mx-auto cursor-ew-resize select-none overflow-hidden border border-white/10"
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
        >
          {/* After Image (Background) */}
          {afterImg && (
            <div className="absolute inset-0">
              <Image 
                src={afterImg.imageUrl} 
                alt="After wrap" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute top-4 right-4 bg-orange text-black font-bold text-[10px] uppercase tracking-widest px-3 py-1">
                After
              </div>
            </div>
          )}

          {/* Before Image (Foreground with Clip) */}
          {beforeImg && (
            <div 
              className="absolute inset-0 z-10"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <Image 
                src={beforeImg.imageUrl} 
                alt="Before wrap" 
                fill 
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1">
                Before
              </div>
            </div>
          )}

          {/* Slider Line */}
          <div 
            className="absolute top-0 bottom-0 z-20 w-0.5 bg-orange"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-orange rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,77,0,0.5)]">
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-black/30 rounded-full" />
                <div className="w-1 h-3 bg-black/30 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

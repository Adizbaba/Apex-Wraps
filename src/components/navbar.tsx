'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/85 backdrop-blur-md border-b border-white/5',
        isScrolled ? 'py-3 shadow-2xl' : 'py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-orange drop-shadow-[0_0_8px_rgba(255,77,0,0.5)]">
              <path d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" />
              <text x="50" y="62" textAnchor="middle" fill="black" fontSize="28" fontWeight="900" fontFamily="sans-serif">AW</text>
            </svg>
          </div>
          <div className="flex flex-col leading-none font-headline tracking-tighter">
            <span className="text-2xl text-white">APEX</span>
            <span className="text-2xl text-orange">WRAPS</span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {['About', 'Services', 'Portfolio', 'Fleet', 'Blog', 'Contact'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-orange transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Action */}
        <Button variant="primary" className="rounded-full px-8 hidden sm:flex">
          Get a Quote
        </Button>
      </div>
    </nav>
  );
}

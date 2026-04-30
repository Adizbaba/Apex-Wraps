
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Fleet', href: '#fleet' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logo = PlaceHolderImages.find(img => img.id === 'brand-logo');

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
          <div className="relative w-12 h-12">
            {logo && (
              <Image 
                src={logo.imageUrl}
                alt="Apex Wraps"
                fill
                className="object-contain drop-shadow-[0_0_8px_rgba(255,77,0,0.3)] transition-transform group-hover:scale-110"
                priority
              />
            )}
          </div>
          <div className="flex flex-col leading-none font-headline tracking-tighter">
            <span className="text-2xl text-white">APEX</span>
            <span className="text-2xl text-orange">WRAPS</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-orange transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Action Button & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button variant="primary" className="rounded-full px-8 hidden sm:flex">
            Get a Quote
          </Button>

          {/* Mobile Burger Menu */}
          {mounted && (
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-white border border-white/10 hover:border-orange hover:bg-white/5 hover:text-orange transition-all p-0 h-12 w-12 rounded-none"
                  >
                    <Menu className="w-10 h-10" strokeWidth={2.5} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-background border-l border-white/5 p-8 flex flex-col">
                  <SheetHeader className="mb-12 text-left">
                    <SheetTitle>
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10">
                          {logo && (
                            <Image 
                              src={logo.imageUrl}
                              alt="Apex Wraps"
                              fill
                              className="object-contain"
                            />
                          )}
                        </div>
                        <div className="flex flex-col leading-none font-headline tracking-tighter text-left">
                          <span className="text-lg text-white">APEX</span>
                          <span className="text-lg text-orange">WRAPS</span>
                        </div>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6">
                    {navLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-xl font-headline uppercase tracking-widest text-white/70 hover:text-orange transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="mt-8 pt-8 border-t border-white/5">
                      <Button variant="primary" className="w-full" onClick={() => {
                        setIsOpen(false);
                        document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
                      }}>
                        Get a Quote
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

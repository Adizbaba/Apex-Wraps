'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Footer() {
  const { toast } = useToast();
  const firestore = useFirestore();

  const logo = PlaceHolderImages.find(img => img.id === 'brand-logo');

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    
    if (email) {
      const subscribersRef = collection(firestore, 'newsletterSubscribers');
      addDocumentNonBlocking(subscribersRef, {
        email,
        status: 'subscribed',
        subscribedAt: new Date().toISOString()
      }).then(() => {
        toast({ title: "Subscribed!", description: "You've joined the Apex Insiders list." });
        (e.target as HTMLFormElement).reset();
      });
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Col 1: Brand */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                {logo && (
                  <Image 
                    src={logo.imageUrl}
                    alt="Apex Wraper"
                    fill
                    className="object-contain"
                  />
                )}
              </div>
              <div className="flex flex-col leading-none font-headline tracking-tighter">
                <span className="text-xl text-white">APEX</span>
                <span className="text-xl text-orange">WRAPER</span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed">
              Premium automotive customization studio specializing in precision vehicle wrapping, paint protection, and high-impact commercial branding.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube, Twitter, Linkedin].map((Icon, idx) => (
                <Link key={idx} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-orange hover:bg-white/10 transition-all">
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-headline text-xl uppercase tracking-widest mb-8">Services</h4>
            <ul className="space-y-4">
              {['Full Vehicle Wraps', 'Color Change', 'Commercial Fleet', 'PPF Protection', 'Custom Graphics', 'Ceramic Coating'].map((item) => (
                <li key={item}>
                  <Link href="#services" className="text-white/40 hover:text-orange transition-colors text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-white font-headline text-xl uppercase tracking-widest mb-8">Studio</h4>
            <ul className="space-y-4">
              {['About', 'Portfolio', 'Process', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="text-white/40 hover:text-orange transition-colors text-sm">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-white font-headline text-xl uppercase tracking-widest mb-8">Join the Pulse</h4>
            <p className="text-white/40 text-sm mb-6">Get early access to new finishes and fleet discounts.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex border-b border-white/10 focus-within:border-orange transition-colors">
              <input 
                name="email"
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent text-sm py-3 text-white outline-none flex-1"
                required
              />
              <button type="submit" className="text-orange hover:translate-x-1 transition-transform">
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">
            © 2025 ApexWraper Studio. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <Link key={item} href="#" className="text-white/20 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

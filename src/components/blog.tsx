
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const posts = [
  {
    id: 'blog-1',
    date: 'MAR 12',
    category: 'Trends',
    title: 'Top 10 Vehicle Wrap Trends Dominating 2025',
    excerpt: 'From hyper-shift metallics to complex geometric patterns, see what is trending this year.'
  },
  {
    id: 'blog-2',
    date: 'MAR 08',
    category: 'Business',
    title: 'Why Fleet Wraps Are the Smartest Marketing ROI',
    excerpt: 'Learn how vehicle branding outperforms digital ads in local reach and long-term value.'
  },
  {
    id: 'blog-3',
    date: 'FEB 28',
    category: 'How-To',
    title: 'PPF vs Vinyl Wrap: Which Protects Your Car Better?',
    excerpt: 'We break down the technical differences between styling wraps and protection films.'
  }
];

export function Blog() {
  return (
    <section id="blog" className="py-24 bg-[#111111]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <SectionLabel>Apex Insights</SectionLabel>
            <h2 className="text-5xl font-headline text-white uppercase leading-none">
              Latest from <span className="text-orange">The Studio</span>
            </h2>
          </div>
          <Button variant="outline" className="border-white/10 text-white/50 hover:text-white">
            All Articles →
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const img = PlaceHolderImages.find(i => i.id === post.id);
            return (
              <div 
                key={post.id} 
                className="group flex flex-col h-full bg-black border border-white/5 hover:border-orange transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {img && (
                    <Image 
                      src={img.imageUrl} 
                      alt={post.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-orange text-black font-headline px-3 py-1 text-lg leading-tight text-center">
                    <span className="block">{post.date.split(' ')[1]}</span>
                    <span className="text-xs font-bold -mt-1 block">{post.date.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <span className="text-orange text-[10px] font-bold uppercase tracking-widest mb-4 block">
                    {post.category}
                  </span>
                  <h3 className="text-2xl font-subheading font-extrabold text-white mb-4 leading-tight group-hover:text-orange transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-white/40 text-sm mb-8 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link 
                    href="#" 
                    className="text-white text-[10px] font-bold uppercase tracking-widest group-hover:text-orange transition-colors"
                  >
                    Read Article →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

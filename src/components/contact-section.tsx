'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { SectionLabel } from '@/components/ui/section-label';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { notifyAdmin } from '@/ai/flows/lead-notification-flow';

type FormData = {
  name: string;
  email: string;
  phone: string;
  vehicleType: string;
  service: string;
  message: string;
};

export function ContactSection() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    const leadsRef = collection(firestore, 'leads');
    
    // 1. Save to Firestore (Non-blocking)
    addDocumentNonBlocking(leadsRef, {
      ...data,
      status: 'New',
      createdAt: new Date().toISOString()
    }).then(async () => {
      // 2. Trigger Admin Notification Flow
      try {
        await notifyAdmin(data);
      } catch (error) {
        console.error('Failed to send lead notification:', error);
      }

      toast({
        title: "Quote Requested!",
        description: "Our team will contact you within 24 hours.",
      });
      reset();
      setIsSubmitting(false);
    });
  };

  return (
    <section id="contact" className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Content */}
          <div>
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="text-7xl font-headline text-white uppercase leading-[0.9] mb-8">
              Let's Wrap Your <span className="text-orange">Ride.</span>
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-md">
              Ready to redefine your vehicle's identity? Fill out the form below or reach out directly to start your project.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-orange mt-1" />
                <div>
                  <h4 className="text-white font-bold text-sm">Call Us</h4>
                  <p className="text-white/40 text-sm">571 632 7734</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-orange mt-1" />
                <div>
                  <h4 className="text-white font-bold text-sm">Email</h4>
                  <p className="text-white/40 text-sm">hello@apexwraps.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-orange mt-1" />
                <div>
                  <h4 className="text-white font-bold text-sm">Visit</h4>
                  <p className="text-white/40 text-sm">(US & CA)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-orange mt-1" />
                <div>
                  <h4 className="text-white font-bold text-sm">Hours</h4>
                  <p className="text-white/40 text-sm">Mon–Sat 8AM–6PM</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full aspect-video bg-black border border-white/5 overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110948.336154562!2d-95.4623!3d29.7604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640b8b4488d8501%3A0xca0d02def365053b!2sHouston%2C%20TX!5e0!3m2!1sen!2sus!4v1710312000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-black border border-white/5 p-8 md:p-12 chamfer-clip shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                  <Input {...register('name', { required: true })} className="bg-white/5 border-white/10 text-white rounded-none focus:border-orange" placeholder="First & Last Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Email Address</label>
                  <Input {...register('email', { required: true })} type="email" className="bg-white/5 border-white/10 text-white rounded-none focus:border-orange" placeholder="Email@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Phone Number</label>
                  <Input {...register('phone', { required: true })} className="bg-white/5 border-white/10 text-white rounded-none focus:border-orange" placeholder="(xxx) xxx xxxx" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Vehicle Type</label>
                  <select {...register('vehicleType')} className="flex h-10 w-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange">
                    <option value="car">Car</option>
                    <option value="suv">SUV</option>
                    <option value="truck">Truck</option>
                    <option value="van">Van</option>
                    <option value="fleet">Fleet</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Service Interested In</label>
                <select {...register('service')} className="flex h-10 w-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange">
                  <option value="full-wrap">Full Wrap</option>
                  <option value="ppf">Paint Protection Film</option>
                  <option value="fleet">Fleet Branding</option>
                  <option value="custom">Custom Graphics</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Your Message</label>
                <Textarea {...register('message')} className="bg-white/5 border-white/10 text-white rounded-none focus:border-orange min-h-[120px]" placeholder="Tell us about your vision..." />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                {isSubmitting ? 'Sending...' : 'Request a Free Quote →'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

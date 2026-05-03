'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { SectionLabel } from '@/components/ui/section-label';
import { Phone, Mail, MapPin, Clock, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs';

export function ContactSection() {
  const { toast } = useToast();
  const firestore = useFirestore();

  // Form Field States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleType, setVehicleType] = useState('Car');
  const [serviceType, setServiceType] = useState('Full Wrap');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot

  // UI States
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cooldown, setCooldown] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (fullName.length < 2) newErrors.fullName = "Full name must be at least 2 characters";
    if (!emailRegex.test(email)) newErrors.email = "Please enter a valid email address";
    if (phone.replace(/\D/g, '').length < 10) newErrors.phone = "Phone number must be at least 10 digits";
    if (message.length < 10) newErrors.message = "Message must be at least 10 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Spam Protection
    if (website) return; // Silently reject bots
    if (cooldown) return;

    // Validation
    if (!validate()) return;

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    try {
      // 1. Send Email via EmailJS
      const templateParams = {
        from_name: fullName,
        from_email: email,
        phone: phone,
        vehicle_type: vehicleType,
        service_type: serviceType,
        message: message,
        to_email: "info@apexwraper.com",
        reply_to: email
      };

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      // 2. Save to Firestore simultaneously
      const leadsRef = collection(firestore, 'leads');
      await addDoc(leadsRef, {
        fullName,
        email,
        phone,
        vehicleType,
        serviceType,
        message,
        submittedAt: serverTimestamp(),
        status: "new",
        source: "website-contact-form"
      });

      // Handle Success
      setIsSuccess(true);
      toast({
        className: "bg-[#22C55E] text-white border-none",
        title: "✓ Quote request sent!",
        description: "We'll contact you within 24 hours.",
        duration: 5000,
      });

      // Reset Form
      setFullName('');
      setEmail('');
      setPhone('');
      setVehicleType('Car');
      setServiceType('Full Wrap');
      setMessage('');
      
      // Start Cooldown
      setCooldown(true);
      setTimeout(() => setCooldown(false), 3000);

    } catch (error) {
      console.error('Submission failed:', error);
      setIsError(true);
      toast({
        variant: "destructive",
        className: "bg-[#CC0000] text-white border-none",
        title: "✗ Something went wrong.",
        description: "Please call us directly at 571 632 7734",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
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
                  <p className="text-white/40 text-sm">info@apexwraper.com</p>
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
          </div>

          {/* Right: Form */}
          <div className="bg-black border border-white/5 p-8 md:p-12 chamfer-clip shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot */}
              <input 
                type="text" 
                name="website" 
                style={{ display: 'none' }} 
                tabIndex={-1} 
                autoComplete="off" 
                onChange={(e) => setWebsite(e.target.value)} 
                value={website} 
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                  <Input 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={{ borderColor: errors.fullName ? '#CC0000' : '' }}
                    className="bg-white/5 border-white/10 text-white rounded-none focus:border-orange" 
                    placeholder="First & Last Name" 
                  />
                  {errors.fullName && <p className="text-[#CC0000] text-[10px] font-bold uppercase tracking-wider">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Email Address</label>
                  <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ borderColor: errors.email ? '#CC0000' : '' }}
                    className="bg-white/5 border-white/10 text-white rounded-none focus:border-orange" 
                    placeholder="Email@example.com" 
                  />
                  {errors.email && <p className="text-[#CC0000] text-[10px] font-bold uppercase tracking-wider">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Phone Number</label>
                  <Input 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{ borderColor: errors.phone ? '#CC0000' : '' }}
                    className="bg-white/5 border-white/10 text-white rounded-none focus:border-orange" 
                    placeholder="(xxx) xxx xxxx" 
                  />
                  {errors.phone && <p className="text-[#CC0000] text-[10px] font-bold uppercase tracking-wider">{errors.phone}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Vehicle Type</label>
                  <select 
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="flex h-10 w-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange"
                  >
                    <option value="Car">Car</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                    <option value="Fleet">Fleet</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Service Interested In</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="flex h-10 w-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange"
                >
                  <option value="Full Wrap">Full Wrap</option>
                  <option value="Partial Wrap">Partial Wrap</option>
                  <option value="Color Change">Color Change</option>
                  <option value="PPF">Paint Protection Film (PPF)</option>
                  <option value="Fleet Branding">Fleet Branding</option>
                  <option value="Custom Graphics">Custom Graphics</option>
                  <option value="Ceramic Coating">Ceramic Coating</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Your Message</label>
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ borderColor: errors.message ? '#CC0000' : '' }}
                  className="bg-white/5 border-white/10 text-white rounded-none focus-visible:ring-2 focus-visible:ring-orange min-h-[120px]" 
                  placeholder="Tell us about your vision..." 
                />
                {errors.message && <p className="text-[#CC0000] text-[10px] font-bold uppercase tracking-wider">{errors.message}</p>}
              </div>

              <Button 
                type="submit" 
                disabled={isLoading || cooldown} 
                variant="primary"
                size="lg"
                className={`w-full ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    SENDING... <Loader2 className="w-4 h-4 animate-spin" />
                  </span>
                ) : (
                  'REQUEST A FREE QUOTE →'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

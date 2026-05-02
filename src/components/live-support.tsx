'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A sophisticated floating Live Support widget.
 * Routes users to WhatsApp but presented as a modern live chat interface.
 */
export function LiveSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const config = {
    number: "5716327734",
    message: "Hi Apex Wraper team, I need some help with my vehicle project.",
    color: "#FF4D00", // Apex Orange
  };

  useEffect(() => {
    // Show tooltip after a short delay to grab attention
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleChatStart = () => {
    window.open(`https://wa.me/${config.number}?text=${encodeURIComponent(config.message)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      {/* Tooltip / Prompt */}
      {showTooltip && !isOpen && (
        <div className="bg-white text-black p-4 rounded-2xl shadow-2xl relative mb-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <button 
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 hover:bg-orange transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="text-xs font-bold leading-tight">
            Need help? <br />
            <span className="text-orange">Chat with an expert now!</span>
          </p>
          <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45" />
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[320px] bg-black border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 origin-bottom-right mb-4">
          {/* Header */}
          <div className="bg-orange p-6 text-black">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-headline text-2xl uppercase tracking-tighter">Live Support</h3>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-black/10 border border-black/20 overflow-hidden">
                  <img src="https://res.cloudinary.com/dse63uv5p/image/upload/v1777511848/AW_uonfks.png" alt="Apex Support" className="w-full h-full object-contain p-1" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-orange rounded-full" />
              </div>
              <div>
                <p className="text-sm font-bold">Apex Support Team</p>
                <p className="text-[10px] uppercase font-bold opacity-70">Online & Ready to Help</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none">
              <p className="text-sm text-white/80">
                Hi there! 👋 How can we help you with your vehicle wrap project today?
              </p>
            </div>
            <p className="text-[10px] text-white/30 text-center uppercase tracking-widest font-bold">
              Typically replies in under 5 minutes
            </p>
          </div>

          {/* Footer / Action */}
          <div className="p-6 pt-0">
            <button 
              onClick={handleChatStart}
              className="w-full bg-white text-black font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-orange transition-all group"
            >
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              Start Chat on WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group relative",
          isOpen ? "bg-white text-black" : "bg-orange text-black"
        )}
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <>
            <MessageSquare className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full" />
            <div className="absolute right-full mr-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Support</span>
            </div>
          </>
        )}
      </button>
    </div>
  );
}

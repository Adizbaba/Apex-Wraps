
'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/17135550192"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[100] group"
    >
      <div className="relative">
        {/* Pulse Effect */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25" />
        
        {/* Main Button */}
        <div className="relative bg-[#25D366] text-white p-4 rounded-full shadow-2xl transform transition-transform duration-300 group-hover:scale-110 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold text-sm">
            Chat with us
          </span>
        </div>
      </div>
    </a>
  );
}

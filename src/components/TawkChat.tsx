"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export default function TawkChat() {
  useEffect(() => {
    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // Position the Tawk.to bubble ABOVE the WhatsApp button (which sits at 24px)
    // 90px offset ensures a clean vertical stack
    window.Tawk_API.customStyle = {
      visibility: {
        desktop: {
          position: 'br', // bottom right
          xOffset: 24,
          yOffset: 90
        },
        mobile: {
          position: 'br',
          xOffset: 20,
          yOffset: 90
        }
      }
    };

    const script = document.createElement("script");
    const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
    const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;
    
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.async = true;
    script.crossOrigin = "*";
    script.charset = "UTF-8";
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}

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

    // Reset Tawk.to to the primary bottom-right position (24px offset)
    window.Tawk_API.customStyle = {
      visibility: {
        desktop: {
          position: 'br', // bottom right
          xOffset: 24,
          yOffset: 24
        },
        mobile: {
          position: 'br',
          xOffset: 20,
          yOffset: 20
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

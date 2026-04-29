
import type { Metadata } from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Apex Wraps | Premium Car Customization Houston',
  description: 'Apex Wraps provides world-class car wrapping, PPF, and commercial fleet branding in Houston, TX. Precision installation with 5-year warranty.',
  openGraph: {
    title: 'Apex Wraps | Premium Vehicle Wrapping Studio',
    description: 'Transform your ride with precision installation and top-tier materials.',
    url: 'https://apex-wraps.com',
    siteName: 'Apex Wraps',
    images: [
      {
        url: 'https://picsum.photos/seed/1/1200/630',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Apex Wraps",
              "image": "https://picsum.photos/seed/1/800/600",
              "@id": "",
              "url": "https://apex-wraps.com",
              "telephone": "+15716327734",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US & CA"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 37.0902,
                "longitude": -95.7129
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "08:00",
                "closes": "18:00"
              }
            })
          }}
        />
      </head>
      <body className="font-body min-h-screen bg-background">
        <FirebaseClientProvider>
          {children}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}

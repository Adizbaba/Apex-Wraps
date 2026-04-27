import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Apex Wraps | Premium Car Customization',
  description: 'Apex Wraps provides world-class car wrapping and automotive customization services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}

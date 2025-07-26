import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
// import { customSans, customDisplay, customMono } from '../lib/fonts'; // Uncomment when you have font files
import './globals.css';

// Google Fonts (current setup)
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'TIN Simulation - Portfolio',
  description:
    'Interactive Triangular Irregular Network (TIN) with movement simulation using Three.js and Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 
          OPTIONAL: Preload critical fonts for better performance
          Only preload fonts that are used above the fold
        */}
        <link
          rel="preload"
          href="/fonts/YourCriticalFont-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`
          ${geistSans.variable} 
          ${geistMono.variable} 
          ${inter.variable}
        `}
        // If using custom local fonts, add them here:
        // ${customSans.variable}
        // ${customDisplay.variable}
        // ${customMono.variable}
      >
        {children}
      </body>
    </html>
  );
}

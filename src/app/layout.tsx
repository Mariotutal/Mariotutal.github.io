import type { Metadata, Viewport } from 'next';
import { Geist_Mono } from 'next/font/google';
import { satoshi } from '../lib/satoshi-fonts';
import './globals.css';

// Keeping Geist Mono for code elements
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mario Vargas - Portfolio',
  description:
    'Interactive Triangular Irregular Network (TIN) with movement simulation using Three.js and Next.js',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

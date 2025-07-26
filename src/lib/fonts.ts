import localFont from 'next/font/local';

// Example of loading local custom fonts using next/font/local
// This is the RECOMMENDED approach for custom font files

export const customSans = localFont({
  src: [
    {
      path: '../../public/fonts/CustomSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CustomSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CustomSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CustomSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CustomSans-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-custom-sans',
  display: 'swap',
});

export const customDisplay = localFont({
  src: [
    {
      path: '../../public/fonts/CustomDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CustomDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-custom-display',
  display: 'swap',
});

export const customMono = localFont({
  src: '../../public/fonts/CustomMono-Regular.woff2',
  variable: '--font-custom-mono',
  weight: '400',
  display: 'swap',
});

// Alternative: Single font file
export const brandFont = localFont({
  src: '../../public/fonts/BrandFont.woff2',
  variable: '--font-brand',
  weight: '100 900', // Variable font weight range
  display: 'swap',
});

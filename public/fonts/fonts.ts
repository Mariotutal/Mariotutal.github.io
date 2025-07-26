import localFont from 'next/font/local';

// Simple Satoshi Variable Font setup using only files we have
export const satoshi = localFont({
  src: [
    {
      path: './Satoshi-Variable.woff2',
      weight: '300 900',
      style: 'normal',
    },
    {
      path: './Satoshi-VariableItalic.woff2',
      weight: '300 900',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
});

// Fallback using static files we actually have
export const satoshiStatic = localFont({
  src: [
    {
      path: './Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi-static',
  display: 'swap',
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'sans-serif',
  ],
});

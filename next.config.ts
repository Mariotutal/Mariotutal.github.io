import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '',
  assetPrefix: '',
  // Development configuration
  ...(process.env.NODE_ENV === 'development' && {
    allowedDevOrigins: ['10.17.177.95', 'localhost', '127.0.0.1'],
  }),
};

export default nextConfig;

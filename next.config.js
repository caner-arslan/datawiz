/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  images: { 
    unoptimized: true,
  },
  
  // Performance optimizations
  swcMinify: true,
  
  // Disable ALL server features for static export
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  

};

module.exports = nextConfig;



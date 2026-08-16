/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: '[IP_ADDRESS]',
      },
    ],
  },
  allowedDevOrigins: ['*'],
  
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.ashyo.fullstackdev.uz',
        port: '',
        pathname: '/uploads/**',
        search: '',
      },
      {
        protocol: 'http', 
        hostname: 'localhost',
        port: '3010', 
        pathname: '/uploads/**', 
      },
    ],
  },
};

module.exports = nextConfig;

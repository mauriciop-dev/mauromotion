/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['localhost', 'gi5rxzv6.us-east.insforge.app'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    NEXT_PUBLIC_ENGINE_URL: process.env.NEXT_PUBLIC_ENGINE_URL || 'http://localhost:8000',
    NEXT_PUBLIC_INSFORGE_URL: 'https://gi5rxzv6.us-east.insforge.app',
  },
  redirects() {
    return [];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://gi5rxzv6.us-east.insforge.app/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
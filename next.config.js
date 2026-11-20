/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'gi5rxzv6.us-east.insforge.app'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    NEXT_PUBLIC_ENGINE_URL: process.env.NEXT_PUBLIC_ENGINE_URL || 'http://localhost:8000',
    NEXT_PUBLIC_INSFORGE_URL: 'https://gi5rxzv6.us-east.insforge.app',
  },
};

module.exports = nextConfig;
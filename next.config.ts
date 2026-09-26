import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // In dev, /api/* goes to the local FastAPI server (npm run dev:api). On Vercel, vercel.json routes it to api/index.py.
  async rewrites() {
    if (process.env.NODE_ENV !== 'development') return [];
    return [{ source: '/api/:path*', destination: `${process.env.API_DEV_URL ?? 'http://127.0.0.1:8000'}/api/:path*` }];
  },
};

export default nextConfig;

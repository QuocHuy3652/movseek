import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['image.tmdb.org', 'img.clerk.com'], // Thêm domain của ảnh
    unoptimized: true,
  },
};

export default nextConfig;

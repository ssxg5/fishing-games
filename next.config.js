/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['example.com'],
    unoptimized: true,
  },
  output: 'export',
  basePath: '/fishing-games',
  assetPrefix: '/fishing-games/',
};

module.exports = nextConfig; 
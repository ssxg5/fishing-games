/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  basePath: '/fishing-games',
  trailingSlash: true,
};

module.exports = nextConfig; 
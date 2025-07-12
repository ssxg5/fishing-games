/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/fishing-games',
  assetPrefix: '/fishing-games/',
  trailingSlash: true,
}

module.exports = nextConfig 
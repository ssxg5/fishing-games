/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/fishing-games' : '',
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 基础性能优化配置
  swcMinify: true,
  compress: true,
  
  // 实验性优化 (移除了 optimizeCss 以避免 critters 错误)
  experimental: {
    optimizePackageImports: ['styled-components'],
  },
  
  // Webpack 优化
  webpack: (config, { buildId, dev, isServer, webpack }) => {
    // 生产环境优化
    if (!dev && !isServer) {
      // 启用更好的代码分割
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
      
      // Tree shaking 优化
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    // 别名配置，提高构建速度
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    
    return config;
  },
  
  // 生产环境额外优化
  ...(process.env.NODE_ENV === 'production' && {
    // 移除 console.log
    compiler: {
      removeConsole: true,
    },
  }),
};

module.exports = nextConfig; 
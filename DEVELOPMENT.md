# 开发技术细节文档

本文档记录了项目开发过程中的技术细节、最佳实践和解决方案。

## 开发环境配置

### VSCode 推荐扩展
```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "styled-components.vscode-styled-components",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### ESLint 配置
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Prettier 配置
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## styled-components 配置

### 1. _document.tsx 配置
```typescript
import Document, { DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }
}
```

### 2. 主题配置
```typescript
// src/styles/theme.ts
import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: '#0070f3',
    secondary: '#0070f3',
    background: '#ffffff',
    text: '#000000',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
  },
};
```

## 性能优化实践

### 1. 图片优化
```typescript
// 使用 Next.js Image 组件的最佳实践
import Image from 'next/image';

const OptimizedImage: React.FC<ImageProps> = ({ src, alt, ...props }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={props.width || 300}
      height={props.height || 200}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      {...props}
    />
  );
};
```

### 2. 组件优化
```typescript
// 使用 React.memo 优化组件
const MemoizedComponent = React.memo(({ prop1, prop2 }) => {
  return (
    // 组件内容
  );
}, (prevProps, nextProps) => {
  // 自定义比较逻辑
  return prevProps.prop1 === nextProps.prop1;
});

// 使用 useMemo 优化计算
const memoizedValue = useMemo(() => {
  return expensiveComputation(prop1, prop2);
}, [prop1, prop2]);
```

## 安全实践

### 1. CSP 配置
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      frame-src 'self' https://*.trusted-domain.com;
    `
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 2. iframe 安全配置
```typescript
const SecureIframe: React.FC<IframeProps> = ({ src, title }) => {
  return (
    <iframe
      src={src}
      title={title}
      sandbox="allow-scripts allow-same-origin"
      referrerPolicy="no-referrer"
      loading="lazy"
      style={{ border: 0 }}
    />
  );
};
```

## 错误处理

### 1. 全局错误处理
```typescript
// pages/_app.tsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>出错了：</p>
      <pre>{error.message}</pre>
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
```

### 2. API 错误处理
```typescript
// utils/api.ts
export async function fetchWithErrorHandling(url: string, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API 请求失败:', error);
    throw error;
  }
}
```

## 测试策略

### 1. 组件测试
```typescript
// __tests__/components/GameFrame.test.tsx
import { render, screen } from '@testing-library/react';
import GameFrame from '@/components/GameFrame';

describe('GameFrame', () => {
  it('renders iframe with correct props', () => {
    render(<GameFrame gameUrl="https://example.com" title="Test Game" />);
    const iframe = screen.getByTitle('Test Game');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://example.com');
  });
});
```

### 2. 集成测试
```typescript
// cypress/integration/game.spec.ts
describe('Game Page', () => {
  it('loads game successfully', () => {
    cy.visit('/games/test-game');
    cy.get('iframe').should('be.visible');
    cy.get('h1').should('contain', 'Test Game');
  });
});
```

## 部署检查清单

### 1. 构建前检查
- [ ] 所有依赖都已更新到最新稳定版本
- [ ] 环境变量配置正确
- [ ] TypeScript 类型检查通过
- [ ] ESLint 检查通过
- [ ] 测试用例全部通过

### 2. 构建后检查
- [ ] 静态资源路径正确
- [ ] 页面路由正常工作
- [ ] 图片加载正常
- [ ] 性能指标达标
- [ ] 控制台无错误信息

### 3. 部署后检查
- [ ] HTTPS 证书有效
- [ ] CSP 策略生效
- [ ] 跨域资源正常加载
- [ ] 缓存策略正确
- [ ] 监控系统正常运行

## 常见问题解决方案

### 1. styled-components 样式闪烁
```typescript
// pages/_document.tsx 中确保添加了服务端渲染支持
// 参考上面的 _document.tsx 配置
```

### 2. 图片路径问题
```typescript
// next.config.js
module.exports = {
  basePath: '/your-repo-name',
  images: {
    domains: ['your-image-domain.com'],
    unoptimized: true, // 用于静态导出
  },
};
```

### 3. 跨域问题
```typescript
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
};
```

## 维护指南

### 1. 依赖更新
```bash
# 检查过期依赖
npm outdated

# 更新依赖
npm update

# 对于主要版本更新
npm install package@latest
```

### 2. 性能监控
```typescript
// utils/analytics.ts
export function reportWebVitals(metric) {
  console.log(metric);
  // 发送到分析服务
}
```

### 3. 错误监控
```typescript
// utils/errorTracking.ts
export function initErrorTracking() {
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('全局错误:', { message, source, lineno, colno, error });
    // 发送到错误跟踪服务
  };
}
```

## 代码审查清单

### 1. 代码质量
- [ ] 遵循 TypeScript 最佳实践
- [ ] 组件职责单一
- [ ] 适当的代码注释
- [ ] 遵循命名规范
- [ ] 避免代码重复

### 2. 性能考虑
- [ ] 合理使用 React.memo
- [ ] 优化渲染性能
- [ ] 合理的依赖项列表
- [ ] 避免不必要的重渲染
- [ ] 图片优化

### 3. 安全性
- [ ] 输入验证
- [ ] XSS 防护
- [ ] CSRF 防护
- [ ] 安全的第三方集成
- [ ] 敏感信息保护 
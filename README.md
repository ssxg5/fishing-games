# Next.js 游戏网站开发指南

本文档详细记录了使用 Next.js 开发游戏网站的完整流程、最佳实践和注意事项。

## 目录

- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [开发流程](#开发流程)
- [组件设计](#组件设计)
- [部署指南](#部署指南)
- [性能优化](#性能优化)

## 技术栈

- Next.js（最新稳定版）
- TypeScript
- styled-components
- GitHub Pages 部署

## 项目结构

```
src/
  ├── components/     # 可复用组件
  │   └── GameFrame.tsx  # 游戏安全加载框架
  ├── pages/         # 页面组件
  │   ├── index.tsx     # 首页
  │   └── games/[id].tsx # 游戏详情页
  ├── styles/        # 样式文件
  │   └── globals.css   # 全局样式
  ├── types/         # TypeScript 类型定义
  │   └── styled.d.ts   # styled-components 类型
  └── data/          # 数据文件
      └── games.ts      # 游戏数据
public/
  └── images/        # 静态资源
```

## 开发流程

### 1. 初始化项目

```bash
# 创建项目
npx create-next-app@latest 项目名 --typescript --tailwind --eslint
cd 项目名

# 安装核心依赖
npm install styled-components @types/styled-components

# 创建基础文件结构
mkdir -p src/{components,pages,styles,types,data}
mkdir -p public/images
```

### 2. 配置文件设置

#### next.config.js
```javascript
const nextConfig = {
  basePath: '/项目名',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
```

#### GitHub Actions 部署配置 (.github/workflows/deploy.yml)
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run export
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 组件设计

### 1. GameFrame 组件
```typescript
interface GameFrameProps {
  gameUrl: string;
  title: string;
}

const GameFrame: React.FC<GameFrameProps> = ({ gameUrl, title }) => {
  return (
    <StyledGameFrame>
      <iframe
        src={gameUrl}
        title={title}
        sandbox="allow-scripts allow-same-origin"
        loading="lazy"
      />
    </StyledGameFrame>
  );
};
```

### 2. 游戏数据类型
```typescript
interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gameUrl: string;
  tags: string[];
}
```

### 3. styled-components 主题类型
```typescript
// src/types/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }
}
```

## 部署指南

### 部署前检查清单

1. 运行构建确保无错误
```bash
npm run build
```

2. 检查配置
- 确认 next.config.js 中的 basePath 设置正确
- 验证所有静态资源路径
- 检查跨域设置

3. 部署命令
```bash
npm run export  # 生成静态文件
```

### GitHub Pages 设置

1. 在仓库设置中启用 GitHub Pages
2. 选择 gh-pages 分支作为部署源
3. 等待 GitHub Actions 完成部署
4. 访问 https://[用户名].github.io/[仓库名] 验证部署

## 性能优化

### 1. 图片优化
- 使用 Next.js Image 组件
- 设置适当的图片尺寸
- 添加 priority 属性到首屏图片

### 2. 代码优化
- 组件懒加载
- 路由预加载
- 合理使用 useMemo 和 useCallback

### 3. SEO 优化
- 添加 meta 标签
- 使用语义化 HTML
- 实现动态标题和描述

## 安全性考虑

### 1. iframe 安全
- 使用 sandbox 属性限制权限
- 设置适当的 CSP 策略
- 验证游戏源的安全性

### 2. 资源安全
- 使用 HTTPS
- 实现适当的错误处理
- 添加加载状态提示

## 常用开发命令

```bash
npm run dev     # 开发环境
npm run build   # 构建项目
npm run export  # 静态导出
npm run lint    # 代码检查
```

## 注意事项

1. 开发过程中的常见问题：
   - styled-components 服务端渲染配置
   - 图片路径需要考虑 basePath
   - iframe 跨域问题处理

2. 性能优化建议：
   - 合理使用 React.memo
   - 避免不必要的重渲染
   - 优化大型列表渲染

3. 部署注意事项：
   - 确保所有依赖都已安装
   - 检查环境变量配置
   - 验证构建输出

## 维护和更新

1. 定期更新依赖包
2. 监控网站性能
3. 收集用户反馈
4. 根据需求迭代功能

## 问题排查

### 常见问题及解决方案

1. 样式闪烁
   - 确保 styled-components 配置正确
   - 检查 _document.tsx 配置

2. 图片加载失败
   - 检查图片路径是否正确
   - 验证 next.config.js 配置

3. 部署失败
   - 检查 GitHub Actions 配置
   - 验证构建命令
   - 确认权限设置

## 结语

本文档将持续更新，如有问题或建议，请及时反馈。在开始新项目时，可以参考本文档快速搭建基础框架，避免重复工作。 
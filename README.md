# 钓鱼游戏聚合平台

一个使用Next.js构建的HTML5钓鱼游戏聚合网站。

## 功能特点

- 多个钓鱼游戏集成
- 响应式设计
- 游戏加载状态显示
- 安全的iframe集成
- SEO优化

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Styled Components
- ESLint

## 开始使用

1. 克隆项目
```bash
git clone [repository-url]
cd fishing-game-hub
```

2. 安装依赖
```bash
npm install
```

3. 运行开发服务器
```bash
npm run dev
```

4. 构建生产版本
```bash
npm run build
npm start
```

## 项目结构

```
fishing-game-hub/
├── src/
│   ├── components/    # React组件
│   ├── pages/         # Next.js页面
│   ├── styles/        # 全局样式
│   └── types/         # TypeScript类型定义
├── public/            # 静态资源
└── package.json       # 项目配置
```

## 添加新游戏

1. 在`src/pages/index.tsx`中的`games`数组添加新游戏信息
2. 确保游戏URL支持iframe嵌入
3. 添加游戏预览图到`public/images/`目录

## 安全说明

- 所有游戏iframe都使用sandbox属性
- 配置了Content Security Policy
- 实现了跨域安全措施

## 许可证

MIT 
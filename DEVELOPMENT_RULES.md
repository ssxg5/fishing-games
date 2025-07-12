# 开发规则和注意事项

## 1. 项目核心目标
- 构建一个钓鱼游戏集合网站
- 部署在 GitHub Pages: https://ssxg5.github.io/fishing-games
- 使用 Next.js + TypeScript + styled-components 技术栈
- 专注于游戏整合，而不是游戏开发

## 2. 开发流程规范

### 2.1 代码变更流程
✅ 正确流程：
- 本地修改代码
- git add/commit 提交更改
- git push 推送到 GitHub
- 等待 GitHub Actions 自动部署
- 验证 GitHub Pages 上的更改

❌ 错误做法：
- 不要运行 npm run dev（我们不做本地开发服务器测试）
- 不要创建新的项目结构（项目已经创建完成）
- 不要修改已确认工作的配置

### 2.2 游戏整合流程
✅ 正确流程：
- 在 public/games/ 目录下添加游戏文件
- 更新 src/data/games.ts 添加游戏信息
- 确保所有资源路径正确（注意 GitHub Pages 的 basePath）
- 提交并推送到 GitHub

❌ 错误做法：
- 不要试图从 raw.githubusercontent.com 加载游戏
- 不要重新开发游戏（我们是整合已有游戏）
- 不要修改游戏源代码（除非必要的路径适配）

## 3. 项目结构规范

### 3.1 目录结构
```
public/
  └── games/
      └── [game-name]/
          ├── index.html
          ├── js/
          ├── css/
          └── assets/

src/
  ├── components/
  │   └── GameFrame.tsx
  ├── pages/
  │   └── games/
  ├── styles/
  ├── types/
  └── data/
      └── games.ts
```

### 3.2 关键文件说明
- next.config.js: 包含 GitHub Pages 部署配置
- src/data/games.ts: 游戏元数据配置
- src/components/GameFrame.tsx: 游戏加载框架
- .github/workflows/deploy.yml: 自动部署配置

## 4. 部署注意事项

### 4.1 路径处理
✅ 正确配置：
- 生产环境：basePath = '/fishing-games'
- 资源路径：以 /fishing-games 开头
- 本地资源：存放在 public 目录下

❌ 常见错误：
- 使用绝对路径而不是相对路径
- 忘记添加 basePath 前缀
- 使用外部资源链接

### 4.2 部署流程
1. 代码推送到 main 分支
2. GitHub Actions 自动触发
3. 构建并部署到 gh-pages 分支
4. 自动发布到 GitHub Pages

## 5. 性能优化准则

### 5.1 资源优化
- 压缩游戏资源文件
- 使用 CDN 加载第三方资源
- 实现懒加载策略

### 5.2 用户体验
- 添加加载状态提示
- 优化错误处理
- 确保响应式设计

## 6. 安全性考虑

### 6.1 游戏加载
- 使用适当的 sandbox 属性
- 实现 CSP 策略
- 验证游戏源文件完整性

### 6.2 数据处理
- 不存储敏感信息
- 实现适当的错误边界
- 保护用户数据隐私

## 7. 工作效率提升建议

### 7.1 开发前检查清单
- [ ] 确认任务是否涉及新游戏添加
- [ ] 检查游戏文件是否已存在
- [ ] 验证游戏许可证和使用权限
- [ ] 确认所有必要资源是否齐全

### 7.2 提交前检查清单
- [ ] 确认所有文件路径正确
- [ ] 验证游戏元数据配置
- [ ] 检查 git 暂存区文件
- [ ] 编写清晰的提交信息

### 7.3 部署后检查清单
- [ ] 验证网站可访问性
- [ ] 测试游戏是否正常加载
- [ ] 检查资源是否正确加载
- [ ] 验证响应式布局

## 8. 问题追踪和解决

### 8.1 常见问题
1. 游戏无法加载
   - 检查文件路径
   - 验证资源完整性
   - 确认 CORS 配置

2. 样式问题
   - 检查 CSS 引用
   - 验证响应式设计
   - 确认主题配置

3. 部署问题
   - 检查 GitHub Actions 日志
   - 验证构建输出
   - 确认分支配置

### 8.2 调试流程
1. 检查 GitHub Actions 构建日志
2. 验证部署后的文件结构
3. 测试游戏功能和交互
4. 记录并修复发现的问题 
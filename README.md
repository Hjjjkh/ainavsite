# AI Nav Site

> 精选 AI 工具和资源聚合导航 - 让 AI 触手可及

[![Nuxt](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxtdotjs)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

![AI Nav Site Preview](/public/preview.png)

---

## 📖 项目简介

AI Nav Site 是一个现代化的 AI 工具导航网站，精心 curation 了各类优质 AI 工具和服务，帮助开发者、创作者和企业和快速找到适合的 AI 解决方案。

✨ **特色功能：**
- 🏷️ **分类浏览** - 按场景/行业/工具类型智能分类
- 🔍 **搜索过滤** - 快速定位目标工具
- 📊 **详细展示** - 包含工具描述、定价、链接等完整信息
- 🌐 **响应式设计** - 完美适配桌面和移动端
- 🎨 **现代UI** - 基于 Tailwind CSS 的精致界面

---

## 🚀 快速开始

### 前置要求
- Node.js 18+
- npm / yarn / pnpm

### 安装依赖
\`\`\`bash
npm install
# 或
yarn install
# 或
pnpm install
\`\`\`

### 本地开发
\`\`\`bash
npm run dev
# 访问 http://localhost:3000
\`\`\`

### 构建生产版本
\`\`\`bash
npm run build
npm run start
\`\`\`

---

## 🏗️ 项目结构

\`\`\`
ainavsite/
├── assets/          # 静态资源
├── components/      # Vue 组件
│   ├── common/      # 通用组件
│   ├── business/    # 业务组件
│   └── layout/      # 布局组件
├── composables/     # 组合式函数
├── layouts/         # 页面布局
├── pages/           # 页面路由
├── public/          # 公共资源
├── router/          # 路由配置
├── stores/          # Pinia stores
├── types/           # TypeScript 类型定义
├── utils/           # 工具函数
├── nuxt.config.ts   # Nuxt 配置
└── package.json     # 依赖管理
\`\`\`

---

## 🔧 核心配置

### 环境变量
复制 \`.env.example\` 为 \`.env\` 并配置：
\`\`\`env
NUXT_PUBLIC_API_BASE_URL=
NUXT_PUBLIC_SITE_TITLE=AI Nav Site
\`\`\`

### Nuxt 配置
主要配置项在 \`nuxt.config.ts\` 中：
- 模块引入
- 构建优化
- 运行时配置

---

## 📦 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **Nuxt 3** | 3.x | 全栈框架 |
| **Vue 3** | 3.x | UI 库 |
| **TypeScript** | 5.x | 类型系统 |
| **Tailwind CSS** | 3.x | 样式框架 |
| **Vite** | 5.x | 构建工具 |
| **Pinia** | 2.x | 状态管理 |

---

## 🤝 贡献指南

我们欢迎社区贡献！请遵循以下流程：

1. Fork 本仓库
2. 创建特性分支 (\`git checkout -b feature/AmazingFeature\`)
3. 提交更改 (\`git commit -m 'feat: add amazing feature'\`)
4. 推送到分支 (\`git push origin feature/AmazingFeature\`)
5. 开启 Pull Request

详细规范请参阅 [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---

## 🙏 致谢

- 感谢所有为 AI 生态做出贡献的开发者和研究机构
- 基于 [Nuxt.js](https://nuxt.com) 构建
- 使用了 [Tailwind CSS](https://tailwindcss.com) 样式框架

---

## 📮 联系方式

- 项目主页: https://github.com/Hjjjkh/ainavsite
- 在线演示: [即将上线]
- 问题反馈: [GitHub Issues](https://github.com/Hjjjkh/ainavsite/issues)

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Hjjjkh">李国强</a>
</div>

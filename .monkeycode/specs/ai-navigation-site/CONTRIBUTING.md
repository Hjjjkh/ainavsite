# Contributing to AI Navigation Site

感谢你关注 AI Navigation Site 项目！我们欢迎各种形式的贡献。

## 开发规范

### 1. 命名规范
- 遵循 Ears + PascalCase 命名
- 文件名：`user-story.md`、`tasklist.md`
- 组件名：`UserStory.vue`、`TaskList.vue`

### 2. Git 工作流
- 分支命名：`feature/功能模块`（如 `feature/category-browsing`）
- Commit Message：遵循 Conventional Commits 规范
- 提交前：拉取最新代码，解决冲突

### 3. 代码风格
- 遵循 ESLint 规则（`eslint:recommended`）
- 使用 Prettier 进行格式化（`prettier --write`）
- 组件命名：使用 PascalCase
- 变量命名：camelCase

### 4. 文档维护
- 及时更新 README.md
- 重大变更更新 CONTRIBTING.md

### 5. Issue 规范
- 使用 Issue Template
- 标记 Issue Labels（如 `feature`、`bug`、`documentation`）
- 描述清晰明了

## 开发流程

### 1. 1. Fork 项目
```bash
git clone https://github.com/Hjjjkh/ainavsite.git
cd ainavsite
git checkout -b develop
```

### 2. 选择任务
- 从 Task List 中选择未完成的任务
- 优先处理 P0 和 P1 任务

### 3. 开发环境
```bash
pnpm install
pnpm dev
```

### 4. 提交 PR
```bash
git checkout -b feature/my-feature
git add .
git commit -m "feat: add my feature"
git push origin feature/my-feature
```

## 项目架构

```
workspace/
├── .monkeycode/
│   └── specs/
│       └── ai-navigation-site/
│           ├── requirements.md    # 需求文档
│           ├── design.md          # 技术设计
│           └── tasklist.md        # 任务列表
├── src/
│   ├── components/
│   │   ├── common/         # 通用组件
│   │   ├── business/       # 业务组件
│   │   └── layout/         # 布局组件
│   ├── views/            # 页面组件
│   ├── stores/             # 状态管理
│   ├── types/             # TypeScript 类型定义
│   ├── composables/        # 组合式函数
│   ├── api/               # API 封装
│   ├── utils/             # 工具函数
│   ├── assets/            # 资源文件
│   └── styles/            # 全局样式
├── pages/               # 页面组件（Nuxt 3 File Routing）
├── plugins/              # Nuxt 插件
├── app.vue             # 应用根组件
└── nuxt.config.ts          # Nuxt 配置
```

## 接口定义

```typescript
// pages/index.vue - 首页
interface HomePageProps {
  title?: string
  description?: string
}

// components/common/ToolCard.vue - 工具卡片
interface ToolCardProps {
  tool: Tool
  showFavorite?: boolean
  showCompare?: boolean
}

// types/tool.ts - 工具类型
interface Tool {
  id: string
  name: string
  description: string
  website: string
  icon: string
  category: string
  tags: string[]
  category: Category
  createdAt: Date
  updatedAt: Date
}

// types/category.ts - 分类类型
interface Category {
  src/types/category.ts - 分类类型
interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  parentId?: string
  order: number
  toolCount: number
  createdAt: Date
  updatedAt: Date
}
```

## 开发技巧

### 1. TypeScript 最佳实践
```typescript
// ✅ 使用 interface 定义所有 Props
interface Props {
  data: {
    id: string
    items: string[]
  }
}

// ✅ 使用 type 替代 any
const fetchData = async (): Promise<Data> => { ... }

// ✅ 使用 const 断言
const result: Data = {
  id: 'tool-1',
  name: 'AI Tool',
  count: 50
}
```

### 2. Vue 3 最佳实践
```vue
<!-- ✅ 使用 setup script -->
<script setup lang="ts">
import { ref, computed } from 'vue'

// ✅ 使用组合式 API
const tools = ref<Tool[]>([])
const totalCount = computed(() => tools.value.length)

// ✅ 响应式设计
const isMobile = computed(() => window.innerWidth < 768)
</script>
```

### 3. Tailwind CSS 最佳实践
```vue
<!-- ✅ 使用原子化 CSS -->
<template>
  <div class="grid grid-cols-4 gap-6">
    <div class="tool-card">Tool</div>
</template>

<style scoped>
/* ✅ 使用 Tailwind 实用类 */
.grid {
  @apply grid grid-cols-4;
  @apply gap-6;
}
.tool-card {
  @apply bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg;
}
</style>
```

### 4. Pinia 最佳实践
```typescript
// stores/tool.ts
import { defineStore } from 'pinia'

export const useToolStore = defineStore('tools', () => {
  state: () => ({
    tools: [] as Tool[],
    loading: false as boolean
    error: null as string | null
  }),

  actions: {
    async fetchTools() {
      this.loading = true
      this.error = null
      try {
        // Fetch from API
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
```

### 5. Nuxt.js 最佳实践
```typescript
// pages/index.vue - 首页
<script setup lang="ts">
import { useHead } from '@nuxtjs/composables/useHead'

// ✅ 使用 useHead
useHead({
  title: 'AI Navigation Site - AI 工具导航平台',
  meta: [
    {
      name: 'description',
      content: '发现最优质的 AI 工具和资源'
    },
    {
      name: 'keywords',
      content: 'AI tools, AI navigation, AI directory, AI tools discovery'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'robots',
      content: 'index, follow'
    }
  ]
})
</script>
```

## 常见问题

### 1. 如何添加新工具？
```bash
# 方法 1：通过管理后台添加
1. 登录后台
2. 点击"添加工具"
3. 填写工具信息
4. 提交审核

# 方法 2：通过用户提交
1. 点击"提交工具"
2. 填写表单
3. 等待审核
```

### 2. 如何修改分类？
```bash
# 方法 1：通过管理后台
1. 登录后台
2. 进入"分类管理"
3. 修改分类信息
4. 保存更改
```

### 3. 如何添加广告？
```typescript
// plugins/adsense.ts
export default defineNuxtPlugin(() => {
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/ad-sense'
  ],

  app.vue
    setup() {
    useHead({
      script: [
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
          async: true,
        data-ad-client: 'ca-pub-9625258278262-2990'
        }
      ]
    })
  }
})
```

### 4. 如何添加评论？
```typescript
// stores/comment.ts
export const useCommentStore = defineStore('comments', () => ({
  state: () => ({
    comments: [] as Comment[],
    loading: false as boolean
    error: null as string | null
  }),
  actions: {
    async addComment(toolId: string, comment: string, userId: string) {
      this.loading = true
      try {
        // TODO: 提交到后端
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
})
```

## 性能优化清单

- [x] 首页首屏渲染 < 2s
- [ ] 图片懒加载和优化
- [ ] 虚拟滚动（大数据集）
- [ ] CDN 加速静态资源
- [ ] API 响应 < 200ms
- [ ] 交互响应 < 100ms
- [ ] 首页大小 < 500KB

## 安全清单

- [x] SQL 注入防护
- [x] XSS 防护（使用 DOMPurify）
- [ ] CSRF 防护（Token 验证）
- [ ] 密码加密（bcrypt）
- [ ] 登录失败锁定
- [ ] HTTPS 配置
- [ ] 敏感信息保护

## SEO 清单

- [x] Meta 标签（标题、描述、关键词）
- [ ] 结构化数据（JSON-LD）
- [ ] 站点地图
- [ ] Open Graph 标签
- [ ] 规范化 URL
- [ ] 移动端适配

## 可访问性清单

- [x] ARIA 标签
- [ ] 键盘导航
- [ ] 屏幕阅读器支持
- [ ] 对比度 4.5:1
- [ ] 聚焦可见
- [ ] 表单标签
- [ ] 错误提示

## 测试清单

- [ ] 单元测试
- [ ] 集成测试
- [ ] E2E 测试
- [ ] 端到端测试
- [ ] 性能测试
- [ ] 安全性测试
- [ ] 可访问性测试
- [ ] SEO 测试

## Git 工作流

```bash
# 开发分支
git checkout -b feature/feature-name

# 1. 开发功能
git checkout -b 1.3
git checkout -b 1.2
git checkout -b 1.1

# 2. 提交代码
git add .
git commit -m "feat: complete feature 1.3"
git push origin 1.3

# 3. 合并代码
git checkout develop
git merge feature/feature-name
git push origin develop
```

## 发布流程

1. 更新版本号
2. 创建 Release Note
3. 创建 Git Tag
4. 推送到 NPM
5. 发布 GitHub Release

## 注意事项

- 所有代码必须通过 ESLint 检查
- 所有测试必须通过
- 所有 Commit Message 必须清晰明确
- 合并前必须确保代码审查通过

## 联系方式

- Email: support@ainavsite.com
- Discord: [加入社区](https://discord.gg/ainavsite)
- GitHub: [创建 Issue](https://github.com/Hjjjkh/ainavsite/issues)

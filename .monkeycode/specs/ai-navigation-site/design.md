# AI Navigation Site - Design Document

Feature Name: ai-navigation-site
Updated: 2026-02-11

## Description

AI 导航站是一个集中展示和管理各类 AI 工具的网站平台。该平台提供 AI 工具的分类浏览、搜索、详情展示、用户提交等功能，旨在帮助用户快速发现和访问高质量的 AI 工具和资源。项目采用现代化的技术栈，注重工程化架构、代码质量和用户体验，同时支持 Google AdSense 广告收益模式。

本设计文档基于用户需求讨论，融合了开源项目的优秀实践，采用模块化、组件化的工程化架构。

## Architecture

### 系统架构

```mermaid
graph TB
    User[用户] --> Browser[浏览器]
    Browser --> Frontend[前端应用]
    Frontend --> API[API 层]
    API --> DataLayer[数据层]

    Frontend --> Components[组件层]
    Components --> UI[UI 组件库]

    DataLayer --> LocalStorage[本地存储]
    DataLayer --> RemoteAPI[远程 API]

    RemoteAPI --> AdminBackend[管理后台]
    RemoteAPI --> ContentAPI[内容 API]

    AdminBackend --> Database[(数据库)]
    ContentAPI --> StaticData[静态数据]

    User --> AdSense[Google AdSense]
    AdSense --> AdNetwork[广告网络]
```

### 前端架构

```mermaid
graph LR
    App[Vue 3 应用] --> Router[Vue Router]
    App --> Store[Pinia Store]
    App --> Components[组件]
    App --> Utils[工具函数]

    Router --> Pages[页面组件]
    Pages --> Layouts[布局组件]
    Pages --> Views[视图组件]

    Components --> Common[通用组件]
    Common --> Button[按钮]
    Common --> Card[卡片]
    Common --> Modal[模态框]
    Common --> Form[表单]

    Components --> Business[业务组件]
    Business --> ToolCard[工具卡片]
    Business --> CategoryCard[分类卡片]
    Business --> SearchBox[搜索框]
    Business --> AdBanner[广告横幅]
    Business --> ThemeToggle[主题切换]

    Store --> Modules[Store 模块]
    Modules --> ToolStore[工具 Store]
    Modules --> UserStore[用户 Store]
    Modules --> ConfigStore[配置 Store]
```

### 目录结构

```
ai-navigation-site/
├── public/                    # 静态资源
│   ├── images/               # 图片资源
│   ├── icons/                # 图标资源
│   └── ads/                  # 广告配置
├── src/
│   ├── assets/               # 资源文件
│   │   ├── styles/          # 全局样式
│   │   └── constants/       # 常量定义
│   ├── components/           # 可复用组件
│   │   ├── common/          # 通用组件
│   │   ├── business/        # 业务组件
│   │   └── layout/          # 布局组件
│   ├── views/                # 页面组件
│   ├── router/               # 路由配置
│   ├── stores/               # 状态管理
│   ├── api/                  # API 封装
│   ├── utils/                # 工具函数
│   ├── types/                # TypeScript 类型
│   ├── composables/          # 组合式函数
│   ├── app.vue              # 根组件
│   └── main.ts              # 入口文件
├── data/                     # 数据文件（初始数据）
│   ├── tools.json           # 工具数据
│   ├── categories.json      # 分类数据
│   └── reviews.json         # 评测数据
├── config/                   # 配置文件
│   ├── vite.config.ts       # Vite 配置
│   ├── tailwind.config.ts   # Tailwind 配置
│   └── tsconfig.json        # TypeScript 配置
├── .eslintrc.cjs            # ESLint 配置
├── .prettierrc              # Prettier 配置
├── package.json             # 项目依赖
└── README.md                # 项目说明
```

## Components and Interfaces

### 核心组件

#### 1. ToolCard（工具卡片）

**Props:**
```typescript
interface ToolCardProps {
  tool: Tool;
  showFavorite?: boolean;
  showCompare?: boolean;
}
```

**Events:**
```typescript
interface ToolCardEmits {
  (e: 'click', tool: Tool): void;
  (e: 'favorite', tool: Tool): void;
  (e: 'compare', tool: Tool): void;
}
```

**功能:**
- 展示工具图标、名称、描述、标签
- 收藏按钮
- 加入对比按钮
- 点击跳转详情页

#### 2. SearchBox（搜索框）

**Props:**
```typescript
interface SearchBoxProps {
  placeholder?: string;
  autoFocus?: boolean;
}
```

**Events:**
```typescript
interface SearchBoxEmits {
  (e: 'search', query: string): void;
  (e: 'suggestion-click', tool: Tool): void;
}
```

**功能:**
- 实时搜索（200ms 内）
- 历史搜索记录
- 热门搜索推荐

#### 3. AdBanner（广告横幅）

**Props:**
```typescript
interface AdBannerProps {
  adUnitId: string;
  size: 'leaderboard' | 'banner' | 'rectangle' | 'skyscraper';
  slot?: string;
}
```

**功能:**
- Google AdSense 广告展示
- 响应式尺寸
- 广告加载状态处理

#### 4. ThemeToggle（主题切换）

**Props:**
```typescript
interface ThemeToggleProps {
  position?: 'header' | 'floating';
}
```

**功能:**
- 亮色/暗色模式切换
- 主题偏好持久化
- 平滑过渡动画

### API 接口

#### 工具 API

```typescript
interface ToolsAPI {
  // 获取工具列表
  getTools(params: {
    category?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<Tool[]>;

  // 获取工具详情
  getTool(id: string): Promise<Tool>;

  // 获取热门工具
  getHotTools(limit?: number): Promise<Tool[]>;

  // 获取推荐工具
  getRecommendedTools(userId?: string): Promise<Tool[]>;

  // 获取相似工具
  getSimilarTools(toolId: string): Promise<Tool[]>;
}
```

#### 分类 API

```typescript
interface CategoriesAPI {
  // 获取所有分类
  getCategories(): Promise<Category[]>;

  // 获取分类详情
  getCategory(id: string): Promise<Category>;

  // 获取分类下的工具
  getToolsByCategory(categoryId: string): Promise<Tool[]>;
}
```

#### 提交 API

```typescript
interface SubmitAPI {
  // 提交工具
  submitTool(tool: Omit<Tool, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean>;

  // 提交评论
  submitComment(comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean>;

  // 提交评分
  submitRating(toolId: string, rating: number): Promise<boolean>;
}
```

## Data Models

### Tool（工具）

```typescript
interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  fullDescription?: string;
  icon: string;
  website: string;
  category: string;
  tags: string[];
  pricing: {
    free: boolean;
    plans: Plan[];
  };
  rating: {
    average: number;
    count: number;
  };
  features: string[];
  screenshots?: string[];
  video?: string;
  reviews?: Review[];
  alternatives?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Plan {
  name: string;
  price: number;
  currency: string;
  period: string;
  features: string[];
}

interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  pros: string[];
  cons: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Category（分类）

```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  parentId?: string;
  order: number;
  toolCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Comment（评论）

```typescript
interface Comment {
  id: string;
  toolId: string;
  author: string;
  email?: string;
  content: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### User（用户）

```typescript
interface User {
  id: string;
  favorites: string[];
  history: string[]; // 浏览历史（工具 ID 列表）
  theme: 'light' | 'dark';
  createdAt: Date;
  updatedAt: Date;
}
```

## Correctness Properties

### 数据一致性

1. **工具数据完整性**：每个工具必须包含 id、name、description、website、category 等必填字段
2. **分类层级正确性**：子分类的 parentId 必须指向有效的父分类
3. **评分计算准确性**：平均评分必须基于所有用户评分的算术平均值
4. **收藏数据同步**：用户收藏列表必须在所有视图间保持一致
```

### 状态管理

1. **主题切换一致性**：主题状态必须在所有组件间同步
2. **搜索结果准确性**：搜索结果必须匹配用户输入的关键词
3. **推荐算法公平性**：推荐算法不应歧视任何工具
4. **缓存更新及时性**：当数据变更时，缓存必须在合理时间内更新
```

### 用户体验

1. **页面加载性能**：首屏加载时间不超过 3 秒
2. **交互响应时间**：用户操作响应时间不超过 100ms
3. **错误处理友好性**：所有错误都必须有友好的用户提示
4. **跨设备一致性**：在不同设备上功能和行为必须保持一致
```

### 错误处理

### 网络错误

1. **API 请求失败**：
    - 显示友好的错误提示
    - 提供重试按钮
    - 记录错误日志

2. **资源加载失败**：
    - 图片加载失败时显示占位图
    - 广告加载失败时不影响页面正常显示
    - 提供刷新选项

### 用户输入错误

1. **表单验证**：
    - 实时验证用户输入
    - 显示具体的错误信息
    - 高亮错误字段
2. **搜索无结果**：
    - 显示友好提示
    - 提供搜索建议
    - 显示热门工具

### 系统错误

1. **500 内部服务器错误**：
    - 显示通用错误页面
    - 提供返回首页按钮
    - 记录详细错误日志

2. **404 页面未找到**：
    - 显示 404 页面
    - 提供相关推荐
    - 提供搜索功能

### 错误监控

1. **前端错误监控**：
    - 使用 Sentry 或类似工具监控前端错误
    - 记录用户行为上下文
    - 及时通知开发团队

2. **性能监控**：
    - 监控页面加载时间
    - 监控 API 响应时间
    - 监控用户交互延迟
    ```

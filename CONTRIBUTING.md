# AI Navigation Site - 项目规范

## 开发规范

### 1. 代码风格指南
- 遵循 ESLint 配置规则
- 使用 Prettier 进行代码格式化
- 使用 2 空格缩进
- 命名和函数名采用 camelCase
- 常量和组件名采用 PascalCase

### 2. 文件组织规范
- 按功能模块组织代码
- 组件放在 `src/components/`
  - `common/` 通用组件
  - `business/` 业务组件
- `layout/` 布局组件
- 页面放在 `src/views/` 或 `src/pages/`

### 3. 类型定义规范
- 类型定义放在 `src/types/`
  接口使用 `interface` 或 `type`
- 类型命名使用 PascalCase
  类型文件名使用 `.d.ts` 后缀

### 4. 组件命名规范
- 单文件组件使用 PascalCase
- 组件放在 `src/components/common/`、`src/components/business/`、`src/components/layout/`
- 页面放在 `src/pages/`

### 5. Vue 3 编码规范
- 使用 `<script setup>` 语法
- 使用组合式 API
- 使用 TypeScript 类型
- Props 使用 `defineProps` 或 `interface Props`
- Emits 使用 `defineEmits` 或 `interface Emits`

### 6. API 封装规范
- API 函数放在 `src/api/`
- API 命名使用 camelCase
- 使用 `async/await` 处理异步操作
- 使用 try/catch 错误处理

### 7. 路由规范
- 路由文件放在 `src/router/`
- 路由命名使用 PascalCase（如 `pages/index.vue` → 路由 `/`）
- 使用 `useRouter` 和 `useRoute`
- 动态路由使用 `[id].vue` 格式

### 8. Store 规范
- Store 文件放在 `src/stores/`
- Store 命名使用 PascalCase + "Store" 后缀
- 使用 `defineStore` 定义
- 使用 `state` 和 `actions`
- 使用 `actions` 修改状态

### 9. Composables 规范
- Composables 放在 `src/composables/`
- Composables 命名使用 "use" 前缀
- 参数和返回类型明确
- 支持响应式设计

### 10. 样式规范
- 全局样式放在 `src/assets/styles/main.css`
- 组件样式使用 scoped `<style scoped>`
- Tailwind CSS 优先
- 组件内样式优先使用 Tailwind 类

### 11. 测试规范
- 测试文件放在对应文件同目录，并添加 `.spec.ts` 或 `.test.ts` 后缀
- 测试描述使用 `it` 开头
- 测试包含正常用例、边界情况、错误情况

### 12. Git 提交规范
- Commit Message 格式：`feat: xxx - description`
- Commit Message 使用英文，简短明确
- 一次提交一个功能或修复
- Commit Message 关联相关 Issue
- Commit Message 遵循 Conventional Commits 规范

### 13. 环境配置
- 开发环境使用 `dev` 分支
- 测试环境使用 `test` 分支
- 生产环境使用 `prod` 分支
- 主分支为 `master` 分支

### 14. 注释规范
- JSDoc 风格
- 注释清晰、准确
- 复杂逻辑必须添加注释
- 函数必须有描述注释
- 接口必须有参数说明

### 15. 安全规范
- 不在代码中硬编码敏感信息
- 使用 `.env` 文件存储环境变量
- 用户输入必须进行验证和转义
- API 调用必须进行权限验证
- SQL 查询必须使用参数化

<template>
  <div class="container">
    <div class="header">
      <div class="logo">AI 导航站</div>
      <nav class="nav">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/category/ai-chat" class="nav-item">智能对话</router-link>
        <router-link to="/category/image-generation" class="nav-item">图像生成</router-link>
        <router-link to="/category/coding-assistant" class="nav-item">编程辅助</router-link>
        <router-link to="/search" class="nav-item">搜索</router-link>
        <router-link to="/submit" class="nav-item">提交工具</router-link>
      </nav>
      <div class="user-section">
        <button class="btn-secondary">登录</button>
        <button class="btn-secondary">注册</button>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <h1 class="hero-title">发现最优质的 AI 工具</h1>
      <p class="hero-subtitle">汇聚全球 AI 工具，快速找到最适合你的 AI 解决方案</p>
      <div class="hero-cta">
        <button class="btn-primary">开始探索</button>
      </div>
    </section>

    <!-- Editor's Picks -->
    <section class="section">
      <h2 class="section-title">编辑精选</h2>
      <div class="grid grid-cols-4">
        <div v-for="i in 12" :key="i" class="tool-card">
          <div class="card-header">
            <div class="tool-icon">🤖</div>
            <div class="tool-info">
              <h3 class="tool-name">AI Tool {{ i }}</h3>
              <p class="tool-desc">AI tool description</p>
              <div class="tool-tags">
                <span v-for="tag in tool.tags" :key="tag" class="tag">AI</span>
                <span class="tag">免费</span>
                <span class="tag">推荐</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    <!-- Hot Categories -->
    <section class="section">
      <h2 class="section-title">热门分类</h2>
      <div class="grid grid-cols-2 gap-6">
        <div v-for="i in 10" :key="i" class="category-card">
          <div class="cat-icon">📁</div>
          <h3 class="cat-name">分类 {{ i }}. 文本生成</h3>
          <p class="cat-count">{{ 50 + i * 10 }} 个工具</p>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="search-section">
      <div class="search-box">
        <input
          type="text"
          placeholder="搜索 AI 工具（至少 2 个字符）..."
          class="search-input"
        />
        <button class="search-btn">🔍</button>
        <div class="search-suggestions" v-if="showSuggestions && suggestions.length > 0">
          <div class="suggestion-list">
            <div
              v-for="suggestion in suggestions"
              :key="suggestion.id"
              class="suggestion-item"
              @click="goToDetail(suggestion.id)"
            >
              <span class="suggestion-icon">🔍</span>
              <span class="suggestion-name">{{ suggestion.name }}</span>
              <span class="suggestion-tag">{{ suggestion.tags[0] }}</span>
            </div>
          </div>
        </div>
      </section>

    <!-- Categories Section -->
    <section class="section">
      <h2 class="section-title">所有分类</h2>
      <div class="grid grid-cols-2 gap-6">
        <div v-for="category in categories" :key="category.id" class="category-card" @click="goToCategory(category.id)">
          <div class="cat-icon">{{ category.icon }}</div>
          <h3 class="cat-name">{{ category.name }}</h3>
          <p class="cat-desc">{{ category.description }}</p>
          <span class="cat-count">{{ category.toolCount }} 个工具</span>
        </div>
      </div>
    </section>
  </div>

  <!-- Footer -->
  <footer class="footer">
    <p>&copy; 2026 AI Navigation Site. All rights reserved.</p>
    <div class="footer-links">
      <a href="/about" class="footer-link">关于我们</a>
      <a href="/submit" class="footer-link">提交工具</a>
      <a href="/about#contact" class="footer-link">联系我们</a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const showSuggestions = ref(false)
const suggestions = ref([
  {
    id: 'tool-1',
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: 'OpenAI 开发的对话式 AI 助手',
    icon: '🤖',
    category: '智能对话',
    tags: ['AI', '聊天', 'AI', '推荐']
  },
  {
    id: 'tool-2',
    name: 'Claude',
    slug: 'claude',
    description: 'Anthropic 开发的 AI 助手，具备强大的文本生成和对话能力',
    icon: '🤖',
    category: '智能对话',
    tags: ['AI', '聊天', '写作', 'AI', 'Claude', '推荐'],
    icon: '🤖'
  },
  {
    id: 'tool-3',
    name: 'Perplexity',
    slug: 'plexity',
    description: 'Perplexity AI 开发的 AI 助手，具备强大的信息检索和生成能力',
    icon: '🤖',
    category: '智能对话',
    tags: ['AI', '搜索', '推荐', '免费', 'Plexity'],
    icon: '🤖'
  }
])

// 模拟分类数据
const categories = ref([
  {
    id: 'cat-1',
    name: '智能对话',
    slug: 'ai-chat',
    icon: '🤖',
    description: 'AI 对话和聊天相关工具，包括 ChatGPT、Claude、文心一言等',
    toolCount: 50
  },
  {
    id: 'cat-2',
    name: '图像生成',
    slug: 'image-generation',
    icon: '🎨',
    description: 'AI 图像生成和编辑工具，支持文生图、图生视频、风格迁移',
    toolCount: 45
  },
  {
    id: 'cat-3',
    name: '编程辅助',
    slug: 'coding-assistant',
    icon: '👨',
    description: 'AI 编程辅助工具，包括 GitHub Copilot、Cursor、Runway 等',
    toolCount: 30
  }
])

// 实时搜索（200ms 内）
let searchTimer: NodeJS.Timeout | null = null

// 搜索逻辑
const submitSearch = () => {
  if (searchQuery.value.trim().length >= 2) {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      showSuggestions.value = true
      // 实时搜索建议
      const query = searchQuery.value.toLowerCase()
      const filtered = suggestions.value.filter(tool => {
        const name = tool.name.toLowerCase()
        const desc = tool.description.toLowerCase()
        const tags = tool.tags.map(t => t.toLowerCase())
        return name.includes(query) || desc.includes(query) || tags.some(tag => tag.toLowerCase().includes(query))
      }).slice(0, 8)

      if (filtered.length > 0) {
        suggestions.value = filtered.map((tool, index) => ({
          tool,
          position: { x: index, y: index }
        }))

      // 执行搜索
      alert('开始搜索...')
  }
}

const hideSuggestions = () => {
  showSuggestions.value = false
}

const goToTool = (id: string) => {
  navigateToTool(id)
}

const goToCategory = (id: string) => {
  navigateToCategory(id)
}

const navigateToTool = (id: string) => {
  navigateTo({ path: `/tool/${id}` })
}

const navigateToCategory = (id: string) => {
  navigateTo({ path: `/category/${id}` })
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 40px;
}

.logo {
  font-size: 1.5rem;
  font-weight:  700;
  color: #1a1a1a;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logo:hover {
  color: #1890ff;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-item:hover {
  color: #1890ff;
}

.user-section {
  display: flex;
  gap: 10px;
}

.btn-secondary {
  padding: 8px 16px;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight:  500;
}

.btn-secondary:hover {
  background: #f0f0f0;
  border-color: #1890ff;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5c7c 8%, #667eea 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 80px 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 40px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 1.25rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
}

.hero-cta {
  margin-top: 32px;
}

.section {
  background: white;
  border-radius: 12px;
  padding: 40px 20px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 60px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 30px;
}

.grid {
  display: grid;
  gap: 24px;
}

.grid-cols-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.grid-cols-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: #1890ff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.tool-icon {
  width: 48px;
  height: 48px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.tool-info {
  flex: 1;
  min-width: 0;
}

.tool-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
  margin: 0;
}

.tool-desc {
  color: #666;
  font-size: 0.875rem;
  margin: 0;
  margin-bottom: 12px;
  line-height: 1.5;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background: #e0f2ff;
  color: #666;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.tag:hover {
  background: #409eff;
  color: white;
}

.cat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cat-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.cat-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.cat-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 8px;
}

.cat-desc {
  color: #666;
  font-size: 0.875rem;
  margin: 0;
  margin-bottom: 16px;
  line-height: 1.5;
  margin-bottom: 8px;
  line-height: 1.5;
}

.cat-count {
  color: #999;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
}

.search-section {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
}

.search-box {
  position: relative;
  max-width: 100%;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 16px 20px;
  font-size: 16px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #10b981;
  outline: none;
  box-shadow: 0 0 4px rgba(16, 16, 235, 0, 0, 0.04);
}

.search-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 10;
}

.suggestion-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 80px;
  overflow-y: auto;
}

.suggestion-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.suggestion-item:hover {
  background: #f5f5f5;
}

.suggestion-icon {
  font-size: 20px;
}

.suggestion-name {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
}

.suggestion-tag {
  background: #e0f2ff;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.categories-section {
  margin-top: 60px;
}

.categories-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.grid {
  display: grid;
  gap: 24px;
}

.grid-cols-4 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.grid-cols-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.cat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cat-card:hover {
  border-color: #10b981;
  box-shadow:0 4px 16px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.cat-icon {
  font-size: 2rem;
  margin-bottom: 16px;
}

.cat-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 4px;
}

.cat-desc {
  color: #666;
  font-size: 0.875rem;
  margin: 0;
  line-height: 1.5;
}

.cat-count {
  color: #999;
  font-size: 0.875rem;
  font-weight:  500;
  margin: 0;
}

.footer {
  background: #f8f9fa;
  padding: 40px 20px;
  border-top: 1px solid #e0e0e0;
  margin-top: 60px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-link {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #1890ff;
}

@media (max-width: 768px) {
  .container {
    padding: 12px;
  }

  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
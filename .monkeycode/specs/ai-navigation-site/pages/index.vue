<template>
  <div class="container">
    <!-- Page Header -->
    <header class="header">
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

    <!-- Main Content -->
    <main class="main">
      <!-- Hero Section -->
      <section class="hero">
        <h1 class="hero-title">发现最优质的 AI 工具</h1>
        <p class="hero-subtitle">汇聚全球 AI 工具，快速找到最适合你的 AI 解决方案</p>
        <div class="hero-cta">
          <button class="btn-primary">
            <span>开始探索</span>
          </button>
        </div>
      </section>

      <!-- Editor's Picks -->
      <section class="section">
        <h2 class="section-title">编辑精选</h2>
        <div class="grid grid-cols-4 gap-6">
          <div v-for="i in 12" :key="i" class="tool-card">
            <div class="card-header">
              <div class="tool-icon">🤖</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories -->
      <section class="section">
        <h2 class="section-title">热门分类</h2>
        <div class="grid grid-cols-2 gap-6">
          <div v-for="i in 10" :key="i" class="category-card">
            <div class="cat-icon">📁</div>
            <h3 class="cat-name">分类 {{ i }}. 文本生成</h3>
            <p class="cat-count">{{ 50 + i * 10 }} 个工具</p>
          </div>
      </div>

      <!-- Search Section -->
      <section class="section search-section">
        <div class="search-box">
          <input 
            type="text" 
            placeholder="搜索 AI 工具（至少 2 个字符）..." 
            class="search-input"
          />
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories-section">
        <h2 class="section-title">所有分类</h2>
        <div class="grid grid-cols-2 gap-6">
          <div v-for="category in categories" :key="category.id" class="category-card" @click="goToCategory(category.id)">
            <div class="cat-icon">{{ category.icon }}</div>
            <h3 class="cat-name">{{ category.name }}</h3>
            <p class="cat-desc">{{ category.description }}</p>
            <span class="cat-count">{{ category.toolCount }} 个工具</span>
          </div>
        </div>
      </div>
  </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2026 AI Navigation Site. All rights reserved.</p>
      <div class="footer-links">
        <a href="/about" class="footer-link">关于我们</a>
        <a href="/submit" class="footer-link">提交工具</a>
        <a href="/about#contact" class="footer-link">联系我们</a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSearch } from '~/composables/useSearch'

interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  toolCount: number
}

const router = useRouter()
const currentPage = ref(1)
const pageSize = 24

// 模拟分类数据
const categories = ref<Category[]>([
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
    name: '音频工具',
    slug: 'audio-tools',
    icon: '🎵',
    description: 'AI 音频和语音识别工具，包括语音识别、语音合成、音频编辑',
    toolCount: 34
  },
  {
    id: 'cat-4',
    name: '视频工具',
    slug: 'video-tools',
    icon: '🎬',
    description: 'AI 视频生成和编辑工具',
    toolCount: 89
  },
  {
    id: 'cat-5',
    name: '智能对话',
    slug: 'ai-chat',
    icon: '🤖',
    description: 'AI 对话和聊天相关工具，包括 ChatGPT、Claude、文心一言等',
    toolCount: 125
  },
  {
    id: 'cat-6',
    name: '编程辅助',
    slug: 'coding-assistant',
    icon: '👨',
    description: 'AI 编程辅助工具，包括 GitHub Copilot、Cursor、Runway 等',
    toolCount: 156
  },
  {
    id: 'cat-7',
    name: '学习资源',
    slug: 'learning-resources',
    icon: '📚',
    description: 'AI 学习资源，包括教程、文档、视频教程',
    toolCount: 50
  },
  {
    id: 'cat-8',
    name: '企业服务',
    slug: 'enterprise',
    icon: '🏢',
    description: '企业级 AI 解决方案，包括大厂官方 API、企业版 AI 工具',
    toolCount: 45
  },
  {
    id: 'cat-9',
    name: '模型训练',
    slug: 'model-training',
    icon: '🧠',
    description: 'AI 模型和训练资源，包括 HuggingFace、Stable Diffusion 等',
    toolCount: 18
  }
])

const goToCategory = (id: string) => {
  navigateToCategory(id)
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #f8fafc;
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 40px;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a1a1a;
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
  background: #f5f5f5;
  border: 1px solid #d1d1d1d1;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #5c7c 8%, #667eea 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 20px;
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
  margin-bottom: 60px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a1a;
  margin-bottom: 24px;
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

.tool-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tool-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.tool-icon {
  width: 64px;
  height: 64px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.cat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
}

.cat-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.cat-icon {
  font-size: 2rem;
}

.cat-name {
  margin-bottom: 8px;
}

.cat-desc {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 12px;
}

.cat-count {
  color: #999;
  font-size: 0.875rem;
}

.pagination {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.pagination-info {
  color: #666;
  font-size: 0.875rem;
}

.grid {
  display: grid;
  gap: 24px;
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-cols-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.cat-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 24px;
  cursor: pointer;
}

.cat-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.cat-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.cat-name {
  font-size: 1.25rem;
}

.cat-desc {
  color: #666;
  margin-bottom: 12px;
}

.cat-count {
  color: #999;
  font-size: 0.875rem;
}

.pagination {
  margin-top: 30px;
}

.search-section {
  max-width: 600px;
  margin: 0 auto;
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
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #10b981;
  outline: none;
  box-shadow: 0 4px 12px rgba(16, 16, 235, 0, 0, 0.1);
}

.category-section {
  margin-bottom: 60px;
}

.categories-section h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1a1a1a1a;
  margin-bottom: 30px;
}

.grid {
  gap: 24px;
}

.footer {
  background: #f8fafa;
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

.footer-link {
  text-decoration: none;
}

@media (max-width: 768px) {
  .container {
    padding: 12px;
  }

  .grid-cols-4,
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-title {
    font-size: 2rem;
  }

  .grid-cols-4,
  .grid-cols-2 {
    grid-template-columns: repeat(1, 1fr);
  }

  .card {
    padding: 16px;
  }
}
</style>

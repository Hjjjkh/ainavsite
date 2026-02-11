<template>
  <div class="container">
    <!-- Header -->
    <header class="header">
      <div class="logo">AI 导航站</div>
      <nav class="nav">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/category/text-generation" class="nav-link">文本生成</router-link>
        <router-link to="/category/image-generation" class="nav-link">图像生成</router-link>
        <router-link to="/search" class="nav-link">搜索</router-link>
        <router-link to="/submit" class="nav-link">提交工具</router-link>
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
              <div class="tool-info">
                <h3 class="tool-name">AI Tool {{ i }}</h3>
                <p class="tool-desc">AI tool description</p>
                <div class="tool-tags">
                  <span class="tag">AI</span>
                  <span class="tag">免费</span>
                  <span class="tag">推荐</span>
                </div>
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
            <h3 class="cat-name">分类 {{ i }}</h3>
            <p class="cat-count">{{ 50 + i * 10 }} 个工具</p>
          </div>
        </div>
      </section>

      <!-- Search Section -->
      <section class="section search-section">
        <div class="search-box">
          <input 
            type="text" 
            placeholder="搜索 AI 工具（至少 2 个字符）..." 
            class="search-input"
            v-model="searchQuery"
          />
          <button class="search-btn">🔍</button>
        </div>
        <div class="search-suggestions" v-if="showSuggestions && suggestions.length > 0">
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
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>&copy; 2026 AI Navigation Site. All rights reserved.</p>
      <div class="footer-links">
        <router-link to="/about" class="footer-link">关于我们</router-link>
        <router-link to="/submit" class="footer-link">提交工具</router-link>
        <router-link to="/about#contact" class="footer-link">联系我们</router-link>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')
const showSuggestions = ref(false)
const suggestions = ref([
  {
    id: 'tool-1',
    name: 'ChatGPT',
    tags: ['AI', '聊天', '免费', '推荐'],
    icon: '🤖'
  },
  {
    id: 'tool-2',
    name: 'Claude',
    tags: ['AI', '聊天', 'AI', '写作', '编程', '推荐'],
    icon: '🤖'
  },
  {
    id: 'tool-3',
    name: 'Midjourney',
    tags: ['AI', '绘画', '免费', '图像', '推荐'],
    icon: '🎨'
  }
])

// 模拟分类数据
const categories = ref([
  {
    id: 'cat-1',
    name: '文本生成',
    icon: '📝',
    description: '用于生成文章、邮件、故事等各类文本内容',
    toolCount: 50
  },
  {
    id: 'cat-2',
    name: '图像生成',
    icon: '🎨',
    description: 'AI 图像生成和编辑工具',
    toolCount: 50
  },
  {
    id: 'cat-3',
    name: '音频工具',
    icon: '🎵',
    description: 'AI 语音识别、语音合成、音频编辑',
    toolCount: 50
  },
  {
    id: 'cat-4',
    name: '视频工具',
    icon: '🎬',
    'description: 'AI 视频生成和编辑工具',
    toolCount: 50
  },
  {
    id: 'cat-5',
    name: '智能对话',
    icon: '🤖',
    description: 'AI 聊天、编程、写作等各类 AI 助手',
    toolCount: 50
  },
  {
    id: 'cat-6',
    name: '编程辅助',
    icon: '💻',
    description: 'AI 编程助手、代码生成、代码审查工具',
    toolCount: 50
  },
  {
    id: cat-7',
    name: '学习资源',
    icon: '📚',
    description: 'AI 学习、教程、文档资源',
    toolCount: 50
  },
  {
    id: 'cat-8',
    name: '企业服务',
    icon: '🏢',
    description: '企业级 AI 解决方案',
    toolCount: 50
  }
])

// 模拟热门工具数据
const hotTools = ref([
  {
    id: 'tool-1',
    name: 'ChatGPT',
    description: 'OpenAI 开发的对话式 AI 助手',
    icon: '🤖',
    category: '智能对话',
    tags: ['AI', '聊天', '免费', '推荐'],
    website: 'https://chatgpt.com'
  },
  {
    id: 'tool-2',
    name: 'Claude',
    description: 'Anthropic 开发的 AI 助手',
    icon: '🤖',
    category: '智能对话',
    tags: ['AI', '聊天', '写作', '编程', '推荐'],
    website: 'https://claude.ai'
  },
  {
    id: 'tool-3',
    name: 'Midjourney',
    description: '强大的 AI 图像生成工具',
    icon: '🎨',
    category: '图像生成',
    tags: ['AI', '绘画', '免费', '推荐'],
    website: 'https://midjourney.com'
  },
  {
    id: 'tool-4',
    name: 'Stable Diffusion',
    description: 'AI 图像生成和编辑工具',
    icon: '🎨',
    category: '图像生成',
    tags: ['AI', '图像生成', '免费', 'Stable Diffusion'],
    website: 'https://stablediffusion.com'
  }
])

// 搜索逻辑
const suggestions = computed(() => {
  if (searchQuery.value.length < 2) {
    return []
  }
  
  return hotTools.filter(tool => {
    const name = tool.name.toLowerCase()
    const desc = tool.description.toLowerCase()
    const tags = tool.tags.map(t => t.toLowerCase())
    const query = searchQuery.value.toLowerCase()
    
    return name.includes(query) || 
           desc.includes(query) || 
           tags.some(tag => tag.includes(query))
  }).slice(0, 8)
})

const hideSuggestions = () => {
  showSuggestions.value = false
}

const goToDetail = (id: string) => {
  navigateTo(`/tool/${id}`)
}

const goToCategory = (id: string) => {
  navigateTo(`/category/${id}`)
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  min-height: 100vh;
  background: #f8fafc;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a1a;
  margin-right: 20px;
  text-decoration: none;
  cursor: pointer;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.875rem;
}

.nav-item:hover {
  color: #1890ff;
}

.user-section {
  display: flex;
  gap: 10px;
}

.btn-secondary {
  padding: 6px 12px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.btn-secondary:hover {
  background: #f0f0f0;
  color: #111;
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
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
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
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0.1);
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
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
}

.section-title {
  font-size: 1.5rem;
  font-weight:  600;
  color: #111;
  margin-bottom: 30px;
}

.grid {
  display: grid;
  gap: 24px;
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.card-header {
  display: flex;
  align-items: flex-start;
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
}

.tool-info {
  flex: 1;
  min-width: 0;
}

.tool-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
  margin: 0;
  margin-bottom: 4px;
  margin-bottom:  4px;
}

.tool-desc {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
  margin-bottom: 12px;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background: #e5f7eb;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.tag:hover {
  background: #e0e0e0;
}

.card:hover {
  border-color: #10b981;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.cat-icon {
  font-size: 2rem;
}

.cat-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
  margin: 0;
  margin-bottom: 4px;
  margin-bottom: 8px;
}

.cat-desc {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
  line-height: 1.5;
  margin-bottom: 12px;
}

.cat-count {
  font-size: 0.875rem;
  color: #999;
  font-size: 0.75rem;
  font-weight: 500;
  margin: 0;
}

.category-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.cat-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.cat-name {
  margin-bottom: 8px;
  margin-bottom: 8px;
}

.cat-desc {
  color: #666;
  margin: 0;
  margin-bottom: 16px;
  line-height: 1.5;
}

.cat-count {
  color: #999;
  font-size: 0.75rem;
  font-weight: 500;
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
  padding: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #10b981;
  box-shadow: 0 0 4px 12px rgba(0, 0, 0, 0.1);
}

.search-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0 0 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.suggestion-item:hover {
  background: #f5f5f5;
}

.suggestion-icon {
  font-size: 20px;
}

.suggestion-name {
  flex: 1;
  color: #333;
  font-weight: 500;
  }

.suggestion-tag {
  background: #e5f5f5;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }

  .grid-cols-4,
  .grid-cols-2 {
    grid-template-columns: repeat(1, 1fr);
  }

  .hero-title {
    font-size: 2.25rem;
  }

  .grid-4,
  .grid-2 {
    grid-template-columns: repeat(1, 1fr);
  }

  .grid {
    gap: 16px;
  }
}
</style>

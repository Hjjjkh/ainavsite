<template>
  <div class="container">
    <!-- Search Section -->
    <section class="search-section">
      <h1 class="section-title">发现最优质的 AI 工具</h1>
      <div class="search-container">
        <div class="search-box">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="搜索 AI 工具（至少 2 个字符）..."
            class="search-input"
            @input="onInput"
          />
          <div class="search-suggestions" v-if="showSuggestions && suggestions.length > 0">
            <div
              v-for="tool in suggestions"
              :key="tool.id"
              class="suggestion-item"
              @click="goToTool(tool.id)"
            >
              <span class="suggestion-icon">🔍</span>
              <span class="suggestion-name">{{ tool.name }}</span>
              <span class="suggestion-tag">{{ tool.tags[0] }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Results -->
    <section class="results-section" v-if="hasResults">
      <h2 class="section-title">
        搜索 "{{ searchQuery }}"
        <span class="result-count">找到 {{ resultsCount }} 个工具</span>
      </h2>

      <div v-if="hasResults" class="grid grid-cols-4">
        <div v-for="tool in results" :key="tool.id" class="tool-card" @click="goToTool(tool.id)">
          <div class="card-header">
            <div class="tool-icon">{{ tool.icon }}</div>
            <h3 class="tool-name">{{ tool.name }}</h3>
            <p class="tool-desc">{{ tool.description }}</p>
          </div>
        </div>
      </div>

    <!-- No Results -->
    <div v-else class="no-results">
      <div class="no-results-content">
        <div class="no-results-icon">🔍</div>
        <h3>未找到匹配的工具</h3>
        <p>请尝试其他关键词或浏览热门分类</p>
      </div>
    </div>

    <!-- Popular Categories -->
    <section class="categories-section">
      <h2 class="section-title">热门分类</h2>
      <div class="grid grid-cols-2">
        <div v-for="category in categories" :key="category.id" class="category-card" @click="goToCategory(category.id)">
          <div class="cat-icon">{{ category.icon }}</div>
          <h3 class="cat-name">{{ category.name }}</h3>
          <p class="cat-desc">{{ category.toolCount }} 个工具</p>
        </div>
      </div>
    </section>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Tool } from '~/types/tool'

const route = useRoute()

interface Category {
  id: string
  name: string
  icon: string
  toolCount: number
}

interface Suggestion {
  tool: Tool
  position: { x: number, y: number }
}

const searchQuery = ref('')
const showSuggestions = ref(false)
const suggestions = ref<Tool[]>([])

const results = ref<Tool[]>([])
const hasResults = computed(() => results.value.length > 0)
const resultsCount = computed(() => results.value.length)

// 模拟分类数据
const categories = ref<Category[]>([
  {
    id: 'cat-1',
    name: '文本生成',
    icon: '📝',
    toolCount: 856
  },
  {
    id: 'cat-2',
    name: '图像生成',
    icon: '🎨',
    toolCount: 432
  },
  {
    id: 'cat-3',
    name: '编程辅助',
    icon: '👨',
    toolCount:  368
  },
  {
    id: 'cat-4',
    name: '音频工具',
    icon: '🎵',
    toolCount: 145
  },
  {
    id: 'cat-5',
    name: '视频工具',
    icon: '🎬',
    toolCount: 223
  },
  {
    id: 'cat-6',
    name: '语音识别',
    icon: '🎤',
    toolCount: 89
  },
  {
    id: 'cat-7',
    name: '智能对话',
    icon: '🤖',
    toolCount: 125
  },
  {
    id: 'cat-8',
    name: '内容运营',
    icon: '📰',
    toolCount: 67
  },
  {
    id: cat-9',
    name: '企业服务',
    icon: '🏢',
    toolCount: 156
  },
  {
    id: 'cat-10',
    name: '开发工具',
    icon: '🛠️',
    toolCount: 412
  }
])

// 模拟搜索结果
const mockTools: Tool[] = [
  {
    id: 'tool-1',
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: 'OpenAI 开发的对话式 AI 助手，具备强大的语言理解和生成能力',
    icon: '🤖',
    category: '智能对话',
    tags: ['AI', '聊天', '助手', '对话', '免费', '推荐'],
    website: 'https://chatgpt.com'
  },
  {
    id: 'tool-2',
    name: 'Midjourney',
    slug: 'midjourney',
    description: '强大的 AI 图像生成工具，根据文本描述生成高质量图像',
    icon: '🎨',
    category: '图像生成',
    tags: ['AI', '图像生成', '艺术', '设计', 'Midjourney', '推荐'],
    website: 'https://midjourney.com'
  },
  {
    id: 'tool-3',
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    description: '强大的 AI 图像生成和编辑工具，支持文本到图像、图像到图像编辑',
    icon: '🎨',
    category: '图像生成',
    tags: ['AI', '图像生成', '编辑', 'Stable Diffusion', '推荐'],
    website: 'https://stablediffusion.com'
  },
  {
    id: 'tool-4',
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description: 'GitHub 推出的 AI 编程助手，支持代码自动补全、代码审查、文档生成等功能',
    icon: '👨',
    category: '编程辅助',
    tags: ['AI', '编程', 'GitHub', 'Copilot', '推荐'],
    website: 'https://github.com/features/copilot'
  },
  {
    id: 'tool-5',
    name: 'Claude',
    slug: 'claude',
    description: 'Anthropic 开发的 AI 助手，支持文本对话、代码分析、文档阅读等',
    icon: '🤖',
    category: '智能对话',
    tags: ['AI', 'Claude', 'Anthropic', '推荐'],
    website: 'https://claude.ai'
  }
]

onMounted(() => {
  // TODO: 从 API 获取数据
  // 这里先用模拟数据
  results.value = []
})

// 实时搜索（200ms 内）
let searchTimer: NodeJS.Timeout | null = null

watch(searchQuery, (newQuery) => {
  if (newQuery.trim().length >= 2) {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      // 实时搜索建议
      const query = newQuery.toLowerCase()
      const filtered = mockTools.filter(tool => {
    const name = tool.name.toLowerCase()
    const desc = tool.description.toLowerCase()
    const tags = tool.tags.some(tag => tag.toLowerCase().includes(query)
    return name.includes(query) || desc.includes(query) || tags.some(tag => tag.toLowerCase().includes(query))
  }).slice(0, 8)

  if (filtered.length > 0) {
    showSuggestions.value = true
    suggestions.value = filtered.map((tool, index) => ({
      tool,
      position: { x: index, y: index }
    }))

    // 执行搜索
    results.value = mockTools.filter(tool => {
      const name = tool.name.toLowerCase()
      const desc = tool.description.toLowerCase()
      const tags = tool.tags.some(tag => tag.toLowerCase().includes(newQuery.toLowerCase())
      return name.includes(newQuery) || desc.includes(newQuery) || tags.some(tag => tag.toLowerCase().includes(newQuery))
    })
  } else {
    showSuggestions.value = false
  }

  clearTimeout(searchTimer)
}, 200)

const goToTool = (id: string) => {
  navigateToTool(id)
}

const goToCategory = (id: string) => {
  navigateToCategory(id)
}

const submitSearch = () => {
  if (searchQuery.value.trim().length >= 2) {
    navigateToSearch(searchQuery.value)
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  showSuggestions.value = false
}

const navigateToTool = (id: string) => {
  navigateTo({ path: `/tool/${id}` })
  navigateToCategory = (id: string) => {
  navigateTo({ path: `/category/${id}` })
}

const navigateToSearch = (query: string) => {
  navigateTo({ path: '/search', query: { q: query } })
}

const hideSuggestions = () => {
  showSuggestions.value = false
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.search-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 2rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin-bottom: 20px;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-box {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 16px 20px;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: #4dabf7;
  outline: none;
  box-shadow: 0 0 0 2px rgba(77, 0, 0, 0.04);
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 0 0 0 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 10;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.suggestion-item:hover {
  background-color: #f5f5f5;
}

.suggestion-icon {
  font-size: 20px;
}

.suggestion-name {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}

.suggestion-tag {
  font-size: 0.875rem;
  background: #e0f2ff;
  color: #666;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.search-section h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin-bottom: 30px;
}

.result-count {
  font-size: 0.875rem;
  color: #666;
  font-weight: 400;
  margin-left: 10px;
}

.no-results-section {
  text-align: center;
  padding: 80px 20px;
}

.no-results-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.no-results-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.no-results p {
  color: #666;
  font-size: 1.25rem;
  margin-bottom: 20px;
}

.categories-section {
  margin-bottom: 60px;
}

.categories-section h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
  text-align: center;
  margin-bottom: 40px;
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
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cat-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.cat-card .cat-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.cat-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
  margin: 0;
}

.cat-desc {
  color: #666;
  font-size: 0.875rem;
  margin: 0;
  color: #666;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
    padding: 0 16px;
  }

  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-cols-2 {
    grid-template-columns: 1fr;
    }
}
</style>

<template>
  <div class="container">
    <!-- Page Header -->
    <div class="page-header">
      <h1>{{ category.name }}</h1>
      <p class="page-meta">分类描述：{{ category.description }}</p>
      <div class="page-info">
        <span class="info-item">
          <span class="label">工具数量：</span>
          <span class="value">{{ category.toolCount }} 个工具</span>
        </span>
        <span class="info-item">
          <span class="label">排序：</span>
          <span class="value">
            <select v-model="sortOrder" @change="handleSort">
              <option value="toolCount">工具数量（降序）</option>
              <option value="rating">平均评分（降序）</option>
              <option value="date">最新添加（降序）</option>
            </select>
          </span>
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Tools Grid -->
      <div class="grid grid-cols-4 gap-6">
        <div v-for="tool in tools" :key="tool.id" class="tool-card" @click="goToDetail(tool.id)">
          <div class="card-header">
            <div 
              class="tool-icon"
              :style="{ backgroundImage: tool.icon ? `url(${tool.icon})` : '' }"
            >
              {{ tool.icon || '🤖' }}
            </div>
            <div class="tool-info">
              <h3 class="tool-name">{{ tool.name }}</h3>
              <p class="tool-desc">{{ tool.description }}</p>
              <div class="tool-tags">
                <span v-for="tag in tool.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>

      <!-- Pagination -->
      <div class="pagination">
        <div class="pagination-info">
          共 {{ tools.length }} 个工具
        </div>
        <div class="pagination-controls">
          <button
            class="control-btn"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            上一页
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            :class="active: currentPage === page"
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <span class="page-num">
            {{ currentPage }} / {{ totalPages }}
          </span>
          <button
            class="control-btn"
            :disabled="currentPage >= totalPages"
            @click="currentPage++"
          >
            下一页
          </button>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Tool {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  tags: string[]
  category: string
  website: string
  rating: {
    average: number
    count: number
  }
  toolCount: number
}

interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  order: number
  toolCount: number
}

interface Props {
  id: string
}

const props = defineProps<Props>()

const route = useRoute()
const router = useRouter()

const currentPage = ref(1)
const pageSize = 24
const sortOrder = ref<'toolCount' | 'rating' | 'date'>('toolCount')

const tools = ref<Tool[]>([])
const category = ref<Category | null>(null)

// 模拟数据 - 根据不同排序返回不同的工具列表
const mockToolsData = {
  toolCount: [
    {
      id: 'tool-1',
      name: 'ChatGPT',
      slug: 'chatgpt',
      description: 'OpenAI 开发的对话式 AI 助手，具备强大的语言理解和生成能力',
      icon: 'https://chatgpt.com/icon.png',
      category: 'cat-1',
      tags: ['AI', '聊天', '免费', '推荐'],
      rating: { average: 4.8, count: 128 },
      toolCount: 156
    },
    {
      id: 'tool-2',
      name: 'Midjourney',
      slug: 'midjourney',
      description: '强大的 AI 图像生成和编辑工具，支持文本到图像生成',
      icon: 'https://midjourney.com/icon.png',
      category: 'cat-2',
      tags: ['AI', '绘画', '免费', '推荐'],
      rating: { average: 4.6, count: 89 },
      toolCount: 145
    },
    {
      id: 'tool-3',
      name: 'Stable Diffusion',
      slug: 'stablediffusion',
      description: '强大的 AI 图像生成和编辑工具，支持图像到图像的转换',
      icon: 'https://stablediffusion.com/icon.png',
      category: 'cat-2',
      tags: ['AI', '绘画', 'Stable Diffusion', '推荐'],
      rating: { average: 4.4, count: 67 },
      toolCount: 67
    },
    {
      id: 'tool-4',
      name: 'Claude',
      slug: 'claude',
      description: 'Anthropic 开发的 AI 助手，具备强大的文本生成和分析能力',
      icon: 'https://claude.ai/icon.png',
      category: 'cat-1',
      tags: ['AI', '聊天', 'Claude', '推荐'],
      rating: { average: 4.9, count: 234 },
      toolCount: 56
    }
  ],
  rating: [
    {
      id: 'tool-5',
      name: 'Perplexity',
      slug: 'plexity',
      description: 'Perplexity AI 开发的 AI 助手，具备强大的信息检索和生成能力',
      icon: 'https://plexity.ai/icon.png',
      category: 'cat-1',
      tags: ['AI', 'AI', '搜索', '推荐'],
      rating: { average: 4.7, count: 189 },
      toolCount: 189
    },
    {
      id: 'tool-6',
      name: 'Notion',
      slug: 'notion',
      description: 'Notion AI 开发的 AI 助手，专用于长文本理解、摘要、分析',
      icon: 'https://notion.ai/icon.png',
      category: 'cat-1',
      tags: ['AI', '长文本', '推荐'],
      rating: { average: 4.5, count: 67 },
      toolCount: 156
    }
  ]
}

// 根据分类 ID 获取数据
const categoryMap: Record<string, Category> = {
  'cat-1': {
    id: 'cat-1',
    name: '智能对话',
    slug: 'ai-chat',
    icon: '🤖',
    description: 'AI 对话和聊天相关工具，包括 ChatGPT、Claude、文心一言等',
    order: 1,
    toolCount: 156
  },
  'cat-2': {
    id: 'cat-2',
    name: '图像生成',
    slug: 'image-generation',
    icon: '🎨',
    description: 'AI 图像生成和编辑工具',
    order: 2,
    toolCount: 145
  }
}

// 获取工具数据
const fetchTools = async (categoryId: string) => {
  // 模拟 API 调用
  await new Promise(resolve => setTimeout(resolve, 500))

  // 根据排序方式返回不同数据
  const mockData: Tool[] = []
  
  switch (sortOrder.value) {
    case 'toolCount':
      mockData.push(...mockData.toolCount)
      break
    case 'rating':
      mockData.push(...mockData.rating)
      break
    case 'date':
      mockData.push(...mockData.rating.sort((a, b) => 
        b.createdAt.getTime() - a.createdAt.getTime()
      ))
      break
  }

  tools.value = mockData
  category.value = categoryMap[categoryId as string] || null

  // 重置到第一页
  currentPage.value = 1
}

// 监听分类 ID 变化
watch(() => props.id, (newId) => {
  if (newId !== props.id) {
    currentPage.value = 1
    fetchTools(newId)
  }
}, { immediate: true })

const totalPages = computed(() => {
  if (!tools.value) return 0
  return Math.ceil(tools.value.length / pageSize)
})

const goToDetail = (id: string) => {
  router.push(`/tool/${id}`)
}

const currentPage-- = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const currentPage++ = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>

<style scoped lang="scss">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a1a;
  margin-bottom: 12px;
}

.page-meta {
  color: #666;
  font-size: 1rem;
  margin-bottom: 32px;
}

.page-info {
  display: flex;
  justify-content: center;
  gap: 32px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.label {
  color: #666;
  margin-right: 8px;
}

.value {
  font-weight: 600;
  color: #1a1a1a1a;
}

.content {
  background: white;
  border-radius: 12px;
  padding: 32px;
  min-height: 400px;
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

.tool-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.tool-card:hover {
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.tool-icon {
  width: 80px;
  height: 80px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
}

.tool-icon.empty {
  background: #e0e0e0e;
}

.tool-info {
  flex: 1;
  min-width: 0;
}

.tool-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111;
  margin-bottom: 8px;
}

.tool-desc {
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 12px;
  line-height: 1.5;
  display: -webkit-box;
  overflow: hidden;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.tag {
  background: #e0f2ff;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag:hover {
  background: #409eff;
  color: white;
  }
}

.pagination {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.pagination-info {
  color: #666;
  font-size: 0.875rem;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.control-btn {
  background: #f9faf9;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
}

.control-btn:hover:not(:disabled) {
  background: #409eff;
  border-color: #409eff;
  color: #333;
}

.control-btn:disabled {
  background: #f5f5f5;
  border-color: #d1d1d1;
  color: #999;
  cursor: not-allowed;
}

.pagination-controls button.active {
  background: #409eff;
  border-color: #409eff;
  color: white;
  cursor: default;
}

.pagination-controls button:active:hover {
  background: #666666;
  color: #fff;
}

.pagination-controls button.active:active:hover {
  opacity: 0.8;
}

.page-num {
  font-weight: 600;
  color: #1a1a1a1a;
}

@media (max-width: 768px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .tool-card {
    padding: 16px;
  }

  .tool-info {
    min-width: 0;
  }

  .pagination-controls {
    flex-wrap: wrap;
  }

  .control-btn {
    flex: 1 1;
  }

  .page-num {
    margin-left: 8px;
  }
}
</style>

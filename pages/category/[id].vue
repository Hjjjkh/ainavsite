<template>
  <div class="container">
    <div class="page-header">
      <h1>{{ category.name }}</h1>
      <p class="page-meta">分类描述：{{ category.description }}</p>
    </div>

    <div class="content">
      <div class="grid grid-cols-4">
        <div v-for="tool in tools" :key="tool.id" class="tool-card" @click="goToDetail(tool.id)">
          <div class="card-header">
            <div class="tool-icon" :style="{ backgroundImage: tool.icon ? `url(${tool.icon})` : '' }">
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
      </div>

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
            < 上一页
          </button>
          <button 
            v-for="page in totalPages" 
            :key="page" 
            class="page-number" 
            :class="{ active: currentPage === page }" 
            @click="currentPage = page"
          >
            {{ page }}
          </button>
          <button 
            class="control-btn" 
            :disabled="currentPage === totalPages" 
            @click="currentPage++"
          >
            下一页
          </button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

interface Tool {
  id: string
  name: string
  description: string
  icon?: string
  tags: string[]
  category: string
  website: string
  pricing: {
    free: boolean
    plans: Array<{
      name: string
      price: number
      currency: string
      period: string
      features: string[]
    }>
  }
}

interface Props {
  id: string
}

const props = defineProps<Props>()

const route = useRoute()
const currentPage = ref(1)
const pageSize = 24

const tools = ref<Tool[]>([])

// 模拟数据 - 后续将替换为 API 调用
const mockTools: Record<string, Tool[]> = {
  'cat-1': [
    {
      id: 'tool-1',
      name: 'ChatGPT',
      description: 'OpenAI 开发的对话式 AI 助手，具备强大的语言理解和生成能力',
      icon: '',
      category: 'cat-1',
      tags: ['AI', '聊天', '免费', '推荐'],
      website: 'https://chatgpt.com',
      pricing: { free: true }
    },
    {
      id: 'tool-2',
      name: 'Claude',
      description: 'Anthropic 开发的 AI 助手，具备强大的文本生成和对话能力',
      icon: '',
      category: 'cat-1',
      tags: ['AI', '写作', '编程', '推荐'],
      website: 'https://claude.ai',
      pricing: { free: false }
    },
    {
      id: 'tool-3',
      name: 'Perplexity',
      description: 'Perplexity 开发的 AI 写作工具，支持小说创作、论文润色、报告生成',
      icon: '',
      category: 'cat-1',
      tags: ['AI', '写作', '小说', '推荐'],
      website: 'https://plexity.ai',
      pricing: { free: false }
    }
  ],
  'cat-2': [
    {
      id: 'tool-4',
      name: 'Midjourney',
      description: '强大的 AI 图像生成和编辑工具，根据文本描述生成高质量图像',
      icon: '',
      category: 'cat-2',
      tags: ['AI', '绘画', '免费', '推荐'],
      website: 'https://www.midjourney.com',
      pricing: { free: false }
    },
    {
      id: 'tool-5',
      name: 'Stable Diffusion',
      description: '强大的 AI 图像生成和编辑工具，支持图像到图像的转换',
      icon: '',
      category: 'cat-2',
      tags: ['AI', '绘画', '编辑', '推荐'],
      website: 'https://stablediffusion.com',
      pricing: { free: false }
    },
    {
      id: 'tool-6',
      name: 'Leonardo AI',
      description: '强大的 AI 图像生成和编辑工具，支持图像到图像的风格迁移',
      icon: '',
      category: 'cat-2',
      tags: ['AI', '绘画', '风格迁移', '推荐'],
      website: 'https://leonardo.ai',
      pricing: { free: false }
    },
    {
      id: 'tool-7',
      name: 'DALL·E 3',
      description: '强大的 AI 图像生成模型，可以根据文本描述生成逼真的图像',
      icon: '',
      category: 'cat-2',
      tags: ['AI', '绘画', 'DALL·E', '推荐'],
      website: 'https://labs.midjourney.com/create',
      pricing: { free: false }
    }
  ]
}

const category = ref({
  id: 'cat-1',
  name: '智能对话',
  slug: 'ai-chat',
  icon: '🤖',
  description: 'AI 对话和聊天相关工具，包括 ChatGPT、Claude、文心一言等',
  toolCount: 500
})

onMounted(() => {
  // 从模拟数据加载工具
  const categoryId = route.params.id
  tools.value = mockTools[categoryId as string] || []
})
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
  font-size: 2.25rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 12px;
}

.page-meta {
  color: #666;
  font-size: 1rem;
  margin-bottom: 30px;
}

.content {
  background: white;
  border-radius: 8px;
  padding: 32px;
  margin-bottom: 30px;
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
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tool-card:hover {
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(64, 16, 235, 0.1);
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

.tool-icon:empty {
  background: transparent;
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
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.5;
  margin-bottom: 16px;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background: #edf2f7;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
}

.tag:hover {
  background: #409eff;
}

.pagination {
  max-width: 600px;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.pagination-info {
  color: #666;
  font-size: 0.875rem;
}

.pagination-controls {
  display: flex;
  gap: 12px;
}

.control-btn {
  padding: 8px 16px;
  background: #f9faf9;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.control-btn:hover {
  background: #409eff;
  color: white;
}

.control-btn:disabled {
  background: #ccc;
  color: #999;
  cursor: not-allowed;
}

.page-number {
  font-weight: 600;
  color: #111;
}

.page-number.active {
  color: #409eff;
}

.pagination {
  background: white;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-cols-2 {
    grid-template-columns: repeat(1, 1fr);
  }

  .grid {
    gap: 16px;
  }

  .tool-card {
    padding: 16px;
  }

  .tool-name {
    font-size: 1.125rem;
  }

  .tool-desc {
    font-size: 0.875rem;
    font-size: 0.875rem;
  }

  .tool-tags {
    gap: 6px;
  }

  .tag {
    font-size: 0.75rem;
    padding: 2px 6px;
  }
}
</style>

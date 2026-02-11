<template>
  <div class="container">
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="separator">/</span>
      <router-link :to="`/category/${tool.category.id}`" class="breadcrumb-item">{{ tool.category.name }}</router-link>
      <span class="separator">/</span>
      <span class="current">{{ tool.name }}</span>
    </div>

    <div class="tool-info">
      <div class="info-header">
        <div v-if="tool.icon" class="icon" :style="{ backgroundImage: `url(${tool.icon})` }">
          {{ tool.icon || '🤖' }}
        </div>
        <div class="info-content">
          <h1 class="name">{{ tool.name }}</h1>
          <p class="description">{{ tool.description }}</p>
          <a :href="tool.website" target="_blank" class="website-link">
            {{ tool.website }}
          </a>
        </div>
      </div>
    </div>

    <div class="tags-section">
      <h2 class="section-title">标签</h2>
      <div class="tags">
        <span v-for="tag in tool.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>

    <div v-if="tool.pricing && tool.pricing.plans.length > 0" class="pricing-section">
      <h2 class="section-title">价格</h2>
      <div class="plans">
        <div v-for="plan in tool.pricing.plans" :key="plan.id" class="plan-card">
          <h3 class="plan-name">{{ plan.name }}</h3>
          <div class="plan-price">
            <span class="price-amount">{{ plan.price }}</span>
            <span class="price-currency">{{ plan.currency }}</span>
            <span class="price-period">/ {{ plan.period }}</span>
          </div>
          <el-button type="primary" size="large" @click="selectPlan(plan)">
            选择
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Tool {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  website: string
  category: Category
  tags: string[]
  pricing: {
    free: boolean
    plans: Plan[]
  }
}

interface Category {
  id: string
  name: string
  slug: string
  icon: string
  description: string
}

interface Props {
  id: string
}

const props = defineProps<Props>()

// 模拟数据
const mockTools: Record<string, Tool> = {
  'tool-1': {
    id: 'tool-1',
    name: 'ChatGPT',
    description: 'OpenAI 开发的对话式 AI 助手，具备强大的语言理解和生成能力',
    icon: '',
    website: 'https://chat.openai.com',
    category: {
      id: 'cat-1',
      name: '智能对话',
      slug: 'ai-chat',
      icon: '🤖'
    },
    tags: ['AI', '聊天', '免费', '推荐'],
    pricing: {
      free: true,
      plans: []
    }
  }
}

// 根据路由参数获取工具
const tool = mockTools[props.id as string]

if (!tool) {
  // 如果找不到，显示 404
  throw createError({
    statusCode: 404,
    statusMessage: 'Tool not found'
  })
}

const selectPlan = (planId: string) => {
  console.log('Selected plan:', planId)
}

const createError = (options: {
  statusCode: number,
  statusMessage?: string
}) => {
  if (options.statusCode) {
    console.error('Error:', options.statusMessage)
    throw options
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
}

.breadcrumb-item {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-item:hover {
  color: #1890ff;
}

.separator {
  color: #ccc;
}

.current {
  color: #1a1a1a1a1a1a1a1a1a1a;
  font-weight: 600;
  font-size: 1.25rem;
}

.tool-info {
  background: white;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 40px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0, 0.04);
}

.info-header {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-content {
  flex: 1;
}

.info-header {
  display: flex;
  gap: 16px;
}

.name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a1a1a1a;
}

.description {
  color: #666;
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 12px;
}

.website-link {
  color: #409eff;
  text-decoration: none;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 4px;
}

.website-link:hover {
  color: #1890ff;
}

.section {
  margin-top: 40px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a1a1a;
  margin-bottom: 20px;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  padding: 4px 12px;
  background: #f5f5f5;
  color: white;
  border-radius: 4px;
  font-size: 0.875rem;
}

.pricing-section {
  margin-top: 40px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a1a1a1a;
  margin-bottom: 24px;
}

.plans {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.plan-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;
}

.plan-card:hover {
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.plan-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a1a1a1a;
  margin-bottom: 12px;
}

.plan-price {
  display: flex;
  gap: 12px;
  align-items: baseline;
}

.plan-amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a1a1a1a1a;
}

.plan-currency {
  color: #999;
  font-size: 0.875rem;
  margin-left: 4px;
}

.plan-period {
  color: #666;
  font-size: 0.875rem;
}

.plan-price-amount {
  margin-right: 8px;
  color: #409eff;
  font-size: 1.5rem;
  font-weight: 700;
}

.price-currency {
  color: #999;
  font-size: 0.875rem;
  margin-left: 4px;
}

.plan-period {
  color: #666;
  font-size: 0.875rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .plans {
    grid-template-columns: repeat(1, 1fr);
  }

  .tool-info {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .breadcrumb {
    flex-wrap: wrap;
    justify-content: center;
  }

  .info-header {
    flex-direction: column;
  }
}
</style>

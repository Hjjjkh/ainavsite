<template>
  <div class="container">
    <div class="grid grid-cols-4 gap-6">
      <!-- Tool cards will be dynamically generated -->
      <div v-for="i in 12" :key="i" class="tool-card">
        <div class="card-header">
          <div class="tool-icon">🤖</div>
          <h3 class="tool-name">AI Tool {{ i }}</h3>
          <p class="tool-description">AI tool description</p>
          <div class="tool-tags">
            <span class="tag">文本生成</span>
            <span class="tag">免费</span>
            <span class="tag">推荐</span>
          </div>
        </div>
        <div class="card-actions">
          <button class="action-btn">❤️ 收藏</button>
          <button class="action-btn">🔍 对比</button>
        </div>
      </div>
    </div>

    <div class="categories-section">
      <h2>热门分类</h2>
      <div class="grid grid-cols-2 gap-6">
        <div v-for="i in 10" :key="i" class="category-card">
          <h3>{{ i }}. 文本生成</h3>
          <p>{{ i * 50 + 100 }} 个工具</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tools = ref([])

onMounted(() => {
  // TODO: 从 API 获取工具数据
  // 这里先用模拟数据
  tools.value = Array.from({ length: 12 }, (_, i) => ({
    id: `tool-${i}`,
    name: `AI Tool ${i}`,
    description: `AI tool description`,
    category: '文本生成',
    tags: ['AI', '免费', '推荐'],
    icon: '🤖',
    website: `https://example.com/tool/${i}`
  }))
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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

.categories-section {
  margin-top: 40px;
  }
  
.categories-section h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.grid-cols-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.tool-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  background: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.tool-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.tool-icon {
  font-size: 32px;
}

.tool-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
}

.tool-description {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
  margin-bottom: 12px;
  line-height: 1.5;
}

.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  background: #f3f4f6;
  color: #10b981;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: #f3f4f6;
  color: #1a1a1a;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #10b981;
  color: white;
}

.category-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  background: white;
  cursor: pointer;
}

.category-card:hover {
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.category-card h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.category-card p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

@media (max-width: 768px) {
  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-cols-2 {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>

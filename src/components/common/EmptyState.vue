<!-- src/components/common/EmptyState.vue -->
<template>
  <div class="empty-state">
    <div class="empty-icon">
      <i class="el-icon-loading"></i>
    </div>
    <p class="text">数据加载中...</p>
  </div>
</template>

<script setup lang="ts">
// 空状态组件（用于数据加载失败或无数据时显示）
interface Props {
  icon?: string
  text?: string
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  icon: 'el-icon-loading',
  text: '数据加载中...'
})
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.text {
  color: #666;
  font-size: 1rem;
  margin: 0;
}
</style>

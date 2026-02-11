<template>
  <div class="container">
    <!-- Breadcrumb -->
    <div class="breadcrumb">
      <router-link to="/" class="breadcrumb-item">首页</router-link>
      <span class="separator">></span>
      <router-link :to="`/category/${tool.category}`" class="breadcrumb-item">{{ tool.category }}</router-link>
      <span class="separator">></span>
      <router-link :to="`/tool/${tool.slug}`" class="breadcrumb-item">{{ tool.name }}</router-link>
    </div>

    <!-- Tool Info -->
    <div class="tool-info">
      <!-- Header: Icon + Title + Name -->
      <div class="tool-header">
        <div class="tool-icon" :style="{ backgroundImage: `url(${tool.icon})` }">
          {{ tool.icon || '🤖' }}
        </div>
        <div class="tool-header-content">
          <h1 class="tool-title">{{ tool.name }}</h1>
          <div class="tool-meta">
            <span class="tag category">{{ tool.category }}</span>
            <el-rate v-model="tool.rating.average" :disabled="true"></el-rate>
            <span class="rating-count">({{ tool.rating.count }} 投票)</span>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="tool-description">
        <h2 class="section-title">工具简介</h2>
        <p class="description-text">{{ tool.description }}</p>
      </div>

      <!-- Tags & Category -->
      <div class="tags-section">
        <h2 class="section-title">标签和分类</h2>
        <div class="tags-container">
          <router-link 
            v-for="tag in tool.tags" 
            :key="tag"
            :to="`/tag/${tag}`"
            class="tag"
          >
            {{ tag }}
          </router-link>
        </div>
      </div>

      <!-- Pricing -->
      <div v-if="tool.pricing.plans && tool.pricing.plans.length > 0" class="pricing-section">
        <h2 class="section-title">价格方案</h2>
        <div class="pricing-container">
          <div v-for="plan in tool.pricing.plans" :key="plan.id" class="pricing-card">
            <h3 class="plan-name">{{ plan.name }}</h3>
            <div class="plan-price">
              <span class="plan-amount">{{ plan.price }}</span>
              <span class="plan-period">/ {{ plan.period }}</span>
            </div>
            <div class="plan-features">
              <h4 class="feature-list">特性：</h4>
              <ul>
                <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>
            <el-button
              type="primary"
              @click="selectPlan(plan.id)"
              :disabled="selectedPlan === plan.id"
            >
              选择此方案
            </el-button>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="features-section">
        <h2 class="section-title">核心功能</h2>
        <ul class="feature-list">
          <li v-for="feature in tool.features" :key="feature">{{ feature }}</li>
          <li v-for="feature in tool.features" :key="feature">{{ feature }}</li>
        </ul>
      </div>

      <!-- Screenshots -->
      <div v-if="tool.screenshots && tool.screenshots.length > 0" class="screenshots-section">
        <h2 class="section-title">工具截图</h2>
        <div class="screenshots-grid">
          <div 
            v-for="(ss, index) in tool.screenshots" 
            :key="index"
            class="screenshot-item"
          >
            <el-image
              :src="ss"
              :fit="cover"
              :preview-src="ss"
              class="screenshot-image"
              :lazy="true"
            />
            <div class="screenshot-info">
              <div class="screenshot-meta">截图 {{ index + 1 }}</div>
            <div class="screenshot-desc">{{ tool.description }}</div>
          </div>
        </div>
      </div>

      <!-- Reviews -->
      <div v-if="tool.reviews && tool.reviews.length > 0" class="reviews-section">
        <h2 class="section-title">用户评价</h2>
        <div class="reviews-list">
          <div v-for="review in tool.reviews" :key="review.id" class="review-item">
            <div class="review-header">
              <div class="review-avatar">
                {{ review.author.charAt(0) }}
              </div>
              <div class="review-info">
                <div class="review-author">{{ review.author }}</div>
                <div class="rating-display">
                  <el-rate 
                    v-model="review.rating" 
                    :disabled="true" 
                    :score="review.rating"
                  ></el-rate>
                </div>
              <div class="review-date">{{ formatDate(review.createdAt) }}</div>
            </div>
            <el-divider />
            <div class="review-content">
              <p>{{ review.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Alternatives -->
      <div v-if="tool.alternatives && tool.alternatives.length > 0" class="alternatives-section">
        <h2 class="section-title">替代方案</h2>
        <div class="alternatives-grid">
          <div v-for="alt in tool.alternatives" :key="alt.id" class="alt-card">
            <div class="alt-icon">🔄</div>
            <div class="alt-info">
              <h3 class="alt-name">{{ alt.name }}</h3>
              <p class="alt-desc">{{ alt.description }}</p>
              <div class="alt-score">
                <el-rate
                  v-model="alt.rating"
                  :disabled="true"
                  :score="alt.rating"
                ></el-rate>
                <span class="rating-count">({{ alt.rating.count }} 投票)</span>
              </div>
            <el-button @click="goToTool(alt.id)" class="action-btn">
              查看详情
            </el-button>
          </div>
        </div>
      </div>

      <!-- AdSense Banner -->
      <div v-if="showAd" class="ads-section">
        <div class="ad-banner">
          <div class="ad-label">广告</div>
          <div id="ad-container" class="ad-container"></div>
        </div>
    </div>

    <!-- Floating Actions -->
    <div class="floating-actions">
      <el-button
        v-if="!isFavorite"
        @click="toggleFavorite"
        class="action-btn"
      >
        <i class="el-icon-star"></i>
      </el-button>
      <el-button
        @click="toggleCompare"
        class="action-btn"
      >
        <i class="el-icon-compare"></i>
      </el-button>
      <el-button @click="shareTool" class="share-btn">
        <i class="el-icon-share"></i>
      </el-button>
    </div>

    <!-- Return -->
    <div class="back-section">
      <el-button @click="goBack" class="back-btn">
        <i class="el-icon-back"></i>
        返回列表
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { Dayjs } from 'dayjs'

interface Props {
  tool: {
    id: string
    name: string
    slug: string
    description: string
    icon: string
    website: string
    category: string
    tags: string[]
    rating: {
      average: number;
      count: number;
    };
    features: string[];
    pricing: {
      free: boolean;
      plans: Plan[];
    };
    screenshots?: string[];
    video?: string;
    reviews?: Review[];
    alternatives?: string[];
    createdAt: Date;
    updatedAt: Date;
  }

interface Plan {
  id: string;
  name: string;
    price: number;
    currency: string;
    period: string;
    features: string[];
  }

interface Review {
  id: string;
  toolId: string;
    author: string;
    content: string;
    rating?: number;
    createdAt: Date;
    updatedAt: Date;
  }

const props = defineProps<Props>()

const route = useRoute()
const router = useRouter()
const isFavorite = ref(false)
const showAd = ref(false)
const selectedPlan = ref<number | null>(null)

const showAd = computed(() => {
  // 广告位置和配置（不影响首屏加载）
  return props.tool.rating.count > 10 && !isFavorite.value
})

const toggleFavorite = async () => {
  isFavorite.value = !isFavorite.value
  try {
    // TODO: 保存到 LocalStorage
    ElMessage.success('已添加到收藏')
  } catch (error) {
    ElMessage.error('收藏失败')
  }
}

const toggleCompare = () => {
  ElMessage('对比功能开发中...')
}

const shareTool = () => {
  const url = props.tool.website
  if (url) {
    window.open(url, '_blank')
  }
}

const selectPlan = (planId: string) => {
  selectedPlan.value = Number(planId)
  ElMessage.success(`已选择：${planId}`)
}

const goBack = () => {
  router.back()
}

const formatDate = (date: Date): string => {
  const d = new Date(date)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  
  if (days === 0) return '刚刚'
  if (days === 1) return '今天'
  if (days < 7) return `${days} 天前`
  
  return `${days}天前`
}

const goBack = () => {
  router.back()
}

// 初始化 AdSense（加载脚本）
onMounted(() => {
  if (!window.adsbygoogle) {
    showAd.value = false
    console.warn('AdSense 未加载')
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
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
  color: #d1d5db;
}

.tool-info {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 32px;
}

.tool-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.tool-icon {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.tool-header-content {
  flex: 1;
}

.tool-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.tool-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  }

.tag {
  padding: 4px 12px;
  border-radius: 4px;
  background: #e0f2ff;
  color: #1890ff;
  font-size: 14px;
  font-weight: 500;
}

.category {
  padding: 4px 12px;
  border-radius: 4px;
  background: #f3f4f6;
  color: #111;
  font-size: 14px;
  font-weight: 500;
}

.el-rate.is-disabled {
  opacity: 0.5;
}

.rating-count {
  font-size: 14px;
  color: #999;
  font-weight: 500;
}

.tool-description {
  font-size: 1rem;
  color: #666;
  margin: 32px 0;
  line-height: 1.6;
}

.description-text {
  margin: 0;
  padding: 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.tags-container {
  display: flex;
  gap: 12px;
}

.tag {
  padding: 6px 16px;
  border-radius: 8px;
  background: #f3f4f6;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tag:hover {
  background: #e0f2ff;
  color: #1890ff;
  cursor: pointer;
}

.tag a {
  background: #1890ff;
  color: #1890ff;
}

.pricing-section {
  margin-top: 60px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a1a;
  margin-bottom: 16px;
}

.pricing-container {
  display: grid;
  gap: 24px;
}

.pricing-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.pricing-card:hover {
  border-color: #1890ff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a1a1a;
  margin-bottom: 8px;
}

.plan-price {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a1a1a;
  margin-bottom: 8px;
}

.plan-amount {
  font-size: 2.25rem;
  font-weight: 600;
  color: #1a1a1a1a1a;
  margin-bottom: 8px;
}

.plan-period {
  font-size: 1rem;
  color: #666;
}

.plan-price-amount {
  font-size: 0.875rem;
  color: #999;
}

.plan-period {
  font-size: 0.875rem;
  color: #666;
}

.plan-price-amount {
  font-weight: 600;
}

.plan-period {
  font-size: 0.875rem;
  color: #666;
}

.feature-list {
  margin: 12px 0;
  padding: 0;
  list-style: disc;
}

.feature-list > li {
  margin: 8px 0;
  padding: 4px 0;
  padding-left: 24px;
}

.el-checkbox {
  margin-right: 8px;
}

.action-btn {
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  padding: 6px 16px;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #1890ff;
  border-color: #1890ff;
  color: white;
}

.el-button {
  margin-right: 8px;
  background: #1890ff;
  border-color: #1890ff;
  color: white;
}

.action-btn:primary {
  background: #1890ff;
  border-color: #1890ff;
}

.el-button.is-disabled {
  background: #dcdcdc;
  border-color: #b0b2fb;
  color: #999;
  cursor: not-allowed;
}

.feature-list > li {
  font-size: 0.875rem;
  color: #333;
}

.feature-list > ul {
  margin-bottom: 0;
}

.screenshots-section {
  margin-top: 60px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a1a1a1a;
  margin-bottom: 24px;
}

.screenshots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.screenshot-item {
  position: relative;
}

.screenshot-image {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.screenshot-info {
  text-align: center;
  margin-top: 12px;
}

.screenshot-meta {
  font-size: 0.875rem;
  color: #999;
}

.screenshot-desc {
  margin-top: 4px;
  font-size: 0.875rem;
  color: #666;
  line-height: 1.4;
}

.reviews-section {
  margin-top: 60px;
}

.section-title {
  font-size: -item-5rem;
  font-weight: 600;
  color: #1a1a1a1a1a1a;
  margin-bottom: 24px;
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-item {
  border-bottom: 1px solid #e5e7eb;
  padding: 24px;
  border-radius: 8px;
  background: white;
  transition: all 0.3s ease;
}

.review-item:hover {
  border-color: #1890ff;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.review-avatar {
  width: 40px;
  height: 40px;
  background: #f3f4f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a1a1a1a1a;
}

.review-author {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a1a1a1a;
  margin-bottom: 8px;
}

.review-info {
  flex: 1;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.el-rate {
  margin-right: 8px;
}

.rating-count {
  font-size: 14px;
  color: #999;
  font-weight: 500;
}

.review-date {
  font-size: 0.875rem;
  color: #999;
}

.review-content {
  margin-top: 8px;
  color: #333;
  line-height: 1.5;
}

.el-divider {
  margin: 12px 0;
}

.review-content {
  margin-bottom: 12px;
}

.review-item:last-child {
  margin-bottom: 0;
}

.el-divider:last-child {
  margin: 0;
}

.review-content {
  margin-top: 12px;
}

.alternatives-section {
  margin-top: 60px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color:1a1a1a1a1a1a1a1a;
  margin-bottom: 24px;
}

.alternatives-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.alt-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 32px;
  transition: all 0.3s ease;
  text-align: center;
}

.alt-card:hover {
  border-color: #1890ff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.alt-icon {
  font-size: 2rem;
}

.alt-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a1a1a1a1a;
  margin-bottom: 8px;
}

.alt-desc {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.5;
}

.alt-score {
  font-size: 0.875rem;
  color: #999;
}

.rating-count {
  margin: 8px;
 0;
 12px;
}

.action-btn {
  background: #1890ff;
  border-color: #1890ff;
  color: white;
  border-radius: 6px;
  padding: 8px 16px;
  margin-top: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #409eff;
 0;
  border-color: #349eff;
}

.action-btn.is-disabled {
  background: #f5f5f5;
  border-color: #d1d5db;
  color: #999;
  cursor: not-allowed;
}

.el-icon-back {
  font-size: 18px;
}

.el-icon-compare {
  font-size: 18px;
}

.el-icon-share {
  font-size: 18px;
}

.ads-section {
  margin-top: 60px;
}

.section-title {
  font-size: 1.5rem;
 font-weight: 600;
  color: #1a1a1a1a1a1a1a1a;
margin-bottom: 24px;
}

.ad-banner {
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.ad-label {
  text-align: center;
  color: #1a1a1a1a1a1a1a1a1a;
  margin-bottom: 8px;
}

.ad-container {
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.ad-label {
  color: #666;
}

.back-section {
  margin-top: 60px;
}

.back-btn {
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 6px 16px;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #f5f5f5;
  border-color: #1890ff;
}

.el-icon-back {
  font-size: 18px;
}

.action-btn {
  margin-right: 8px;
}

.action-btn {
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 6px 16px;
  color: #1a1a1a1a1a1a1a;
  margin-bottom: 8px;
}

.action-btn:hover {
  background: #1890ff;
  border-color: #1890ff;
  color: #1a1a1a1a1a1a1a;
}

.el-icon-star {
  font-size: 18px;
}

.el-icon-compare {
  font-size: 18px;
}

.el-icon-share {
  font-size: 18px;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a1a1a1a1a;
}

.description-text {
  margin-bottom: 12px;
}

.el-rate {
  margin-right: 8px;
 0;
}

.rating-count {
  font-size: 14px;
  color: #999;
  font-weight: 500;
}

.review-date {
  font-size: 0.875rem;
  color: #999;
}

.review-item {
  padding-bottom: 12px;
}

.el-divider:last-child {
  margin-bottom: 0;
}

.review-content {
  margin-top: 12px;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-content {
  margin-top: 12px;
}

.feature-list > li {
  margin: 8px 0;
  padding: 0;
  padding-left: 24px;
}

.el-checkbox {
  margin-right: 8px;
}

.action-btn {
  background: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  padding: 6px 16px;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: #1890ff;
  border-color: #1890ff;
  color: #1a1a1a1a1a1a1a;
}

.el-icon {
  font-size: 18px;
}

.el-icon-compare {
  font-size: 18px;
}

.el-icon-share {
  font-size: 18px;
}

.el-checkbox.is-checked {
  background: #1890ff;
  border-color: #1890ff;
  border-color: #1890ff;
}

.feature-list > li {
  font-size: 0.875rem;
  color: #333;
}

.feature-list > ul {
  margin-bottom: 0;
}

.review-item {
  border-bottom: 1px solid #e5e7eb;
  padding: 24px;
  border-radius: 8px;
  background: white;
  transition: all 0.3s ease;
}

.review-item:hover {
  border-color: #1890ff;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-content {
  margin-top: 12px;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-content {
  margin-top: 12px;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-content {
  margin-top: 12px;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-content {
  margin-top: 12px;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-content {
  margin-top: 12px;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom:0;
}

.review-content {
  margin-top: 12px;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom:0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom:0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom:0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom:0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom:0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom:0;
}

.review-item:last-child {
  margin-bottom:0;
}

.review-item:last-child {
  margin-bottom:0;
}

.review-item:last-child {
  margin-bottom:0;
}

.review-item:last-child {
  margin-bottom: 0;
}

.review-item:last-child {
  margin-bottom:0;
}

.review-item:last-child {
 margin-bottom: 0;
}
</style>

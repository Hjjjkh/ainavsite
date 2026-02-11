import { defineConfig } from '@nuxt/config'

export default defineConfig({
  ssr: false,
  
  app: {
    head: {
      title: 'AI Navigation Site - A platform to discover and access high-quality AI tools and resources',
      meta: [
        {
          name: 'description',
          content: 'A platform to discover and access high-quality AI tools and resources'
        },
        {
          name: 'keywords',
          content: 'AI tools, AI navigation, AI directory, AI search, AI tools directory'
        },
        {
          name: 'author',
          content: 'AI Navigation Team'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0'
        }
      ]
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@pinia/plugin-persistedstate',
    '@nuxtjs/seo'
  ],

  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.ico'
        }
      ]
    }
  },

  compatibilityDate: '2026-02-11',
  
  runtimeConfig: {
    publicPath: '/',
    
    // 默认主题配置
    theme: {
      defaultColor: '#3b82f6',
      darkColor: '#121212',
      textColor: '#e0e0e0'
    }
  }
})

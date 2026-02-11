import { defineConfig } from '@nuxt/config'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default defineConfig({
  app: {
    head: {
      title: 'AI Navigation Site - A platform to discover and access high-quality AI tools',
      meta: [
        {
          name: 'description',
          content: 'A platform to discover and access high-quality AI tools and resources'
        },
        {
          name: 'keywords',
          content: 'AI tools, AI navigation, AI directory, AI search, AI tools discovery'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          name: 'charset',
          content: 'utf-8'
        },
        {
          name: 'robots',
          content: 'index, follow'
        }
      ]
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@element-plus/nuxt',
    '@pinia/plugin-persistedstate',
    '@nuxtjs/seo',
    '@pinia-plugin-persistedstate'
  ],

  css: [
    '~/assets/css/main.css',
    'element-plus/dist/index.css'
  ],

  imports: {
    iconsPath: '~/node_modules/element-plus/dist/fonts', // Note: Element Plus icons may need manual adjustment
  },

  pinia: {
    persist: true
  }
})

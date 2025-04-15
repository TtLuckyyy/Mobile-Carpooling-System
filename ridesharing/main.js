import App from './App'
import store from '@/store'  // 确保路径正确

// #ifndef VUE3
// ============= Vue 2 模式 =============
import Vue from 'vue'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store  // Vue 2 注入store
})
app.$mount()
// #endif

// #ifdef VUE3
// ============= Vue 3 模式 =============
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  
  // 关键：Vue 3 注入store
  app.use(store)
  
  return {
    app,
    store  // 返回store供SSR使用
  }
}
// #endif
import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  mounted() {
    setTimeout(() => {
      document.dispatchEvent(new Event('custom-render-trigger'))
    }, 5000)
    // document.dispatchEvent(new Event('custom-render-trigger')) //与vue.config.js（renderAfterDocumentEvent）事件一致
  }
}).$mount('#app')

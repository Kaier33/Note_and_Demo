import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MetaInfo from 'vue-meta-info'
Vue.use(MetaInfo)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    setTimeout(() => {
      document.dispatchEvent(new Event('render-event'))
    }, 5000)
    // document.dispatchEvent(new Event('render-event')) //与vue.config.js（renderAfterDocumentEvent）事件一致
  }
}).$mount('#app')

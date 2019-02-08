// import Vue from 'vue'
// import Vuex from 'vuex'

// import geo from './modules/geo'
// import home from './modules/home'

// Vue.use(Vuex)
// const store = () => new Vuex.Store({
//   modules: {
//     geo,
//     home
//   },
//   actions: { // 这里是拿不到this的, 因为还没有dom. 只能拿app
//     async nuxtServerInit({commit}, {req, app}) {
//       const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition')
//       commit('geo/setPosition', status === 200 ? {city, province} : {city: '', province: ''})
//       const {data: { code, menu}} = await app.$axios.get('/geo/menu')
//       commit('home/setMenu', code === 0 ? menu : [])
//     }
//   }
// })

// export const modules = {
//   geo,
//   home,
// }

export const actions = {
  async nuxtServerInit({commit}, {req, app}) {
    const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition')
    commit('geo/setPosition', status === 200 ? {city, province} : {city: '', province: ''})
    const {data: { code, menu}} = await app.$axios.get('/geo/menu')
    commit('home/setMenu', code === 0 ? menu : [])
  }
}


// export default store
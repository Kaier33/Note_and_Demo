
export const actions = { // 这里是拿不到this的, 因为还没有dom. 只能拿app
  async nuxtServerInit({commit}, {req, app}) {
    const {status, data: {province, city}} = await app.$axios.get('/geo/getPosition')
    commit('geo/setPosition', status === 200 ? {city, province} : {city: '', province: ''})
    const {data: { code, menu}} = await app.$axios.get('/geo/menu')
    commit('home/setMenu', code === 0 ? menu : [])
  }
}
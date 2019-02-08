<template>
  <div class="m-geo">
    <i class="el-icon-location"/>
    {{$store.state.geo.position.city}}
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>
    [广州 惠州 汕头]
  </div>
</template>

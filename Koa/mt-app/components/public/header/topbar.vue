<template>
  <el-row :gutter="0" class="m-header">
    <el-col :span="5">
      <geo/>
    </el-col>
    <el-col :span="5">
      <user/>
    </el-col>
    <el-col :span="14">
      <my-nav />
    </el-col>
  </el-row>
</template>
<script>
import Geo from "./geo.vue";
import User from "./user.vue";
import MyNav from './nav.vue'
export default {
  components: {
    Geo,
    User,
    MyNav
  }
};
</script>
<style lang="scss">
  @import "@/assets/css/public/layout.scss";
  @import '@/assets/css/public/header/index.scss';
</style>

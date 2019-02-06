<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <Emenu />
      </el-col>
      <el-col :span="19">
        <Elife />
      </el-col>
    </el-row>
    <el-row :span="24">
      3
    </el-row>
  </div>
</template>
<script>
import Emenu from '../components/index/menu.vue'
import Elife from "@/components/index/life.vue"
import Eartistic from "@/components/index/artistic.vue"
export default {
  components: {
    Emenu,
    Elife,
    Eartistic
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/index.scss";
.el-main {
  margin-top: 157px !important;
}
</style>

<template>
  <div class="about">
    <h1>async data</h1>
    <p>{{result}}</p>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      result: '233'
    }
  },
  methods: {
    getData() {
      axios.get('https://mock.kaier33.top/mock/5c00c531ab9b9d0016274123/dev_TXTJ/getUserInfo').then(
        res => {
          this.result = JSON.stringify(res)
        }
      )
    }
  },
  mounted() {
    this.getData()
  },
}
</script>

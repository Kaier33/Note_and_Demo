<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <h1>there is async data</h1>
    <p>{{result}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from 'axios'
export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      result: "233"
    };
  },
  methods: {
    getData() {
      axios
        .get(
          "https://mock.kaier33.top/mock/5c00c531ab9b9d0016274123/dev_TXTJ/mockGetKinsfolkOrders"
        )
        .then(res => {
          this.result = JSON.stringify(res);
          console.log(res);
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

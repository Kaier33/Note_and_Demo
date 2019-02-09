<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item, idx) in $store.state.home.menu" :key="idx" @mouseenter="mouseenter">
        <i :class="item.type"/>
        {{item.name}}
        <span class="arrow"/>
      </dd>
      <div class="detail" v-if="kind" @mouseenter="sover" @mouseleave="sout">
        <template v-for="(item, idx) in curdetail.child">
          <h4 :key="idx">{{item.title}}</h4>
          <span v-for="v in item.child" :key="v">{{v}}</span>
        </template>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: "",
      // menu: [
      //   {
      //     type: "food",
      //     name: "美食",
      //     child: [
      //       {
      //         title: "美食",
      //         child: ["代金券", "甜点", "饮品", "小吃", "快餐", "自助餐"]
      //       }
      //     ]
      //   },
      //   {
      //     type: "takeout",
      //     name: "外卖",
      //     child: [
      //       {
      //         title: "外卖",
      //         child: ["美团迈外"]
      //       }
      //     ]
      //   },
      //   {
      //     type: "hotel",
      //     name: "酒店",
      //     child: [
      //       {
      //         title: "酒店信息",
      //         child: ["经济学", "散散心", "鬼东西", "很好笑"]
      //       }
      //     ]
      //   }
      // ]
    };
  },
  computed: {
    curdetail: function() {
      // return this.menu.filter(item => item.type == this.kind)[0];
      return this.$store.state.home.menu.filter(item => item.type == this.kind)[0];
    }
  },
  methods: {
    mouseleave() {
      let self = this;
      self._timer = setTimeout(() => {
        self.kind = ''
      }, 150);
    },
    mouseenter(e) {
      this.kind = e.target.querySelector('i').className
    },
    sover() {
      clearTimeout(this._timer)
    },
    sout() {
      this.kind = ''
    }

  }
};
</script>

<style lang="scss">
.m-menu {
  .nav {
    .detail {
      h4 {
        color: #999 !important;
      }
    }
  }
}
</style>
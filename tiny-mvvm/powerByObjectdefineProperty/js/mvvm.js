class MVVM {
  constructor(options) {
    this.$el = options.el // 挂载 根节点 到实例上
    this.$data = options.data

    if (this.$el) {
      // 数据劫持. 把对象的所有属性添加 set 和 get 方法
      new Observer(this.$data)

      // 将数据代理到实例上.
      // 同样对数据进行劫持, 我们获取数据和修改数据的时候直接通过 this 或者 this.$data
      this.proxyData(this.$data)

      // 对数据和元素进行编译
      new Compile(this.$el, this)
    }
  }

  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key]
        },
        set(newVal) {
          data[key] = newVal
        }
      })
    })
  }
}

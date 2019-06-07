// 观察者的目的就是给需要变化的那个元素增加一个观察者，当数据变化后执行对应的方法
class Watcher {
  // args: mvvm的实例, 模板绑定的变量名, callback(cb视为更新数据到dom)
  constructor(vm, exp, callback) {
    this.vm = vm
    this.exp = exp
    this.callback = callback

    // 获取 之前的值
    this.value = this.get()
  }
  get() {
    // 获取实例上老值的方法

    // 将当前的 watcher 添加到 Dep 类的静态属性上
    Dep.target = this

    // 获取值触发数据劫持
    let value = CompileUtil.getVal(this.vm, this.exp)

    // 清空 Dep 上的 watcher , 防止重复添加
    Dep.target = null
    return value
  }
  update() {
    // 获取新值
    let newValue = CompileUtil.getVal(this.vm, this.exp)
    // 获取旧值
    let oldValue = this.value
    // 如果新值和旧值不相等, 就执行 callback 对 dom 进行更新
    if (newValue !== oldValue) {
      this.callback(newValue)
    }
  }
}

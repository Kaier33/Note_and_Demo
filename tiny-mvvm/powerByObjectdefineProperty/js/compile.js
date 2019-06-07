class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm

    if (this.el) {
      // 1. 先把这些真实DOM 移动到 内存中取 fragment
      let fragment = this.node2Fragment(this.el)

      // 2. 编译 => 提取想要的元素节点 v-model 和 文本节点 {{message}}
      this.compile(fragment)

      // 3. 把编译好的 fragment 塞回去到页面中去
      this.el.appendChild(fragment)
    }
  }
  // subsidiary methods
  isElementNode(node) {
    // 判断是不是 元素节点 eg: p div span
    return node.nodeType === 1
  }
  isDireactive(name) {
    // 是不是指令
    return name.includes('v-')
  }

  // core methods
  node2Fragment(el) {
    // 将整个元素放入到内存中去
    let fragment = document.createDocumentFragment()
    let firstChild
    while ((firstChild = el.firstChild)) {
      // 敲黑板!
      // ele.firstChild单独使用时, 仅返回元素下面第一个节点(包括空白符, 注释这些)
      // appendChild 和 firstChild 结合一起使用的时候, 事情就变得有趣了. 递归返回所有子节点, 注意,原有的子节点就不存在了 (ps. 如果需要, 可以用clone保存起来)
      fragment.appendChild(firstChild)
    }
    return fragment
  }

  compile(fragment) {
    // 编译文档碎片的方法
    let childNodes = fragment.childNodes // 子节点的集合
    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        // 是元素节点, 递归下去
        // 递归编译子节点
        this.compile(node)

        // 编译元素
        this.compileElement(node)
      } else {
        // 是文本节点
        this.compileText(node)
      }
    })
  }

  compileElement(node) {
    // 编译元素节点, 为了 处理 指令 v-xxx
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name
      if (this.isDireactive(attrName)) {
        // 取到v-xxx 对应的值, 放在节点中 ( v-model='msg', 取 msg)
        let exp = attr.value

        let [, type] = attrName.split('-') // 解构取值. [, type] = [v, model]. 返回model

        // 调用指令对应的方法
        CompileUtil[type](node, this.vm, exp)
      }
    })
  }

  compileText(node) {
    // 编译文本节点 为了找出 {{xxx}}, 并替换成xxx对应的数据
    let exp = node.textContent // 获取文本中的内容
    let reg = /\{\{([^}]+)\}\}/g // {{a}} {{b}}
    // 如果该本文节点是{{xxx}}的话, 使用text 指令的方法
    if (reg.test(exp)) {
      CompileUtil['text'](node, this.vm, exp)
    }
  }
}

CompileUtil = {
  // 获取实例上对应 值的方法
  getVal(vm, exp) {
    exp = exp.split('.') // 将匹配的值用 .  隔开, 如vm.data.a.b

    return exp.reduce((prve, next) => {
      return prve[next]
    }, vm.$data)
  },

  // 设置实例上对应的数据
  setVal(vm, exp, newVal) {
    exp = exp.split('.')
    return exp.reduce((prve, next, currentIndex) => {
      // 如果当前归并的为数组的最后一项, 则将新值设置到该属性
      if (currentIndex === exp.length - 1) {
        return prve[next] = newVal
      }
      return prve[next]
    }, vm.$data)
  },

  // 获取文本 {{}}中变量在 data 中对应的值
  getTextVal(vm, exp) {
    // 使用正则匹配出 {{ xxx }}中的变量名 , 在调用 getVal 从vm.data中取值
    // 这里注意 replace(str|reg, str|func) 写func的话, 注意他的参数. MDN
    return exp.replace(/\{\{([^}]+)\}\}/g, (...arg) => {
      return this.getVal(vm, arg[1])
    })
  },

  // 处理文本节点 {{}} 的方法
  text(node, vm, exp) {
    // 获取赋值的方法
    let updateFn = this.updater['textUpdater']

    // 获取data中的对应的变量的值
    let value = this.getTextVal(vm, exp)

    // 通过正则替换, 将取到数据中的值替换到 {{}}
    exp.replace(/\{\{([^}]+)\}\}/g, (...arg) => {
      // 解析时遇到了模板中需要替换为数据的变量时, 应该添加一个观察者
      // 当变量重新赋值时, 调用更新值节点到 Dom 的方法
      new Watcher(vm, arg[1], newValue => {
        // 如果数据变化了，文本节点应该重新获取依赖的数据更新文本中的内容
        updateFn && updateFn(node, newValue)
      })
    })
    // 首次设置值
    updateFn && updateFn(node, value)
  },

  // v-model 的方法
  model(node, vm, exp) {
    // 输入框处理
    // 获取赋值的方法
    let updateFn = this.updater['modelUpdater']

    // 获取 data 中对应的变量的值
    let value = this.getVal(vm, exp)

    // 这里应该加一个监控，数据变化了，应该调用 watch 的回调
    new Watcher(vm, exp, newValue => {
      updateFn && updateFn(node, newValue)
    })

    // 添加输入框事件实现双向绑定
    // v-model 双向数据绑定, 对 input 添加事件监听
    node.addEventListener('input', e => {
      // 获取输入的新值
      let newValue = e.target.value
      // 更新到节点
      this.setVal(vm, exp, newValue)
    })
    // 防止没有的指令解析时报错
    updateFn && updateFn(node, value)
  },
  updater: {
    // 文本更新
    textUpdater(node, value) {
      node.textContent = value
    },
    // 输入框更新
    modelUpdater(node, value) {
      node.value = value
    }
  }
}

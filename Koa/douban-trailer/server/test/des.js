class Boy {
  @speak('中文')
  run () {
    console.log('i can running')
    console.log('i can speak '+ this.language)
  }
}

function speak(language) {
  return function (target, key, descriptor) {
    console.log(target) // 被修饰的构造函数("类")
    console.log(key) // 修饰了哪个函数. 就@xxxx下面那一条
    console.log(descriptor) // 配置项, 比如 是否可写, 是否可枚举. 差不多就是object defineProperties
    target.language = language
    return descriptor
  }
}
// function speak(target, key, descriptor) {
//   console.log(target) // 被修饰的构造函数("类")
//   console.log(key) // 修饰了哪个函数. 就@xxxx下面那一条
//   console.log(descriptor) // 配置项, 比如 是否可写, 是否可枚举. 差不多就是object defineProperties
//   return descriptor
// }

const luke = new Boy()
luke.run()


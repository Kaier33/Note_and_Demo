export default {
  dbs: 'mongodb://127.0.0.1:27017/meituan', // 连接芒果
  redis: { // 连接 Redis
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp: { // 连接邮箱
    get host() { // 腾讯邮箱固定写法
      return 'smtp.qq.com'
    },
    get user() { // 唯一指定邮箱
      return '469439801@qq.com'
    },
    get pass() { // 授权码
      return 'hsnkoldmcwlrbihc'
    },
    get code() { // 随机验证码
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire() { // 获取过期时间(一分钟内有效)
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}

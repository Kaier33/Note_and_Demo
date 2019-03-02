const express = require('express');
const {
  buildSchema
} = require('graphql');
const graphqlHTTP = require('express-graphql');

// 定义scheme, 查询和类型, mutation
const schema = buildSchema(`
  input AccountInput {
    name: String
    age: Int
    sex: String
    department: String
  }

  type Account {
    name: String
    age: Int
    sex: String
    department: String
  }

  type Mutation {
    createAccount(input: AccountInput): Account
    updateAccount(id: ID!, input: AccountInput): Account
  }

  type Query {
    accouts: [Account]
  }
`)

// 模拟一个数据库 
const fakerDB = {}

// 定义查询对应的处理器
const root = {
  accouts: ()=> {
    const accounts = Object.keys(fakerDB).map((key) => fakerDB[key])
    return accounts
  },
  createAccount: ({input}) => { // 接收传入的Account , 并写入 "数据库" 
    fakerDB[input.name] = input // 这里把name作为一个主键
    return fakerDB[input.name]  // 返回创建的account
  },
  updateAccount: ({id, input}) => {
    const updatedAccount = Object.assign({}, fakerDB[id], input) // 将老的数据和新的数据合并成一个新的 对象, 从而实现更新
    fakerDB[id] = updatedAccount
    return updatedAccount
  }
}

const app = express();

const middleware = (req, res, next) => {
  console.log(req.headers)
  if (req.url.indexOf('/graphql') !== -1 && (!req.headers.cookie || req.headers.cookie.indexOf('auth') === -1)) {
    res.send(JSON.stringify({
      error: "你没有权限访问该接口"
    }))
    return;
  }
  next();
}

app.use(middleware);

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // 开启 graphQL web调试功能
}));

app.listen(3000, '127.0.0.1', function () {
  console.log('graphQL service is running...')
})
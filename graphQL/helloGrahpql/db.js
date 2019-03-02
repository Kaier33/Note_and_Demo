const express = require('express');
const {
  buildSchema
} = require('graphql');
const graphqlHTTP = require('express-graphql');
const mysql = require('promise-mysql')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database : 'test'
});
pool.getConnection().then(()=>{
  console.log("connect database were successfully")
}).catch((err)=>{
  console.log(err)
})

// 定义scheme, 查询和类型, mutation
const schema = buildSchema(`
  input AccountInput {
    username: String
    age: Int
    sex: String
    department: String
  }

  type Account {
    username: String
    age: Int
    sex: String
    department: String
  }

  type Mutation {
    createAccount(input: AccountInput): Account
    updateAccount(username: String!, input: AccountInput): Account
    deleteAccount(username: String): Boolean
  }

  type Query {
    accouts: [Account]
  }
`)

// 定义查询对应的处理器
const root = {
  accouts: async () => {
    const accounts = await pool.query('SELECT username, age, sex, department FROM graphql')
      .then(res => res)
      .catch(err => {
        console.log('查询失败')
        console.log(err.message)
      }) 
    return accounts
  },
  createAccount: async ({ input }) => { // 接收传入的Account , 并写入数据库
    let data = {
      username: input.username,
      sex: input.sex,
      age: input.age,
      department: input.department
    }
    const result =  await pool.query('INSERT INTO graphql SET ?', data)
      .then(() => data)
      .catch( err => {
        console.log('写入失败')
        console.log(err.message)
      })
    return result
  },
  updateAccount: async ({username, input}) => {
    const updatedAccount = await pool.query("UPDATE graphql SET ? WHERE username = ?", [input, username])
      .then(() => input)
      .catch(err => {
        console.log("更新失败")
        console.log(err.message)
      })
    return updatedAccount
  },
  deleteAccount: async ({username}) => {
    const result = await pool.query("DELETE FROM graphql WHERE username = ?", username)
      .then(() => true)
      .catch((err) => {
        console.log(err.message)
        return false
      })
    return result
  }
}

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true // 开启 graphQL web调试功能
}));

app.listen(3000, '127.0.0.1', function () {
  console.log('graphQL service is running...')
})
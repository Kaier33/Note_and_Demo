const express = require('express');
const { buildSchema } = require('graphql');
const graphqlHTTP = require('express-graphql');

// 定义scheme, 查询和类型
const schema = buildSchema(`
  type Account {
    name: String
    age: Int
    sex: String
    department: String
  }

  type Query {
    hello : String
    accountName: String
    age: Int
    interest: String
    account: Account
  }
`)

// 定义查询对应的处理器
const root = {
  hello: ()=>{
    return 'hellow world';
  },
  accountName: ()=>{
    return 'Kaier'
  },
  age: () =>{
    return 18
  },
  interest: () => {
    return 'PlayStation'
  },
  account: ()=>{
    return {
      name: 'Tom',
      age: '18',
      sex: 'male',
      department: '开发部'
    }
  }
}

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(3000, '127.0.0.1', function() {
  console.log('start service')
} )
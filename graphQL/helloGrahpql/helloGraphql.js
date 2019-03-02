const express = require('express');
const {
  buildSchema
} = require('graphql');
const graphqlHTTP = require('express-graphql');

// 定义scheme, 查询和类型
const schema = buildSchema(`
  type Account {
    name: String
    age: Int
    sex: String
    department: String
    salary(city: String): Int
  }

  type Query {
    hello : String
    accountName: String
    age: Int
    interest: String
    account(username: String): Account
    getClassMates(classNo: Int!): [String]
    
  }
`)

// 定义查询对应的处理器
const root = {
  hello: () => {
    return 'hellow world';
  },
  accountName: () => {
    return 'Kaier'
  },
  age: () => {
    return 18
  },
  interest: () => {
    return 'PlayStation'
  },
  account: ({username}) => {
    let obj = {
      name: username,
      age: '18',
      sex: 'male',
      department: '开发部',
      salary: ({city}) => {
        if (city === '深圳' || city === '北京' || city === '上海' || city === '广州') {
          return 10000
        }else {
          return 3000
        }
      }
    }

    return obj

  },
  getClassMates({classNo}) {
    let obj = {
      301: ['Tom', 'John', 'Maria'],
      402: ['Jack', 'Steven', 'Michal']
    }
    return obj[classNo]
  }
}

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

// 提供静态资源供用户访问
app.use(express.static('public'))

app.listen(3000, '127.0.0.1', function () {
  console.log('start service')
})
const express = require('express')
const graphql = require('graphql')
const graphqlHTTP = require('express-graphql')

// 定义schema. 查询和类型
// const schema = graphql.buildSchema(`
//   type Account {
//     name: String
//     age: Int
//     sex: String
//     department: String
//   }
//   type Query {
//     accout(username: String): Account
//   }
// `)

// // 定义查询对应的处理器
// const root = {
//   accout({username}) {
//     const name = username
//     const sex = "male"
//     const age = 18
//     const department = "开发部"
//     return {
//       name,
//       sex,
//       age,
//       department
//     }
//   }
// }

let AccoutType = new graphql.GraphQLObjectType({
  name: 'Accout',
  fields: {
    name: {type: graphql.GraphQLString},
    age: {type: graphql.GraphQLInt},
    sex: {type: graphql.GraphQLString},
    department: {type: graphql.GraphQLString}
  }
})

let queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    accout: {
      type: AccoutType,
      args: {
        username: {type: graphql.GraphQLString}
      },
      // 第一个参数是容器返回的, 第二个参数才是用户输入的
      resolve: function(_, {username}) {
        const name = username
        const sex = "male"
        const age = 18
        const department = "开发部"
        return {
          name,
          sex,
          age,
          department
        }
      }
    }
  }
})

const schema = new graphql.GraphQLSchema({query: queryType})

const app = express()

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}))

app.listen(3000, '127.0.0.1', function () {
  console.log('start service')
})
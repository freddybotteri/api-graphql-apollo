const { gql } = require('apollo-server-express');
  

module.exports =  gql`
  extend type Query {
    gethorasMes(id: Int!): [Horas]
  }


  type Horas {
    userid: Int!
	horainicio:String
	horafin:String
  }
`


const { gql } = require('apollo-server-express');
  

module.exports =  gql`
  extend type Query {
    getCheckin(id: Int!): Checkin

  }

  extend type Mutation {


    createCheckin (
      input: CheckinInput
    ): Checkin
  }


  input CheckinInput {
    user_nid:Int
    cki_vubicacion:String
    cor_nid:Int
    cki_vcomenario:String
  }

  type Checkin {
    cki_nid:Int!
    cki_vfechahora:String
    user_nid:Int
    cki_vubicacion:String
    cor_nid:Int
    cki_vcomenario:String


  }
`


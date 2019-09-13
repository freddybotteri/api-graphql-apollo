const { gql } = require('apollo-server-express');
  

module.exports =  gql`
  extend type Query {
    getQR(id: Int!): QR

  }

  extend type Mutation {


    createQR (
      id:Int
      input: QRInput
    ): QR
  }


  input QRInput {
      cod_vuuid:String
      user_nid:Int
      cod_vlatitud:String
      cod_vlongitud:String
  }

  type QR {
    cod_nid:Int
    cod_vuuid:String
    user_nid:Int
    cod_vlatitud:String
    cod_vlongitud:String

  }
`


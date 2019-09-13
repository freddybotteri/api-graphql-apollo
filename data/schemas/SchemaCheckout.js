const { gql } = require('apollo-server-express');
  

module.exports =  gql`
  extend type Query {
    getCheckout(id: Int!): Checkout

  }

  extend type Mutation {


    createCheckout (
      input: CheckoutInput
    ): Checkout
  }


  input CheckoutInput {
    user_nid:Int
    cko_vubicacion:String
    cor_nid:Int
    cko_vcomentario:String
  }

  type Checkout {
    cko_nid:Int!
    cko_vfechahora:String
    user_nid:Int
    cko_vubicacion:String
    cor_nid:Int
    cko_vcomentario:String
  }
`


const { gql } = require('apollo-server-express');
  

module.exports =  gql`

  extend type Query {

    getSueldos(ciaid: Int!): [Sueldo]

  }

  extend type Mutation {

    updateSueldo (
      id: Int!,input: SueldoInput
     ): Sueldo


     createSueldo (
      input: SueldoInput
    ): Sueldo
  }


  input SueldoInput {

    ext_vnombre: String
    ext_vdescripcion: String
    cia_nid: Int!
    ext_vsueldoxhora: String
    ext_vsueldohoraextra: String
  }

  type Sueldo {

    ext_nid: Int!
    ext_vnombre: String
    ext_vdescripcion: String
    cia_nid: Int!
    ext_vsueldoxhora: String
    ext_vsueldohoraextra: String

  }
`


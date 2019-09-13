const { gql } = require('apollo-server-express');
  

module.exports =  gql`
  extend type Query {
    getPerfiles: [Perfil]
    getPerfil(id: Int!): Perfil

  }

  extend type Mutation {
    updatePerfil (
      pefId: Int!,input: PerfilInput
     ): Perfil

     updatePerfilsts (
      pefId: Int!,sts: Int
     ): Perfil

     createPerfil (
      input: PerfilInput
    ): Perfil
  }


  input PerfilInput {
    pef_vdescripcion: String
    cia_nid: Int!
  }

  type Perfil {
    pef_nid: Int!
    pef_vdescripcion: String
    cia_nid: Int!
    pef_sts: Int

  }
`


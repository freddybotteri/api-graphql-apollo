const { gql } = require('apollo-server-express');
  

module.exports =  gql`
  extend type Query {
    getUsuarios: [Usuario]
    getUsuario(id: Int!): Usuario
    getmensajeadduser:Mensaje
  }

  extend type Mutation {
    updateUsuario (
      userId: Int!,input: UsuarioInput
     ): Usuario

     updateUsuariosts (
      userId: Int!,sts: Int
     ): Usuario

     createUsuario (
      input: UsuarioInput
    ): Usuario
  }
  extend type Subscription {
    not_usuarioAdd(input: UsuarioInput): Usuario
    messageuseradd: Mensaje
  }

   input UsuarioInput {
    user_vnombre: String
    user_vapellido: String
    user_vdni: String
    user_vtelefono: String
    user_vusuario: String
    user_vpassword: String
    user_perfil_id: Int
    user_stsregistro: Int
    cia_nid: Int
    user_dlastlogin: String

  }

  type Mensaje {
    datamsg:String
  }
  type Usuario {
    user_nid: Int!
    user_vnombre: String
    user_vapellido: String
    user_vdni: String
    user_vtelefono: String
    user_vusuario: String
    user_vpassword: String
    user_perfil_id: Int
    user_stsregistro: Int
    cia_nid: Int
    user_dlastlogin: String
    user_dfechacreacion: String
    user_sts:Int

  }
`


const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');
const { AuthenticationError, UserInputError } = require('apollo-server');

const {pubsub} = require('../subscription');
const { EVENTS } = require('../subscription');
//const { isAdmin, isAuthenticated } = require('./authorization');
const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

module.exports = {
      Query: {
        getUsuarios: async (parent, args, { models }) => {
          return await models.crearModeloUsuario.findAll();
        },
        getUsuario: async (parent, { id }, { models }) => {
          return await models.crearModeloUsuario.findByPk(id);
        },
        getmensajeadduser: async (parent, args, { models }) => {
          return await 'mensaje1';
        }
      },
     

      Mutation: {
        updateUsuario: async (_,{userId,input},{ models, secret ,io}) => {
          
          console.log(userId,input)
          const result = await models.crearModeloUsuario.update(
                 input,
                 {returning: true, where: {user_nid: userId} }
               );

          pubsub.publish(EVENTS.MESSAGE.CREATED, {
            messageuseradd: { datamsg:'Se act. user: '+result},
          });
          
          return result;
        },

        createUsuario: async (_,{input},{ models, secret ,io}) => {
          const usuario = await models.crearModeloUsuario.create(input);


          /*pubsub.publish(EVENTS.MESSAGE.CREATED, {
            messageuseradd: { datamsg:'Se creo un usuario nuevo: '+usuario.user_vnombre},
          });*/

          io.emit('[Usuario] Added',{sts:'ok',data:usuario});
          return usuario;
        },


        updateUsuariosts: async (_,{userId,sts},{ models, secret }) => {
          
           
          const result = await models.crearModeloUsuario.update(
                 {user_sts:sts},
                 {returning: true, where: {user_nid: userId} }
               );

          pubsub.publish(EVENTS.MESSAGE.CREATED, {
            messageuseradd: { datamsg:'Se act. user: '+result},
          });

          return result;
        },

      },


      Subscription: {
        not_usuarioAdd: {
            subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED)
          },

        messageuseradd: {
          subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED)
        },
      },
    
};
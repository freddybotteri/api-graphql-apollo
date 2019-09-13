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
        getPerfiles: async (parent, args, { models }) => {
          return await models.crearModeloPerfil.findAll();
        },
        getPerfil: async (parent, { id }, { models }) => {
          return await models.crearModeloPerfil.findByPk(id);
        }
      },
     

      Mutation: {
        updatePerfil: async (_,{pefId,input},{ models, secret }) => {
          
           
          const result = await models.crearModeloPerfil.update(
                 input,
                 {returning: true, where: {pef_nid: pefId} }
               );

          return result;
        },

        createPerfil: async (_,{input},{ models, secret }) => {
          const perfil = await models.crearModeloPerfil.create(input);

          return perfil;
        },


        updatePerfilsts: async (_,{pefId,sts},{ models, secret }) => {
          
           
          const result = await models.crearModeloPerfil.update(
                 {pef_sts:sts},
                 {returning: true, where: {pef_nid: pefId} }
               );

          return result;
        },

      },


      Subscription: {

      },
    
};
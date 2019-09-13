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
        getSueldos: async (parent, args, { models }) => {
          return await models.ModeloExtra.findAll();
        }
      },
     

      Mutation: {
        updateSueldo: async (_,{id,input},{ models, secret }) => {
          
           
          const result = await models.ModeloExtra.update(
                 input,
                 {returning: true, where: {ext_id: id} }
               );

          return result;
        },

        createSueldo: async (_,{input},{ models, secret }) => {
          const sueldo = await models.ModeloExtra.create(input);

          return sueldo;
        },


      }
    
};
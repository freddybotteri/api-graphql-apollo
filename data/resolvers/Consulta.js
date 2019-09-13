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
        gethorasMes: async (parent, {id}, { models,sequelize }) => {
               const horas =  await sequelize
                  .query('SELECT * from view_horasmes where userid = :id',
                    { replacements: { id: id }, type: sequelize.QueryTypes.SELECT }
                   );
               console.log(horas);
               return horas;
        },
      },
     

      Mutation: {

      },


      Subscription: {
        
      },
    
};
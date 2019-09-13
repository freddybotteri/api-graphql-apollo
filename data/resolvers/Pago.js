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
        getPagoInterval: async (parent, {id,fechaini,fechafin}, { models,sequelize }) => {
               const pagos =  await sequelize
                  .query('call proc_calculopago_interval(:id,:fechaini,:fechafin)',
                    { replacements: { id: id,fechaini:fechaini,fechafin:fechafin } }
                   );
               console.log(pagos);
               return pagos;
        },
      },
     

      Mutation: {

      },


      Subscription: {
        
      },
    
};
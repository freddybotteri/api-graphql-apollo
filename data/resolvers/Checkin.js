const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');
const { AuthenticationError, UserInputError } = require('apollo-server');

const {pubsub} = require('../subscription');
const { EVENTS } = require('../subscription');
//const { isAdmin, isAuthenticated } = require('./authorization');


var bcrypt = require('bcrypt');
const saltRounds = 10;


const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

module.exports = {
      Query: {

        getCheckin: async (parent, { id }, { models }) => {
          return await models.crearModeloCheckIn.findByPk(id);
        }
      },
     

      Mutation: {


        createCheckin: async (_,{input},{ models,sequelize }) => {

          try {
            /*primero se genera un numero aleatori de orden para el checki
            segundo se asigna ese cor_id al checkin*/
              let result = await sequelize.transaction( async (t) => {
 
                  let hastcorrelativo = '';
                  hastcorrelativo = bcrypt.hashSync(new Date().toLocaleString(), saltRounds);
                  return await models.crearModeloCorrelativo.create({
                    user_nid:input.user_nid,
                    cor_vorden:hastcorrelativo
                  }, {transaction: t}).then(correl => {
                    input.cor_nid = correl.cor_nid
                    input.user_stsregistro = 1;
                    return models.crearModeloCheckIn.create(input, {transaction: t});
                  })

              });
              return result.dataValues;
          } catch (err) {
              return err;
          }

        },




      },


      Subscription: {

      },
    
};
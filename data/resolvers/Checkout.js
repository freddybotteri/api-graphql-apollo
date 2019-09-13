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

        getCheckout: async (parent, { id }, { models }) => {
          return await models.crearModeloCheckout.findByPk(id);
        }
      },
     

      Mutation: {


        createCheckout: async (_,{input},{ models,sequelize }) => {

          try {
            /*
              primero veo si el user stsregistro esta en 1
              segundo ver el id del correlativo en el checkin
            */

              let result = await sequelize.transaction( async (t) => {

                  return await models.crearModeloUsuario.findAll({
                      where: {
                        user_nid: input.user_nid
                      }

                    }, {transaction: t}).then(user => {

                      if(user[0].dataValues.user_stsregistro == 1){

                          return models.crearModeloCheckIn.findAll({
                            where: {
                              user_nid: user[0].dataValues.user_nid
                            },
                            attributes:[[sequelize.fn('max', sequelize.col('cor_nid')),'max']]

                          }, {transaction: t}).then(checkin => {

                            input.cor_nid = checkin[0].dataValues.max;

                            models.crearModeloUsuario.update(
                             {user_stsregistro:0},
                             {returning: true, where: {user_nid: input.user_nid} }
                           );
                            return models.crearModeloCheckout.create(input, {transaction: t});
                          });

                        

                      }else{

                        return {dataValues:{}};

                      }
                    
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
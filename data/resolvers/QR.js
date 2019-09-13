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

        getQR: async (parent, { id }, { models }) => {
          return await models.ModeloQRvalido.findByPk(id);
        }
      },
     

      Mutation: {


        createQR: async (_,{id,input},{ models,sequelize }) => {

          //const QR = await models.ModeloQRvalido.create(input);

          //return QR;



          try {
            /*primero se elimina el codigo que ese de la compania de el ususrio 

            segundo genera el nuevo cod*/

              let QR = await sequelize.transaction( async (t) => {
 

                  return await sequelize.query('SELECT MAX(tr_codigoqr.cod_nid) AS cod FROM tr_compania INNER JOIN tr_user ON tr_user.cia_nid = tr_compania.cia_nid INNER JOIN tr_codigoqr ON tr_codigoqr.user_nid = tr_user.user_nid WHERE tr_user.user_nid = :id',
                    { replacements: { id: id} }, {transaction: t}).then(comp => {
                    console.log();
                    if(comp[0][0].cod){
                      models.ModeloQRvalido.destroy({
                          where: {
                              cod_nid:comp[0][0].cod
                          }
                      })
                      return models.ModeloQRvalido.create(input, {transaction: t});
                    }else{
                      throw new Error();
                    }

                    
                  })

              });
              console.log(QR.dataValues);
              return QR.dataValues;
          } catch (err) {
            console.log(err);
              return err;
          }
        },




      },


      Subscription: {

      },
    
};
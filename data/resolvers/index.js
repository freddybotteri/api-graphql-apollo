const { GraphQLDateTime } = require('graphql-iso-date');

const _ = require('lodash');
const Usuario = require('./Usuario');
const Autor = require('./Autor');
const Perfil = require('./Perfil');
const Checkin = require('./Checkin');
const Checkout = require('./Checkout');
const QR = require('./QR');
const Consulta = require('./Consulta');
const Pago = require('./Pago');
const Sueldo = require('./Sueldo');

const customScalarResolver = {
  Date: GraphQLDateTime,
};

module.exports = [
	//customScalarResolver,
	Usuario,
	Autor,
	Perfil,
	Checkin,
	Checkout,
	QR,
	Consulta,
	Pago,
	Sueldo
];


/*module.exports = _.merge(
 	//customScalarResolver,
	Usuario,
	Autor
)*/
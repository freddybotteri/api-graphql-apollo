const { gql } = require('apollo-server-express');
  

module.exports =  gql`
  extend type Query {
    getPagoInterval(id: Int!,fechaini:String,fechafin:String): [Pago]
  }


  type Pago {
	horajornada:String
	sueldo:String
	puesto:String
	sueldoextra:String
	userid:String
	hourin:String
	hourout:String
	unombre:String
	uapellido:String
	ufechaingreso:String
  }
`


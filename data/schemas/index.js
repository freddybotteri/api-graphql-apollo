const { gql } = require('apollo-server-express');

const SchemaUsuario = require('./SchemaUsuario');
const SchemaAutor = require('./SchemaAutor');
const SchemaPerfil = require('./SchemaPerfil');
const SchemaCheckin = require('./SchemaCheckin');
const SchemaCheckout = require('./SchemaCheckout');
const SchemaQR = require('./SchemaQR');
const SchemaConsulta = require('./SchemaConsulta');
const SchemaPago = require('./SchemaPago');
const SchemaSueldo = require('./SchemaSueldo');

// scalar Date
const linkSchema = gql`
 

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }

  type Subscription {
    _: String
  }

`;

module.exports = [
                  linkSchema,
                  SchemaUsuario,
                  SchemaAutor,
                  SchemaPerfil,
                  SchemaCheckin,
                  SchemaCheckout,
                  SchemaQR,
                  SchemaConsulta,
                  SchemaPago,
                  SchemaSueldo
                 ];

require('dotenv/config');

const cors = require('cors');

const morgan = require('morgan');
const http = require('http');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');
const express = require('express');
const bodyParser = require('body-parser');

const io       = require('./socketio/io');

const {
  ApolloServer,
  AuthenticationError,
} = require('apollo-server-express');





const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
//let redisStore = require('connect-redis');
const client  = redis.createClient();


const session_ = session({
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge:86400000 }
});

const sharedsession = require("express-socket.io-session");








const schema = require('./data/schemas');
const resolvers = require('./data/resolvers');
const {models,sequelize} = require('./data/database');


const app = express();

app.use(cors());

app.use(morgan('dev'));


app.use(session_);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

let routes = require('./routes/gets.index');
app.use('/', routes);
let postroutes = require('./routes/posts.index');
app.use('/', postroutes);

const getMe = async req => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
};


/* ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] 
              */

  const httpServer = http.createServer(app);
  //Socket io
    io.attach(httpServer);
    io.use(sharedsession(session_,[{autoSave: true}]));
   app.io = io;
    

/* ]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]] */

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  uploads: false,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log("conected client")
    },
    onDisconnect: (webSocket, context) => {
      console.log("inconected client")
    },
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        sequelize:sequelize,
        io:app.io
      };
    }

    if (req) {

      return {
        models,
        sequelize:sequelize,
        io:req.app.io
      };
    }
  },
});

server.applyMiddleware(
  { 
   app,
   path: '/graphql'
  });

server.installSubscriptionHandlers(httpServer);


const isTest = false;
const isProduction = true;



//sequelize.sync({ force: isTest || isProduction }).then(async () => {});
  httpServer.listen({ port }, () => {
    console.log(`Apollo Server on http://:${port}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://:${port}${server.subscriptionsPath}`);
  });


const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');
const { AuthenticationError, UserInputError } = require('apollo-server');

//const { isAdmin, isAuthenticated } = require('./authorization');

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
    expiresIn,
  });
};

const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
];

module.exports = {
    Query: {
      posts: () => {
        return null;
      },
      author: (_, { id }) => {
        return authors.find(a => a.id === id);
      }
    },

    Mutation: {
      upvotePost: (_,args) => {
        return null;;
      },
    }
};
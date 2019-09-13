
const { gql } = require('apollo-server-express');


module.exports = gql`
  extend type Query {
    posts: [Post]
    author(id: Int!): Author
  }

  extend type Mutation {
  upvotePost (
    postId: Int!
   ): Post
  }


   type Author {
    id: Int!
    firstName: String
    lastName: String
    posts: [Post]
  }

  type Post {
    id: Int!
    title: String
    author: Author
    votes: Int
  }
  

  `;

/*


*/
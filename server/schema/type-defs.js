const { gql } = require("apollo-server");

const typeDefs = gql`
    
    type User  {
      nickname: String!
      email: String!
      password: String!
    }
    type Post  {
      title: String!
      body: String!
      author: String!
      #published_at:
    }
    type Comment  {
      body: String!
      author: String!
      #published_at:
    }

    type Query {
      users: [User!]! 
    }

 `;

module.exports = { typeDefs };

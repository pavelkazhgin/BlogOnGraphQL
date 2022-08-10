

const { gql } = require("apollo-server");

const userType = gql`

  type User {
    id: ID!
    nickname: String!
    email: String!
    password: String!
  }

  type Query {
   users: [User!]!
  }

  input signIn {
  email: String!
  password: String!
}

type Mutation {
  signIn(input: signIn!): String!
}


`;

module.exports = {
  userType,
};

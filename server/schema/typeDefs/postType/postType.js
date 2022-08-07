

const { gql } = require("apollo-server");

const postType = gql`

  type Post {
    title: String!
    body: String!
    createdAt: String!
    User: String!
    authors_nickname: String!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): [Post!]!
  }

  input CreatePostInput {
    title: String!
    body: String!
    createdAt: String!
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post
  }
`;

module.exports = {
  postType
};


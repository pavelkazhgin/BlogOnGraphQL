

const { gql } = require("apollo-server");

const postType = gql`

  type Post {
    id: ID!
    title: String!
    body: String!
    createdAt: String!
    User: String!
    authors_nickname: String!
    author: String!
  }
 
  type Posts {
    countPosts: Int!
    countPages: Int!
    lastPage: Boolean!
    posts: [Post!]!
  }

  input getPosts {
    page: Int!
    per_page: Int!
  }

  type Query {
    posts(posts: getPosts!): Posts!
    post(id: ID!) : Post!
      
  }

  input CreatePostInput {
    title: String!
    body: String!
    createdAt: String!
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }
`;

module.exports = {
  postType
};


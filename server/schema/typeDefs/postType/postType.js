

const { gql } = require("apollo-server");

const postType = gql`

  type Post {
    title: String!
    body: String!
    createdAt: String!
    User: String!
    authors_nickname: String!
  }
 
  type Posts {
    Posts: [Post!]!
  }

  type Info{
    countPosts: Int!
    countPages: Int!
    lastPage: Boolean!
  }
  
  union Pagination = Posts | Info

  input getPosts {
    page: Int!
    per_page: Int!
  }

  type Query {
    posts(posts: getPosts!): Pagination
    post(id: ID!) : [Post!]
      
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


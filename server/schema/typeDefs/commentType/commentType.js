const { gql } = require("apollo-server");

const commentType = gql`

type Comment {
    body: String!
    user_id: Int!
    post_id: Int!
    createdAt: String!
    author: String!
  },

  input newComment{
    body: String!
    post_id:Int!
  }

type Query{
  comments(input: Int!): [Comment!]!
}

type Mutation{
  newComment(input: newComment!): Comment!
}
  
`

module.exports = {
  commentType
};

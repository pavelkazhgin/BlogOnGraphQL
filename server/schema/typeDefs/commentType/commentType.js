const { gql } = require("apollo-server");

const commentType = gql`

type Comment {
    body: String!
    user_id: Int!
    post_id: Int!
    createdAt: String!
  },


  
`

module.exports = {
  commentType
};

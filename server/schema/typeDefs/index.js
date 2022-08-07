// const { gql } = require("apollo-server");
const { userType } = require("./userType/userType");
const { postType } = require("./postType/postType");
const { commentType } = require("./commentType/commentType");

// console.log(query, '----->', userType)
const typeDefs = [ userType, postType, commentType ]; 

module.exports = { typeDefs };

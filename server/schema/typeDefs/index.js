const { userType } = require("./userType/userType");
const { postType } = require("./postType/postType");
const { commentType } = require("./commentType/commentType");


const typeDefs = [ userType, postType, commentType ]; 

module.exports = { typeDefs };

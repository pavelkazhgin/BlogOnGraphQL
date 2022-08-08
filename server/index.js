require("dotenv").config();

const { ApolloServer } = require("apollo-server");

const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./schema/resolvers");
const { decodedToken } = require('./utils/tokenUtils');
const  models  = require('./db/models')
// console.log('Это то что мозги ', typeDefs[0].definitions[0].fields[0])
// console.log('Это то что мозги ', resolvers[0])

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({ req }) => { 
    models;
    try{
      const payload = decodedToken(req)
      // console.log('This is req -->', req)
      if(payload) {
      //  console.log('This is token -->', payload)
       return { models, payload }
      }
      // console.log('idet suda', models )
      return { models }
    } catch (error) {
      console.log(error)
    }  
  },
}); 

server.listen().then(({ url }) => {
  console.log(`Your API is running at: ${url}`);
})

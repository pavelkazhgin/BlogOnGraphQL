const request = require("supertest");
const { resolvers, typeDefs } = require("../index");
const { ApolloServer } = require("apollo-server");
const models = require("../db/models");
const expect = require("chai").expect;


describe("Comment", () => {
    let server
    afterEach(async () => {
        await server.stop();
        if(server.stop()){
          console.log('Server is stop')
        }
    });

    const payload = {
      idUser: 1,
      nicknameUser: "John",
  };

    describe("Mutation", () => {
        it("newComment", async () => {
            const query = `
                mutation {
                  newComment(
                    input: {
                          body: "Создан новый комментарий к посту 3",
                          post_id: 3,
                        }
                    ){ 
                      body
                      post_id
                      author
                      createdAt
                    }
                }
            `;

            
            server = new ApolloServer({ resolvers, typeDefs, context: {models, payload}});
            const { server: httpServer } = await server.listen({ port: 0 });
             const { body } = await request(httpServer)
            .post("/")
            .set("content-type", "application/json")
            .send(JSON.stringify({ query }))
            .expect(200);
            expect(body.data).to.have.property('newComment');
            expect(body.data.newComment).to.be.a("object");
            expect(body.data.newComment).to.have.property('body' && 'post_id' && 'author' && 'createdAt');
            expect(body.data.newComment.post_id).to.equal(3);
        });
    });   
})

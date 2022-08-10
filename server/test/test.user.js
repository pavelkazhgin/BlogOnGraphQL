const request = require("supertest");
const { resolvers, typeDefs } = require("../index");
const { ApolloServer } = require("apollo-server");
const models = require("../db/models");
const expect = require("chai").expect;


describe("User", () => {
    let server
    afterEach(async () => {
        await server.stop();
        if(server.stop()){
          console.log('Server is stop')
        }
    });

    describe("Mutation", () => {
        it("signIn", async () => {
            const query = `
                mutation {
                  signIn(
                        input: {
                            email: "pablo@gmail.exmpl",
                            password: "123",
                        }
                    )
                }
            `;

            server = new ApolloServer({ resolvers, typeDefs, context: {models}});
            const { server: httpServer } = await server.listen({ port: 0 });
             const { body } = await request(httpServer)
            .post("/")
            .set("content-type", "application/json")
            .send(JSON.stringify({ query }))
            .expect(200);
            expect(body.data.signIn).to.be.a("string");
            expect(body.data).to.have.property('signIn');
            expect(body.data.signIn.split('.')).to.be.a('array');
            expect(body.data.signIn.split('.')).to.lengthOf(3);
        });

        it("return apollo error", async () => {
           const query = `
                  mutation {
                    signIn(
                          input: {
                              email: "pablo@gmail.exmpl",
                              password: "453"
                          }
                      )
                  }
              `; 
            server = new ApolloServer({  resolvers, typeDefs, context: {models},});
            const { server: httpServer } = await server.listen({ port: 0 });
            const { body } = await request(httpServer)
                .post("/")
                .set("content-type", "application/json")
                .send(JSON.stringify({ query }))
                .expect(200);
                expect(body.errors[0]).to.have.property("message");
                expect(body.errors[0].message).to.be.a('string');
        });
    });

    describe("Query", () => {
      it("Users", async () => {
          const query = `
              mutation {
                signIn(
                      input: {
                          email: "pablo@gmail.exmpl",
                          password: "123",
                      }
                  )
              }
          `;

          server = new ApolloServer({ resolvers, typeDefs, context: {models}});
          const { server: httpServer } = await server.listen({ port: 0 });
           const { body } = await request(httpServer)
          .post("/")
          .set("content-type", "application/json")
          .send(JSON.stringify({ query }))
          .expect(200);
          expect(body.data.signIn).to.be.a("string");
          expect(body.data).to.have.property('signIn');
          expect(body.data.signIn.split('.')).to.be.a('array');
          expect(body.data.signIn.split('.')).to.lengthOf(3);
      });

      it("return apollo error", async () => {
         const query = `
                mutation {
                  signIn(
                        input: {
                            email: "pablo@gmail.exmpl",
                            password: "453"
                        }
                    )
                }
            `; 
          server = new ApolloServer({  resolvers, typeDefs, context: {models},});
          const { server: httpServer } = await server.listen({ port: 0 });
          const { body } = await request(httpServer)
              .post("/")
              .set("content-type", "application/json")
              .send(JSON.stringify({ query }))
              .expect(200);
              expect(body.errors[0]).to.have.property("message");
              expect(body.errors[0].message).to.be.a('string');
      });
  });
   
})

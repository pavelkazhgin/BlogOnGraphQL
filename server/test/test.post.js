const request = require("supertest");
const { resolvers, typeDefs } = require("../index");
const { ApolloServer } = require("apollo-server");
const models = require("../db/models");
const expect = require("chai").expect;

describe("Post", () => {
  let server;
  afterEach(async () => {
    await server.stop();
    if (server.stop()) {
      console.log("Server is stop");
    }
  });

  describe("Mutation", () => {
    it("Create new post", async () => {
      const query = `
                mutation {
                  createPost(
                        input: {
                            title: "test post",
                            body: "Created new post for test",
                            createdAt: "2022-08-10"
                        }
                    ){
                      title
                      body
                      createdAt
                      authors_nickname
                    }
                }
            `;
      const payload = {
        idUser: 1,
        nicknameUser: "John",
      };
      server = new ApolloServer({
        resolvers,
        typeDefs,
        context: { models, payload },
      });
      const { server: httpServer } = await server.listen({ port: 0 });
      const { body } = await request(httpServer)
        .post("/")
        .set("content-type", "application/json")
        .send(JSON.stringify({ query }))
        .expect(200);
      console.log("this is Body", body);
      expect(body.data).to.have.property("createPost");
      expect(body.data.createPost).to.be.a("object");
      expect(body.data.createPost).to.have.property("title");
      expect(body.data.createPost).to.have.property("body");
      expect(body.data.createPost).to.have.property("createdAt");
      expect(body.data.createPost).to.have.property("authors_nickname");
    });

    it("return apollo error", async () => {
      const query = `
      mutation {
        createPost(
              input: {
                  title: "test post",
                  body: "",
                  createdAt: "2022-08-10"
              }
          ){
            title
            body
            createdAt
            authors_nickname
          }
      }
  `;
      server = new ApolloServer({ resolvers, typeDefs, context: { models } });
      const { server: httpServer } = await server.listen({ port: 0 });
      const { body } = await request(httpServer)
        .post("/")
        .set("content-type", "application/json")
        .send(JSON.stringify({ query }))
        .expect(200);
      console.log("this is Body", body.errors[0]);
      expect(body.errors[0]).to.have.property("message");
      expect(body.errors[0].message).to.be.a("string");
    });
  });

  describe("Query", () => {
    describe('Posts', () => {
      it("It return page with per_page", async () => {
        const query = `
                query {
                  posts(
                    posts: {
                          page: 2,
                          per_page: 4
                        }
                    ){
                      posts{
                        title
                        body
                        createdAt
                        authors_nickname
                      }
                      lastPage
                      countPages
                      countPosts
                    }
                }
            `;
  
        server = new ApolloServer({ resolvers, typeDefs, context: { models } });
        const { server: httpServer } = await server.listen({ port: 0 });
        const { body } = await request(httpServer)
          .post("/")
          .set("content-type", "application/json")
          .send(JSON.stringify({ query }))
          .expect(200);
        console.log("this is Body", body)
        expect(body.data).to.be.a('object');
        expect(body.data.posts).to.have.property("posts" && "lastPage" && "countPages" && "countPosts");
        expect(body.data.posts).to.be.a('object');
      });
      
      it("return apollo error", async () => {
        const query = `
        query {
          posts(
            posts: {
                  page: 2,
                  per_page: 0
                }
            ){
              posts {
                title
                body
                createdAt
                authors_nickname
              }
              lastPage
              countPages
              countPosts
            }
        }
    `;
        server = new ApolloServer({ resolvers, typeDefs, context: { models } });
        const { server: httpServer } = await server.listen({ port: 0 });
        const { body } = await request(httpServer)
          .post("/")
          .set("content-type", "application/json")
          .send(JSON.stringify({ query }))
          .expect(200);
        console.log("this is Body", body.errors[0]);
        expect(body.errors[0]).to.have.property("message");
        expect(body.errors[0].message).to.be.a("string");
      });
    })
    
    describe('Post:Id', () => {
      it("It return post:Id", async () => {
        const query = `
          query {
            post(
              id : 2
                ){
                  title
                  body
                  createdAt
                  authors_nickname
                }
          }
        `;
  
        server = new ApolloServer({ resolvers, typeDefs, context: { models } });
        const { server: httpServer } = await server.listen({ port: 0 });
        const { body } = await request(httpServer)
          .post("/")
          .set("content-type", "application/json")
          .send(JSON.stringify({ query }))
          .expect(200);
        console.log("this is Body", body)
        expect(body.data).to.have.property("post");
        expect(body.data.post).to.be.a("object");
        expect(body.data.post).to.have.property("title" && "body" && "createdAt" && "authors_nickname");
        expect(body.data.post.title).to.be.a("string");
      });
    })
  });
});

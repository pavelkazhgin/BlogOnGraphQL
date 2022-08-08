
const pagination = require('../../../utils/paginationUtils')

const resolversPost = {
  Query: {
    async posts(parent, args, { models }) {
      const { page, per_page } = args.posts;
      const { Post } = models;
      if(!page && per_page && Post){
        return console.error();
      }
     const paginatedResults = await pagination(page, per_page, Post );
    //  console.log('paginatedResults', paginatedResults)
    // {[post:{}],post:[], {}}
      return console.log({paginatedResults});
    },

    async post(parent, { id }, { models }) {
      const currentPost = await models.Post.findAll({
        where: { id: Number(id) },
        include: [
          {
            model: models.User,
          },
        ],
      });
      let jsonPost = JSON.parse(JSON.stringify(currentPost));
      jsonPost[0].User = `${jsonPost[0].User.nickname}`;
      jsonPost[0] = { ...jsonPost[0], authors_nickname: `${jsonPost[0].User}` }
      console.log("Hahahha", jsonPost);
      return jsonPost;
    },

  },

  Mutation: {
    createPost: async (parent, args, { models, payload }) => {
      console.log("THIS is payload -->", payload, args);
      const { idUser, nicknameUser } = payload;
      const { title, body, createdAt } = args.input
      console.log("Release getPayload", idUser);
      const user_id = idUser;
      if (title && body && createdAt && user_id  && models) {
        try {
          const newPost = await models.Post.create({
            title,
            user_id,
            body,
          });
          console.log("------>> post create", newPost);
          let jsonnewPost = JSON.parse(JSON.stringify(newPost));
          jsonnewPost = { ...jsonnewPost, authors_nickname: nicknameUser};
          console.log("Hahahha", jsonnewPost);
          return jsonnewPost;
        } catch (error) {
          console.log(error);
          // return res.sendStatus(500);
        }
      }
      console.log('Non elements')
    }

  },
};

module.exports = { resolversPost };

const pagination = require("../../../utils/paginationUtils");

const resolversPost = {
  Query: {
    async posts(parent, args, { models }) {
      const { page, per_page } = args.posts;
      const { Post, User } = models;
      if (!page && per_page && Post) {
        return console.error();
      }
      const paginatedResults = await pagination(page, per_page, {Post, User});

      return paginatedResults;
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
      console.log(jsonPost)
      jsonPost[0].User = `${jsonPost[0].User.nickname}`;
      jsonPost[0] = { ...jsonPost[0], authors_nickname: `${jsonPost[0].User}` };
      return jsonPost[0];
    },
  },

  Mutation: {
    createPost: async (parent, args, context) => {
      const { models, payload } = context;
      const { idUser, nicknameUser } = payload;
      const { title, body, createdAt } =  (JSON.parse(JSON.stringify(args))).input;
      const author = `${process.env.API_URL}user/${idUser}`
      const user_id = idUser;
      if (title && body && createdAt && user_id && models) {
        try {
          const newPost = await models.Post.create({
            title,
            user_id,
            body,
            author,
          });
          let jsonnewPost = JSON.parse(JSON.stringify(newPost));
          jsonnewPost = { ...jsonnewPost, authors_nickname: nicknameUser };
          return jsonnewPost;
        } catch (error) {
          console.log(error);

        }
      }
    },
  },
};

module.exports = { resolversPost };

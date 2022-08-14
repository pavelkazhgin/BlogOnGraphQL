const { getToken } = require("../../../utils/tokenUtils");
require("dotenv").config();

const resolversComment = {
  Query: {
    async comments(parent, args, { models }) {
      const  post_id  = args.input;
      const { Comment } = models;
      if (!post_id && Comment) {
        return console.error();
      }
      const comments = await Comment.findAll({
        where: {post_id: post_id}
      })
      // console.log('This is comments', comments)
      return comments;
    },
  },

  Mutation: {
    newComment: async (parent, args, { models, payload }) => {
      const { idUser } = payload;
      const { body, post_id } = args.input;
      const author = `${process.env.API_URL}/user/${idUser}`;
      const user_id = idUser;
      if (post_id && body && user_id && models) {
        try {
          const newComment = await models.Comment.create({
            post_id,
            user_id,
            body,
            author,
          });
          return JSON.parse(JSON.stringify(newComment));
        } catch (error) {
          console.log(error);
        }
      }
      console.log("Non element");
    },
  },
};

module.exports = { resolversComment };

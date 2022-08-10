const { getToken } = require("../../../utils/tokenUtils");
require("dotenv").config();

const resolversComment = {
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

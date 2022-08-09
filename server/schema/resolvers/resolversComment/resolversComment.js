const { getToken } = require("../../../utils/tokenUtils");
require("dotenv").config();

const resolversComment = {
  Mutation: {
    newComment: async (parent, args, {models, payload}) => {
      // console.log("THIS is payload -->", payload, args);
      const { idUser } = payload;
      const { body, post_id } = args.newComment;
      const author = `${process.env.API_URL}/user/${idUser}` 
      // console.log("Release getPayload", idUser);
      const user_id = idUser;
      if (post_id && body && user_id && models) {
        try {
          const newComment = await models.Comment.create({
            post_id,
            user_id,
            body,
            author,
          });
          // console.log("------>> post create", newComment);
          // console.log("Hahahha", newComment);
          return JSON.parse(JSON.stringify(newComment));
        } catch (error) {
          console.log(error);
        }
      }
      console.log("Non element");
    }

  },


};

module.exports = { resolversComment };

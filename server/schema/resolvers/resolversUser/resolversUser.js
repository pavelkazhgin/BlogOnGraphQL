const { getToken } = require("../../../utils/tokenUtils");

const resolversUser = {
  Query: {
    async users(parent, args, { models }) {
      const allUsers = await models.User.findAll();
      return JSON.parse(JSON.stringify(allUsers));
    },
  },

  Mutation: {
    signIn: async (parent, args, { models }) => {
      const arguments = JSON.parse(JSON.stringify(args));
      const { password, email } = arguments.input;

      if (password && email && models) {
        try {
          const currentUser = await models.User.findOne({
            where: {
              email,
              password,
            },
          });

          if (!currentUser) throw new Error("Unable to Login");
          console.log(
            "This is currentUser",
            JSON.parse(JSON.stringify(currentUser))
          );
          const idUser = JSON.parse(JSON.stringify(currentUser)).id;
          const nicknameUser = JSON.parse(JSON.stringify(currentUser)).nickname;
          const emailUser = JSON.parse(JSON.stringify(currentUser)).email;
          const token = getToken({ idUser, nicknameUser, email: emailUser });
          return token;
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};

module.exports = { resolversUser };

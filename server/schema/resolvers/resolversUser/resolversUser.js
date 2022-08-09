const { getToken } = require("../../../utils/tokenUtils");

const resolversUser = {
  
  Query: {
    async user(parent, args, { models }) {
      // console.log('HAHAHA', models)
      const allUsers = await models.User.findAll();
      console.log(JSON.parse(JSON.stringify(allUsers)));
      return JSON.parse(JSON.stringify(allUsers));
    },
  },

  Mutation: {
    signIn: async (parent, args, { models }) => {
      const { password, email } = args.input;

      console.log("kdkjdkdk--->", args.input);

      if (password && email) {
        // try {
        const currentUser = await models.User.findOne({
          where: {
            email,
          },
        });

        if (!currentUser) throw new Error("Unable to Login");
        console.log(
          "This is currentUser",
          JSON.parse(JSON.stringify(currentUser))
        );
        const idUser = JSON.parse(JSON.stringify(currentUser)).id;
        const nicknameUser = JSON.parse(JSON.stringify(currentUser)).nickname;
        const email = JSON.parse(JSON.stringify(currentUser)).email;
        console.log("User_ID", idUser);
        const token = getToken({ idUser, nicknameUser, email });
        console.log("This is token", token);
        return token;

        //   } catch (error) {
        //     console.error(error);
        //     return res.sendStatus(500);
        //   }
        // }

        // return res.sendStatus(400);
      }
      return "HAHAHAHA ERORE";
    },
  },
};

module.exports = { resolversUser };

const { resolversUser } = require('./resolversUser/resolversUser');
const { resolversPost } = require('./resolversPost/resolversPost');
const { resolversComment  } = require('./resolversComment/resolversComment')

const resolvers = [resolversUser, resolversPost, resolversComment];

module.exports = {resolvers};

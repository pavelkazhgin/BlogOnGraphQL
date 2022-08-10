const jwt = require("jsonwebtoken");


const getToken = payload => {
  const token = jwt.sign(payload, "secret", {
      expiresIn: 604800, // 1 Week
  })
  return token
}

const decodedToken = (req) => {
  const header =  req.headers.authorization;
  if ( header ){
    const decoded = jwt.verify(`${header}`, "secret");
    return decoded;
  }

  return null
}

module.exports = {
  getToken,
  decodedToken,
}

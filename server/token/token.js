const jwt = require("jsonwebtoken");


const getToken = payload => {
  const token = jwt.sign(payload, "secret", {
      expiresIn: 604800, // 1 Week
  })
  return token
}

const decodedToken = (req) => {
  // console.log('Zahel in decoded with -->', header)
  const header =  req.headers.authorization;
  if ( header ){
    const decoded = jwt.verify(`${header}`, "secret");
    // console.log('This is token in decoded', decoded)
    return decoded;
  }

  return null
}

module.exports = {
  getToken,
  decodedToken,
}

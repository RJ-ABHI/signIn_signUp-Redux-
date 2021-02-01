const jwt = require("jsonwebtoken");

const jwtToken = (userId) => {
  return jwt.sign({ id: userId }, "" + process.env.JWT_SECRET_CODE, {
    expiresIn: "1m",
  });
};
module.exports = jwtToken;

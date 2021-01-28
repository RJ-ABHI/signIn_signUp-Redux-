const jwt = require("jsonwebtoken");

const jwtToken = (userId) => {
  return jwt.sign({ id: userId }, "" + process.env.JWT_SECRET_CODE, {
    expiresIn: "30d",
  });
};
module.exports = jwtToken;

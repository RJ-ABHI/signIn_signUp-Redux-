const asyncHandle = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../model/user");

const authMiddleWare = asyncHandle(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  //   console.log(jwtToken);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("admin")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      const decodeToken = jwt.verify(token, "" + process.env.JWT_SECRET_CODE);

      const findUser = await User.findById(decodeToken.id);

      req.findUser = findUser;
      // console.log(findUser);
      next();
    } catch (error) {
      res.status(404);
      throw new Error("invalid token");
    }
  }
});
module.exports = authMiddleWare;

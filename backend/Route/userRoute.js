const express = require("express");
const User = require("../model/user");

const asyncHandler = require("express-async-handler");
const authMiddleWare = require("../middleWare/authmiddleWare");
const jwtToken = require("../utils/jwtToken");
const userRoute = express.Router();

userRoute.post(
  "/user/register",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      throw new Error("User already Exist");
    }
    const user = await User.create({ name, email, password });
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
  })
);
userRoute.post(
  "/user/login",

  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });
    console.log(findUser);
    if (!findUser) {
      res.status(404);
      res.json({
        messege: "Email Not Found",
      });
    } else if (findUser) {
      const passwordMatch = await findUser.isPassword(password);
      console.log(passwordMatch);
      if (!passwordMatch) {
        res.status(404);
        res.json({
          messege: "passsword did not match",
        });
      } else if (passwordMatch) {
        res.json({
          id: findUser._id,
          name: findUser.name,
          email: findUser.email,
          password: findUser.password,
          token: jwtToken(findUser._id),
        });
      }
    }
  })
);
userRoute.get("/user", authMiddleWare, (req, res) => {
  //   console.log(req);
  res.send(req.findUser);
});

module.exports = userRoute;

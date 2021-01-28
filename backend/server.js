const express = require("express");
const UserRoute = require("./Route/userRoute");
require("./config/mongodbConnect")();
require("dotenv").config();
const cors = require("cors");
const error = require("./middleWare/errorMiddleWare");
const app = express();

//middleware
app.use(express.json());

app.use(cors());
//user Routes
app.use("/", UserRoute);

app.use(error.errorHandle);

const PORT = process.env.PORT || 2400;
app.listen(PORT, () => {
  console.log("my app is listing on port", PORT);
});

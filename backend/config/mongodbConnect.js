const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://abhi:PRbURgUrLJoHFAGe@cluster0.jmwhg.mongodb.net/blueThink",
      {
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
      }
    )
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
};

module.exports = dbConnect;

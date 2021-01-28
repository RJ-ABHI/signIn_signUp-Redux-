const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
  next();
});
userSchema.methods.isPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const user = mongoose.model("user", userSchema);
module.exports = user;

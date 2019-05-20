const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  tableName: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
});
module.exports = User = mongoose.model("user", UserSchema);

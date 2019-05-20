const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  order: [
    {
      type: String,
      required: true
    }
  ],
  date: {
    type: Date,
    default: Date.now()
  },
  tableName: {
    type: String,
    required: true
  },
  isSent: {
    type: Boolean,
    default: false,
    required: true
  }
});
module.exports = Order = mongoose.model("order", OrderSchema);

const { Schema, model } = require("mongoose");
const shipperSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  method: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "shipper",
  },
});

module.exports = model("shippers", shipperSchema);
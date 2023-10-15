const { Schema, model } = require("mongoose");

const logProductSchema = new Schema(
  {
    productId: {
      type: Schema.ObjectId,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    note: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("logproducts", logProductSchema);

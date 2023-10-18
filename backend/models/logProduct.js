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

logProductSchema.index(
  {
    fullname: "text",
    note: "text",
  },
  {
    weights: {
      fullname: 5,
      note: 4,
    },
  }
);

module.exports = model("logproducts", logProductSchema);

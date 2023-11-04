const { Schema, model } = require("mongoose");
const couponSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    minAmount: {
      type: Number,
    },
    maxAmount: {
      type: Number,
    },
    shopId: {
      type: String,
      required: true,
    },
    selectedProduct: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = model("coupons", couponSchema);

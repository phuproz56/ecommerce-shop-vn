const { responseReturn } = require("../../utils/response");
const cardModel = require("../../models/cardModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
class cardController {
  add_to_card = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      const product = await cardModel.findOne({
        $and: [
          {
            productId: {
              $eq: productId,
            },
          },
          {
            userId: {
              $eq: userId,
            },
          },
        ],
      });
      if (product) {
        responseReturn(res, 404, {
          error: "Product already added to card",
        });
      } else {
        const product = await cardModel.create({
          userId,
          productId,
          quantity,
        });
        responseReturn(res, 201, {
          message: "Add to card success",
          product,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  get_card_products = async (req, res) => {
    const { userId } = req.params;
    try {
      const card_products = await cardModel.aggregate([
        {
          $match: {
            userId: {
              $eq: new ObjectId(userId),
            },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "products",
          },
        },
      ]);
      let calculatePrice = 0;
      let card_product_count = 0;
      const outOfstockProduct = card_products.filter(
        (p) => p.products[0].stock < p.quantity
      );

      for (let i = 0; i < outOfstockProduct.length; i++) {
        card_product_count = card_product_count + outOfstockProduct[i].quantity;
      }

      const stockProduct = card_products.filter(
        (p) => p.products[0].stock >= p.quantity
      );

      for (let i = 0; i < outOfstockProduct.length; i++) {
        const { quantity } = stockProduct[i];
        card_product_count = card_product_count + quantity;
        const { price, discount } = stockProduct[i].products[0];
      }
      console.log(stockProduct)
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new cardController();

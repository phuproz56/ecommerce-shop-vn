const { response } = require("express");
const categoryModel = require("../../models/categoryModel");
const productModel = require("../../models/productModel");
const { responseReturn } = require("../../utils/response");
class homeControllers {
  formateProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };

  get_categorys = async (req, res) => {
    try {
      const categorys = await categoryModel.find({});
      responseReturn(res, 200, {
        categorys,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_products = async (req, res) => {
    try {
      const products = await productModel
        .find({})
        .limit(16)
        .sort({ createdAt: -1 });
      const allProduct1 = await productModel
        .find({})
        .limit(9)
        .sort({ createdAt: -1 });

      const latest_products = this.formateProduct(allProduct1);

      const allProduct2 = await productModel
        .find({})
        .limit(9)
        .sort({ rating: -1 });

      const topRated_products = this.formateProduct(allProduct2);

      const allProduct3 = await productModel
        .find({})
        .limit(9)
        .sort({ discount: -1 });

      const discount_products = this.formateProduct(allProduct3);

      responseReturn(res, 200, {
        products,
        latest_products,
        topRated_products,
        discount_products,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new homeControllers();

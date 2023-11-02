const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
const productModel = require("../../models/productModel");
const logProductModel = require("../../models/logProduct");
const { responseReturn } = require("../../utils/response");
const moment = require("moment");

class productController {
  add_product = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      let {
        name,
        category,
        description,
        stock,
        price,
        discount,
        shopName,
        brand,
      } = field;
      const { images } = files;
      name = name.trim();
      const slug = name.split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      try {
        let allImageUrl = [];

        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, {
            folder: "products",
          });
          allImageUrl = [...allImageUrl, result.url];
        }

        await productModel.create({
          sellerId: id,
          name,
          slug,
          shopName,
          category: category.trim(),
          description: description.trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
          brand: brand.trim(),
        });
        responseReturn(res, 201, { message: "Thêm sản phẩm thành công!" });
      } catch (error) {
        responseReturn(res, 500, { error: "Cần Điền Đầy Đủ" });
      }
    });
  };
  products_get = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;

    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      } else {
        const products = await productModel
          .find({ sellerId: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({ sellerId: id })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  product_get = async (req, res) => {
    const { productId } = req.params;
    let updateDate = {
      updatedAt: new Date(),
    };
    try {
      const product = await productModel.findById(productId);

      responseReturn(res, 200, { product, updateDate });
    } catch (error) {
      console.log(error.message);
    }
  };

  product_update = async (req, res) => {
    let { name, description, discount, price, brand, productId, stock } =
      req.body;
    name = name.trim();
    const slug = name.split(" ").join("-");
    const p = await productModel.findById(productId);
    const version = p.__v;
    try {
      const product = await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        discount,
        price,
        brand,
        productId,
        stock,
        slug,
        __v: version + 1,
      });
      responseReturn(res, 200, {
        product,
        message: "Update sản phẩm thành công!",
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  product_image_update = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, field, files) => {
      const { productId, oldImage } = field;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 404, { error: err.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
          });
          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: "products",
          });

          if (result) {
            let { images } = await productModel.findById(productId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;

            await productModel.findByIdAndUpdate(productId, {
              images,
            });

            const product = await productModel.findById(productId);
            responseReturn(res, 200, {
              product,
              message: "Update hình ảnh sản phẩm thành công!",
            });
          } else {
            responseReturn(res, 404, { error: "Upload hình ảnh thất bại!" });
          }
        } catch (error) {
          responseReturn(res, 404, { error: error.message });
        }
      }
    });
  };

  delete_product = async (req, res) => {
    const { productId } = req.params;
    try {
      await productModel.findByIdAndDelete(productId);
      responseReturn(res, 200, { message: "Xóa SP thành công!" });
    } catch (error) {
      console.log(error.message);
    }
  };

  logproduct_update = async (req, res) => {
    const { productId, fullname, stock, price, note } = req.body;
    try {
      await logProductModel.create({
        productId,
        fullname: fullname.trim(),
        stock: parseInt(stock),
        price: parseInt(price),
        note: note.trim(),
        date: moment(Date.now()).format("LLL"),
      });

      const product = await productModel.findById(productId);

      let stock_product = product.stock;

      let add_warehouse = 0;
      let update_price = 0;

      const log = await logProductModel.find({ productId });

      update_price = update_price + log.price;

      for (let i = 0; i < log.length; i++) {
        add_warehouse = log[i].stock;
        update_price = log[i].price;
      }
      add_warehouse = add_warehouse + stock_product;

      await productModel.findByIdAndUpdate(productId, {
        stock: add_warehouse,
        price: update_price,
      });

      responseReturn(res, 200, { message: "Lập phiếu thành công!!" });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_logproduct = async (req, res) => {
    const productId = req.params.productId;
    let { page, parPage, searchValue } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);
    try {
      if (searchValue) {
        const logProduct = await logProductModel
          .find({
            $text: { $search: searchValue },
            productId: productId,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });

        const totallogProduct = await logProductModel
          .find({
            $text: { $search: searchValue },
            productId: productId,
          })
          .countDocuments();

        responseReturn(res, 200, { totallogProduct, logProduct });
      } else {
        const logProduct = await logProductModel
          .find({ productId: productId })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totallogProduct = await logProductModel
          .find({ productId: productId })
          .countDocuments();
        responseReturn(res, 200, { totallogProduct, logProduct });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new productController();

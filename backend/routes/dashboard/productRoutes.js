const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const productController = require("../../controllers/dashboard/productController");

router.post("/product-add", authMiddleware, productController.add_product);
router.get("/products-get", authMiddleware, productController.products_get);
router.get(
  "/product-get/:productId",
  authMiddleware,
  productController.product_get
);
router.post(
  "/product-update",
  authMiddleware,
  productController.product_update
);
router.post(
  "/product-image-update",
  authMiddleware,
  productController.product_image_update
);

router.delete(
  "/product-delete/:productId",
  authMiddleware,
  productController.delete_product
);

router.post(
  "/logproduct-update",
  authMiddleware,
  productController.logproduct_update
);

router.get(
  "/logproduct-get/:productId",
  authMiddleware,
  productController.get_logproduct
);

// thêm coupon sản phẩm

router.post(
  "/coupon/create-coupon-code",
  authMiddleware,
  productController.create_coupon_code
);

router.get(
  "/coupon/get-coupon/:id",
  authMiddleware,
  productController.get_coupon
);

router.delete(
  "/coupon/delete-coupon/:id",
  authMiddleware,
  productController.delete_coupon
);

router.get(
  "/coupon/get-coupon-value/:name",
  productController.get_coupon_value
);

module.exports = router;

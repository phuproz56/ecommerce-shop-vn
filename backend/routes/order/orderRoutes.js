const router = require("express").Router();
const orderController = require("../../controllers/order/orderController");

router.post("/order/place-order", orderController.place_order);

module.exports = router;

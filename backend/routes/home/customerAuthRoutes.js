const customerAuthController = require("../../controllers/home/customerAuthController");
const { isCustomer } = require("../../middlewares/authMiddleware");
const router = require("express").Router();

router.post(
  "/customer/customer-register",
  customerAuthController.customer_register
);
router.post("/customer/customer-login", customerAuthController.customer_login);

router.get("/customer/logout", customerAuthController.customer_logout);

router.put(
  "/customer/change-password/",
  isCustomer,
  customerAuthController.change_password
);

router.put(
  "/customer/update-address/",
  isCustomer,
  customerAuthController.updateUserAddress
);

router.delete(
  "/customer/delete-address/:id",
  isCustomer,
  customerAuthController.deleteUserAddress
);



module.exports = router;

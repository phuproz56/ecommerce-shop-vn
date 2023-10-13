const paymentController = require("../controllers/payment/paymentController");
const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get(
  "/payment/create-stripe-connect-account",
  authMiddleware,
  paymentController.create_stripe_connect_account
);
router.put(
  "/payment/active-stripe-connect-account/:activeCode",
  authMiddleware,
  paymentController.active_stripe_connect_account
);
router.get(
  "/payment/seller-payment-details/:sellerId",
  authMiddleware,
  paymentController.get_seller_paymemt_details
);

router.post(
  "/payment/withdrawal-request",
  authMiddleware,
  paymentController.withdrawal_request
);

router.get(
  "/payment/request",
  authMiddleware,
  paymentController.get_payment_request
);

module.exports = router;

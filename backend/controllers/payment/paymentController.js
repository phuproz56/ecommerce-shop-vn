const striptModel = require("../../models/stripeModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51MqGyrCjGE1sIBd8i6byK4tUcFdrm141PuxTM48TU0FPrsGqN5QhIDt0f29GCULwIbtH4EeoDT3rfGPzOicRV1Q800KHV90bxS"
);
const withdrawRequest = require("../../models/withdrawRequest");
const sellerModel = require("../../models/sellerModel");
const { responseReturn } = require("../../utils/response");
const {
  mongo: { ObjectId },
} = require("mongoose");
const sellerWallet = require("../../models/sellerWallet");

class paymentController {
  create_stripe_connect_account = async (req, res) => {
    const { id } = req;
    const uid = uuidv4();

    try {
      const stripInfo = await striptModel.findOne({ sellerId: id });

      if (stripInfo) {
        await striptModel.deleteOne({ sellerId: id });
        const account = await stripe.accounts.create({ type: "express" });

        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "http://localhost:3001/refresh",
          return_url: `http://localhost:3001/success?activeCode=${uid}`,
          type: "account_onboarding",
        });
        await striptModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uid,
        });
        responseReturn(res, 201, { url: accountLink.url });
      } else {
        const account = await stripe.accounts.create({ type: "express" });

        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "http://localhost:3001/refresh",
          return_url: `http://localhost:3001/success?activeCode=${uid}`,
          type: "account_onboarding",
        });
        await striptModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uid,
        });
        responseReturn(res, 201, { url: accountLink.url });
      }
    } catch (error) {
      console.log("stripe connect account create error " + error.message);
    }
  };

  active_stripe_connect_account = async (req, res) => {
    const { activeCode } = req.params;
    const { id } = req;
    try {
      const userStripeInfo = await striptModel.findOne({ code: activeCode });
      if (userStripeInfo) {
        await sellerModel.findByIdAndUpdate(id, {
          payment: "active",
        });
        responseReturn(res, 200, { message: "payment active" });
      } else {
        responseReturn(res, 404, { message: "payment active failed" });
      }
    } catch (error) {
      responseReturn(res, 500, { message: error.message });
    }
  };

  sunAmount = (data) => {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
      sum = sum + data[i].amount;
    }
    return sum;
  };

  get_seller_paymemt_details = async (req, res) => {
    const { sellerId } = req.params;
    try {
      const payments = await sellerWallet.find({ sellerId });

      const pendingWithdraws = await withdrawRequest.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId,
            },
          },
          {
            status: {
              $eq: "pending",
            },
          },
        ],
      });

      const successWithdraws = await withdrawRequest.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId,
            },
          },
          {
            status: {
              $eq: "success",
            },
          },
        ],
      });

      const pendingAmount = this.sunAmount(pendingWithdraws);
      const withdrawAmount = this.sunAmount(successWithdraws);
      const totalAmount = this.sunAmount(payments);

      let availableAmount = 0;

      if (totalAmount > 0) {
        availableAmount = totalAmount - (pendingAmount + withdrawAmount);
      }
      responseReturn(res, 200, {
        totalAmount,
        pendingAmount,
        withdrawAmount,
        availableAmount,
        successWithdraws,
        pendingWithdraws,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  withdrawal_request = async (req, res) => {
    const { amount, sellerId } = req.body;
    console.log(sellerId);
    try {
      const withdrawal = await withdrawRequest.create({
        sellerId,
        amount: parseInt(amount),
      });
      responseReturn(res, 200, {
        withdrawal,
        message: "withdrowal request send",
      });
    } catch (error) {
      responseReturn(res, 500, { message: error.message });
    }
  };

  get_payment_request = async (req, res) => {
    try {
      const withdrawalRequest = await withdrawRequest.find({
        status: "pending",
      });
      responseReturn(res, 200, { withdrawalRequest });
    } catch (error) {
      responseReturn(res, 500, { message: "Internal server error" });
    }
  };
}

module.exports = new paymentController();

const authOrderModel = require("../../models/authOrder");
const customerOrder = require("../../models/customerOrder");
const cardModel = require("../../models/cardModel");
const myShopWallet = require("../../models/myShopWallet");
const sellerWallet = require("../../models/sellerWallet");
const productModel = require("../../models/productModel");
const moment = require("moment");
const { responseReturn } = require("../../utils/response");
const {
  mongo: { ObjectId },
} = require("mongoose");
const stripe = require("stripe")(
  "sk_test_51MqGyrCjGE1sIBd8i6byK4tUcFdrm141PuxTM48TU0FPrsGqN5QhIDt0f29GCULwIbtH4EeoDT3rfGPzOicRV1Q800KHV90bxS"
);

class orderController {
  paymentCheck = async (id) => {
    try {
      const order = await customerOrder.findById(id);
      if (order.payment_status === "unpaid") {
        await customerOrder.findByIdAndUpdate(id, {
          delivery_status: "Hủy",
        });
        await authOrderModel.updateMany(
          {
            orderId: id,
          },
          {
            delivery_status: "Hủy",
          }
        );
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  place_order = async (req, res) => {
    const { price, products, shipping_fee, shippingInfo, userId } = req.body;

    let authorOrderData = [];
    let cardId = [];
    const tempDate = moment(Date.now()).format("LLL");

    let customerOrderProduct = [];

    for (let i = 0; i < products.length; i++) {
      const pro = products[i].products;
      for (let j = 0; j < pro.length; j++) {
        let tempCusPro = pro[j].productInfo;
        tempCusPro.quantity = pro[j].quantity;
        customerOrderProduct.push(tempCusPro);
        if (pro[j]._id) {
          cardId.push(pro[j]._id);
        }
      }
    }

    try {
      const order = await customerOrder.create({
        customerId: userId,
        shippingInfo,
        products: customerOrderProduct,
        price: price + shipping_fee,
        delivery_status: "Chưa Xử Lí",
        payment_status: "unpaid",
        date: tempDate,
      });

      for (let i = 0; i < products.length; i++) {
        const pro = products[i].products;
        const pri = products[i].price;
        const sellerId = products[i].sellerId;
        let storePro = [];
        for (let j = 0; j < pro.length; j++) {
          let tempPro = pro[j].productInfo;
          tempPro.quantity = pro[j].quantity;

          storePro.push(tempPro);
        }

        authorOrderData.push({
          orderId: order.id,
          sellerId,
          products: storePro,
          price: pri,
          payment_status: "unpaid",
          shippingInfo: shippingInfo,
          delivery_status: "Chưa Xử Lí",
          shipperInfo: {},
          date: tempDate,
        });
      }
      await authOrderModel.insertMany(authorOrderData);

      for (let k = 0; k < cardId.length; k++) {
        await cardModel.findByIdAndDelete(cardId[k]);
      }

      // console.log(this.paymentCheck(order.id))

      setTimeout(() => {
        this.paymentCheck(order.id);
      }, 36000000);

      responseReturn(res, 201, {
        message: "đặt hàng thành công!",
        orderId: order.id,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_customer_dashboard_data = async (req, res) => {
    const { userId } = req.params;

    try {
      const recentOrders = await customerOrder
        .find({
          customerId: new ObjectId(userId),
        })
        .limit(5);
      const pendingOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId),
          delivery_status: "Chưa Xử Lí",
        })
        .countDocuments();
      const totalOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId),
        })
        .countDocuments();
      const cancelledOrder = await customerOrder
        .find({
          customerId: new ObjectId(userId),
          delivery_status: "Hủy",
        })
        .countDocuments();
      responseReturn(res, 200, {
        recentOrders,
        pendingOrder,
        cancelledOrder,
        totalOrder,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_orders = async (req, res) => {
    const { customerId, status } = req.params;
    try {
      const orders = await customerOrder.find({
        customerId: new ObjectId(customerId),
        delivery_status: status,
      });

      responseReturn(res, 200, {
        orders,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  huy_order = async (req, res) => {
    const { orderId } = req.params;
    console.log(orderId);
    try {
      await authOrderModel.findByIdAndUpdate(orderId, {
        delivery_status: "Hủy",
      });
      const cuOrder = await authOrderModel.findById(orderId);

      const customerOrderProduct = cuOrder.products;

      for (let i = 0; i < customerOrderProduct.length; i++) {
        const id = customerOrderProduct[i]._id;
        await productModel.findByIdAndUpdate(id, {
          stock: customerOrderProduct[i].stock,
        });
      }
      responseReturn(res, 200, { message: "Hủy Thành Công!" });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_all_orders = async (req, res) => {
    try {
      const orders = await authOrderModel.find({}).sort({ createdAt: -1 });
      
      const order_complete = await authOrderModel.find({
        delivery_status: "Đã Giao Hàng"
      });

      responseReturn(res, 200, {
        orders,order_complete
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_order = async (req, res) => {
    const { orderId } = req.params;

    try {
      const order = await authOrderModel.findById(orderId);
      console.log(order)
      responseReturn(res, 200, {
        order,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  get_admin_orders = async (req, res) => {
    let { page, parPage, searchValue } = req.query;
    page = parseInt(page);
    parPage = parseInt(parPage);
    const skipPage = parPage * (page - 1);
    try {
      if (searchValue) {
        const orders = await customerOrder
          .find({
            delivery_status: { $regex: searchValue },
            // "shippingInfo.name": { $regex: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: 1 });
        responseReturn(res, 200, { orders });
      } else {
        const orders = await customerOrder
          .aggregate([
            {
              $lookup: {
                from: "authororders",
                localField: "_id",
                foreignField: "orderId",
                as: "suborder",
              },
            },
          ])
          .skip(skipPage)
          .limit(parPage)
          .sort({
            updatedAt: -1,
          });

        const totalOrder = await customerOrder.aggregate([
          {
            $lookup: {
              from: "authororders",
              localField: "_id",
              foreignField: "orderId",
              as: "suborder",
            },
          },
        ]);

        responseReturn(res, 200, { orders, totalOrder: totalOrder.length });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  get_admin_order = async (req, res) => {
    const { orderId } = req.params;
    try {
      const order = await customerOrder.aggregate([
        {
          $match: { _id: new ObjectId(orderId) },
        },
        {
          $lookup: {
            from: "authororders",
            localField: "_id",
            foreignField: "orderId",
            as: "suborder",
          },
        },
      ]);
      responseReturn(res, 200, { order: order[0] });
    } catch (error) {
      console.log("get admin order" + error.message);
    }
  };

  admin_order_status_update = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      await customerOrder.findByIdAndUpdate(orderId, {
        delivery_status: status,
      });

      responseReturn(res, 200, {
        message: "thay đổi trạng thái đơn hàng thành công!",
      });
    } catch (error) {
      console.log("get admin order status error : " + error.message);
      responseReturn(res, 500, { message: "lỗi máy chủ!" });
    }
  };

  get_seller_orders = async (req, res) => {
    const { sellerId } = req.params;
    let { page, parPage, searchValue } = req.query;

    page = parseInt(page);
    parPage = parseInt(parPage);

    const skipPage = parPage * (page - 1);

    try {
      if (searchValue) {
        const orders = await authOrderModel
          .find({
            delivery_status: { $regex: searchValue },
            // "shippingInfo.name": { $regex: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: 1 });
        responseReturn(res, 200, { orders });
      } else {
        const orders = await authOrderModel
          .find({
            sellerId,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalOrder = await authOrderModel
          .find({
            sellerId,
          })
          .countDocuments();
        responseReturn(res, 200, { orders, totalOrder });
      }
    } catch (error) {
      console.log("get seller order error " + error.message);
      responseReturn(res, 500, { message: "lỗi máy chủ !" });
    }
  };

  get_seller_order = async (req, res) => {
    const { _id } = req.params;
    try {
      const order = await authOrderModel.findById({ _id });

      responseReturn(res, 200, { order });
    } catch (error) {
      console.log(error.message);
    }
  };

  seller_order_status_update = async (req, res) => {
    const { _id } = req.params;
    const { status } = req.body;

    try {
      const a = await authOrderModel.findByIdAndUpdate(_id, {
        delivery_status: status,
      });

      if (status === "Hủy") {
        const cuOrder = await authOrderModel.findById(_id);

        const customerOrderProduct = cuOrder.products;
        for (let i = 0; i < customerOrderProduct.length; i++) {
          const id = customerOrderProduct[i]._id;
          await productModel.findByIdAndUpdate(id, {
            stock: customerOrderProduct[i].stock,
          });
        }
      }

      responseReturn(res, 200, {
        message: "thay đổi trạng thái đơn hàng thành công!",
      });
    } catch (error) {
      console.log("get admin order status error " + error.message);
      responseReturn(res, 500, { message: "Lỗi máy chủ!" });
    }
  };

  create_payment = async (req, res) => {
    const { price } = req.body;
    try {
      const payment = await stripe.paymentIntents.create({
        amount: price,
        currency: "vnd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      responseReturn(res, 200, { clientSecret: payment.client_secret });
    } catch (error) {
      console.log(error.message);
    }
  };

  order_confirm = async (req, res) => {
    const { orderId } = req.params;
    try {
      await customerOrder.findByIdAndUpdate(orderId, {
        payment_status: "paid",
        delivery_status: "Chưa Xử Lí",
      });
      await authOrderModel.updateMany(
        { orderId: new ObjectId(orderId) },
        {
          payment_status: "paid",
          delivery_status: "Chưa Xử Lí",
        }
      );
      const cuOrder = await customerOrder.findById(orderId);

      const auOrder = await authOrderModel.find({
        orderId: new ObjectId(orderId),
      });

      const time = moment(Date.now()).format("l");

      const splitTime = time.split("/");

      await myShopWallet.create({
        amount: cuOrder.price,
        manth: splitTime[0],
        year: splitTime[2],
      });

      for (let i = 0; i < auOrder.length; i++) {
        await sellerWallet.create({
          sellerId: auOrder[i].sellerId.toString(),
          amount: auOrder[i].price,
          manth: splitTime[0],
          year: splitTime[2],
        });
      }
      const customerOrderProduct = cuOrder.products;

      for (let i = 0; i < customerOrderProduct.length; i++) {
        const id = customerOrderProduct[i]._id;

        await productModel.findByIdAndUpdate(id, {
          stock:
            customerOrderProduct[i].stock - customerOrderProduct[i].quantity,
        });
      }

      responseReturn(res, 200, { message: "Thành công!" });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new orderController();

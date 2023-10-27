const authorOrder = require("../../models/authOrder");
const customerOrder = require("../../models/customerOrder");
const sellerWallet = require("../../models/sellerWallet");
const myShopWallet = require("../../models/myShopWallet");
const sellerModel = require("../../models/sellerModel");
const authOrder = require("../../models/authOrder");

const adminSellerMessage = require("../../models/chat/adminSellerMessage");
const sellerCustomerMessage = require("../../models/chat/sellerCustomerMessage");
const productModel = require("../../models/productModel");
const moment = require("moment");
const {
  mongo: { ObjectId },
} = require("mongoose");
const { responseReturn } = require("../../utils/response");

module.exports.get_seller_dashboard_data = async (req, res) => {
  const { id } = req;

  try {
    const totalSele = await sellerWallet.aggregate([
      {
        $match: {
          sellerId: {
            $eq: id,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalProduct = await productModel
      .find({
        sellerId: new ObjectId(id),
      })
      .countDocuments();

    const totalOrder = await authorOrder
      .find({
        sellerId: new ObjectId(id),
      })
      .countDocuments();

    const totalPendingOrder = await authorOrder
      .find({
        $and: [
          {
            sellerId: {
              $eq: new ObjectId(id),
            },
          },
          {
            delivery_status: {
              $eq: "Chưa Xử Lí",
            },
          },
        ],
      })
      .countDocuments();

    const messages = await sellerCustomerMessage
      .find({
        $or: [
          {
            senderId: {
              $eq: id,
            },
          },
          {
            receverId: {
              $eq: id,
            },
          },
        ],
      })
      .limit(3);

    const recentOrders = await authorOrder
      .find({
        sellerId: new ObjectId(id),
      })
      .limit(5);

    responseReturn(res, 200, {
      totalOrder,
      totalSale: totalSele.length > 0 ? totalSele[0].totalAmount : 0,
      totalPendingOrder,
      messages,
      recentOrders,
      totalProduct,
    });
  } catch (error) {
    console.log("get seller dashboard data error " + error.messages);
  }
};

module.exports.get_admin_dashboard_data = async (req, res) => {
  const { id } = req;
  try {
    const totalSele = await myShopWallet.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    const totalProduct = await productModel.find({}).countDocuments();

    const totalOrder = await customerOrder.find({}).countDocuments();

    const totalSeller = await sellerModel.find({}).countDocuments();

    const messages = await adminSellerMessage.find({}).limit(3);

    const recentOrders = await customerOrder.find({}).limit(5);

    responseReturn(res, 200, {
      totalOrder,
      totalSale: totalSele.length > 0 ? totalSele[0].totalAmount : 0,
      totalSeller,
      messages,
      recentOrders,
      totalProduct,
    });
  } catch (error) {
    console.log("get admin dashboard data error " + error.messages);
  }
};

module.exports.get_shipper_new_order = async (req, res) => {
  try {
    const orders = await authOrder.aggregate([
      {
        $lookup: {
          from: "authororders",
          localField: "_id",
          foreignField: "orderId",
          as: "suborder",
        },
      },
    ]);

    Total_TimShipper = await authOrder
      .find({ delivery_status: "Tìm Shipper" })
      .countDocuments();

    Total_VanChuyen = await authOrder
      .find({ delivery_status: "Vận Chuyển" })
      .countDocuments();

    responseReturn(res, 200, {
      orders,
      Total_TimShipper,
      Total_VanChuyen,
      Total_Orders: Total_VanChuyen + Total_TimShipper,
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.thongke = async (req, res) => {
  const { id } = req;
};

module.exports.comfirm_order_shipper = async (req, res) => {
  const { orderId } = req.params;
  const userInfo = req.body;
  try {
    const order = await authOrder.findByIdAndUpdate(orderId, {
      shipperInfo: userInfo,
      shipper_date: moment(Date.now()).format("LLL"),
    });

    responseReturn(res, 200, { message: "Nhận Đơn Thành Công!" });
  } catch (error) {
    console.log(error.message);
  }
};

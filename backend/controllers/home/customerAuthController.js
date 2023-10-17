const sellerCustomerModel = require("../../models/chat/sellerCustomerModel");
const customerModel = require("../../models/customerModel");
const { responseReturn } = require("../../utils/response");
const { createToken } = require("../../utils/tokenCreate");
const bcrypt = require("bcrypt");

class customerAuthController {
  customer_register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 404, { error: "Email already exits" });
      } else {
        const createCustomer = await customerModel.create({
          name: name.trim(),
          email: email.trim(),
          password: await bcrypt.hash(password, 10),
          method: "menualy",
        });
        await sellerCustomerModel.create({
          myId: createCustomer.id,
        });
        const token = await createToken({
          id: createCustomer.id,
          name: createCustomer.name,
          email: createCustomer.email,
          method: createCustomer.method,
        });
        res.cookie("customerToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { message: "Register success", token });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const customer = await customerModel
        .findOne({ email })
        .select("+password");
      if (customer) {
        const match = await bcrypt.compare(password, customer.password);
        if (match) {
          const token = await createToken({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            method: customer.method,
            phoneNumber: customer.phoneNumber,
            addresses: customer.addresses,
          });
          res.cookie("customerToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 201, { message: "Login success", token });
        } else {
          responseReturn(res, 404, { error: "Password wrong" });
        }
      } else {
        responseReturn(res, 404, { error: "Email not found" });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_logout = async (req, res) => {
    res.cookie("customerToken", "", {
      expires: new Date(Date.now()),
    });
    responseReturn(res, 200, { message: "Logout success" });
  };

  change_password = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
      const user = await customerModel.findById(req.id).select("+password");

      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        responseReturn(res, 401, { message: "Mật khẩu hiện tại không đúng" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      responseReturn(res, 200, {
        message: "Mật khẩu đã được thay đổi thành công",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  updateUserAddress = async (req, res) => {
    const { addressType } = req.body;
    try {
      const userInfo = await customerModel.findById(req.id);

      const sameTypeAddress = userInfo.addresses.find(
        (address) => address.addressType === addressType
      );

      if (sameTypeAddress) {
        responseReturn(res, 404, {
          message: `Địa chỉ ${addressType} Đã tồn tại!! `,
        });
        return;
      }

      const existsAddress = userInfo.addresses.find(
        (address) => address._id === req.body._id
      );

      if (existsAddress) {
        Object.assign(existsAddress, req.body);
      } else {
        userInfo.addresses.push(req.body);
      }

      const token = await createToken({
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        method: userInfo.method,
        phoneNumber: userInfo.phoneNumber,
        addresses: userInfo.addresses,
      });
      res.cookie("customerToken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      userInfo.save();

      responseReturn(res, 201, { message: "Thêm địa chỉ thành công!", token });
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteUserAddress = async (req, res) => {
    const addressId = req.params.id;
    const userId = req.id;

    try {
      await customerModel.updateOne(
        {
          _id: userId,
        },
        { $pull: { addresses: { _id: addressId } } }
      );

      const userInfo = await customerModel.findById(userId);

      const token = await createToken({
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        method: userInfo.method,
        phoneNumber: userInfo.phoneNumber,
        addresses: userInfo.addresses,
      });
      res.cookie("customerToken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      userInfo.save();

      responseReturn(res, 201, { message: "Xoá thành công!", token });
    } catch (error) {
      console.log(error.message);
    }
  };

  updateUserProfile = async (req, res) => {
    const { email, password, phoneNumber, name } = req.body;
    try {
      const userInfo = await customerModel
        .findOne({ email })
        .select("+password");
      if (!userInfo) {
        responseReturn(res, 404, { message: "Không tìm thấy người dùng này!" });
        return;
      }
      const isPasswordValid = await bcrypt.compare(password, userInfo.password);

      if (!isPasswordValid) {
        responseReturn(res, 404, {
          message: "Vui lòng cung cấp thông tin chính xác!",
        });
        return;
      }

      userInfo.name = name;
      userInfo.email = email;
      userInfo.phoneNumber = phoneNumber;

      const token = await createToken({
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        method: userInfo.method,
        phoneNumber: userInfo.phoneNumber,
        addresses: userInfo.addresses,
      });
      res.cookie("customerToken", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      await userInfo.save();

      responseReturn(res, 201, {
        message: "Cập nhật profile thành công!!",
        token,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new customerAuthController();

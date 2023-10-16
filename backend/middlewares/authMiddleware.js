const jwt = require("jsonwebtoken");
const User = require("../models/customerModel");

module.exports.authMiddleware = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return res.status(401).json({ error: "Vui lòng đăng nhập để tiếp tục" });
  } else {
    try {
      const deCodeToken = await jwt.verify(accessToken, process.env.SECRET);
      req.role = deCodeToken.role;
      req.id = deCodeToken.id;
      next();
    } catch (error) {
      return res.status(409).json({ error: "Vui lòng đăng nhập để tiếp tục!" });
    }
  }
};

module.exports.isCustomer = async (req, res, next) => {
  const { customerToken } = req.cookies;
  if (!customerToken) {
    return res.status(401).json({ error: "Vui lòng đăng nhập để tiếp tục" });
  } else {
    try {
      const deCodeToken = await jwt.verify(customerToken, process.env.SECRET);
      req.id = deCodeToken.id;
      next();
    } catch (error) {
      return res.status(409).json({ error: "Vui lòng đăng nhập để tiếp tục!" });
    }
  }
};

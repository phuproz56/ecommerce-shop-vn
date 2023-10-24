const router = require("express").Router();
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  get_seller_dashboard_data,
  get_admin_dashboard_data,
  thongke
} = require("../../controllers/dashboard/dashboardIndexController");

router.get(
  "/seller/get-dashboard-index-data",
  authMiddleware,
  get_seller_dashboard_data
);

router.get(
  "/seller/dashboard-thongke",
  authMiddleware,
  thongke
);


router.get(
  "/admin/get-dashboard-index-data",
  authMiddleware,
  get_admin_dashboard_data
);

module.exports = router;

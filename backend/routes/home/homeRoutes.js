const router = require("express").Router();
const homeControllers = require("../../controllers/home/homeControllers");

router.get("/get-categorys", homeControllers.get_category);

module.exports = router;

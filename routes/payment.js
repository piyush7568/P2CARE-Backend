var express = require("express");
var router = express.Router();
const paymentController = require("../controller/payment");
const userController = require("../controller/user");



router.post("/checkout", userController.CHECKJWT, paymentController.checkout);

router.post(
  "/paymentverification",
  userController.CHECKJWT,
  paymentController.paymentVerification
);

module.exports = router;

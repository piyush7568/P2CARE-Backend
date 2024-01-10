var express = require("express");
var router = express.Router();
const paymentController = require("../controller/payment");



router.post("/checkout", paymentController.checkout)

router.post("/paymentverification",paymentController.paymentVerification )

module.exports = router;

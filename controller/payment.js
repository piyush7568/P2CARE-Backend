const  crypto= require("crypto");
const  Payment =require("../model/payment")
const Razorpay = require("razorpay");
// import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: "rzp_test_fjsZSYfFDu3rxm",
  key_secret: 'Sn7Hj5l8PlJPzdOGWJkH29jw',
});


exports.checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

exports.paymentVerification = async (req, res) => {
  
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.testSECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,    
      razorpay_payment_id,
      razorpay_signature,
    });

    // res.status(400).json({
    //   paymentID: razorpay_payment_id,
    // });
    res.redirect(
      `${process.env.P2CARE_USER}/booking-complete?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

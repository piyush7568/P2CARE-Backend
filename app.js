var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/users");
var userRouter = require("./routes/user");
var serviceCategoryRouter = require("./routes/servicecategory");
var timeRouter = require("./routes/booktime");
var doctorRouter = require("./routes/doctor");
var serviceRouter = require("./routes/service");
var hospitalRouter = require("./routes/hospital");
var asignRouter = require("./routes/asigndoctor");
var patientRouter = require("./routes/patient");
var doctorCategoryRouter = require("./routes/doctorcategory");
var doctoravailableRouter = require("./routes/doctoravailability");
var blogCategoryRouter = require("./routes/blogcategory");
var blogRouter = require("./routes/blog");
var testimonialRouter = require("./routes/testimonial");
var bookRouter = require("./routes/bookappointment");
var paymentRoute = require("./routes/payment");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(
    
      `mongodb+srv://sohebs5050:sohebs5050@cluster0.wdmot5y.mongodb.net/blog?retryWrites=true&w=majority`
  )
  .then(() => console.log("Connected!"))
  .catch((error) => {
    console.log(error.message);
  });

// const generateSecretKey = () => {
//   return crypto.randomBytes(32).toString("hex");
// };

// const secretKey = generateSecretKey();

// console.log("JWT Secret Key:", secretKey);





// export const instance = new Razorpay({
//   key_id: process.env.testID,
//   key_secret: process.env.testSECRET,
// });
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/user", userRouter);
app.use("/servicecategory", serviceCategoryRouter);
app.use("/time", timeRouter);
app.use("/doctor", doctorRouter);
app.use("/service", serviceRouter);
app.use("/hospital", hospitalRouter);
app.use("/asign", asignRouter);
app.use("/patient", patientRouter);
app.use("/doctorcategory", doctorCategoryRouter);
app.use("/available", doctoravailableRouter);
app.use("/blogcategory", blogCategoryRouter);
app.use("/blog", blogRouter);
app.use("/testimonial", testimonialRouter);
app.use("/book", bookRouter);
app.use("/payment", paymentRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

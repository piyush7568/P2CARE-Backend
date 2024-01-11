const  express = require('express');
const reviewDoctors =require("../controller/reviewDoctor")
const reviewRouter = express.Router();

reviewRouter.post('/reviews',reviewDoctors.addreviews);
reviewRouter.get('/',reviewDoctors.reterivereviews);

module.exports={reviewRouter}
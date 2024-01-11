const  express = require('express');
const reviewHospital =require("../controller/reviewHospital")
const reviewHosptialRouter = express.Router();

reviewHosptialRouter.post('/hospital/:hospitalId',reviewHospital.addHospital);
reviewHosptialRouter.get('/hospital/:hospitalId',reviewHospital.Hospitalgetting);

module.exports={reviewHosptialRouter}
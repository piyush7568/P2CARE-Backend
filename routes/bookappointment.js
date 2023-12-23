var express = require('express');
var router = express.Router();
const bookappointmentController = require("../controller/bookappointment")
const userController = require('../controller/user')

//addappointment
router.post('/bookappointment',bookappointmentController.book);

// allappointment
router.get('/allbookappointment',userController.CHECKJWT,bookappointmentController.allAppointment);

module.exports = router;    
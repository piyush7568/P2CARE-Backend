
var express = require('express');
var router = express.Router();
const availableController = require('../controller/doctoravailability')
const userController = require('../controller/user')

/* GET users listing. */
router.post('/time',userController.CHECKJWT,availableController.availability) 

/* all data */
router.get('/alltime',availableController.allData) 

/* update data */
router.put('/updatetime/:id',userController.CHECKJWT,availableController.updatAvailable) 

/* delete data */
router.delete('/deletetime/:id',userController.CHECKJWT,availableController.deleteAvailable) 
router.get(
  "/searchdoctortime/:id",

  availableController.searchAvailableDrID
); 

module.exports = router;

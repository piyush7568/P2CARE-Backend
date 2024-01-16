var express = require('express');
var router = express.Router();
const patientController = require("../controller/patient")
const userController =  require('../controller/user')

//addPatient
router.post('/addpatient',patientController.addPatient);

//allPatient
router.get('/allpatient',userController.CHECKJWT,patientController.allPatient);
// router.get('/allpatient',patientController.allPatient);

// updatePatient
router.put('/editpatient/:id',userController.CHECKJWT,patientController.editPatient);

//deletePatient
router.delete('/deletepatient/:id',userController.CHECKJWT,patientController.deletePatient);

// searchPatient
router.get('/searchpatient/:name',patientController.searchPatient);

//searchpatientbyNumber
router.get('/searchpatientbynumber/:number',patientController.searchPatientNumber);
//searchpatientbyNumber
router.get("/searchpatientbyid/:id", patientController.searchPatientByID);



// //addTime
// router.delete('/deletetime/:id',userController.CHECKJWT,timeController.deleteTime);

module.exports = router;

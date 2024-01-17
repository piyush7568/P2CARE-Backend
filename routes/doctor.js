var express = require('express');
var router = express.Router();
const doctorController = require("../controller/doctor")
const userController = require('../controller/user')
const multer  = require('multer');
const { isAdmin } = require('../middleware/authMidleware');

/* GET users listing. */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/doctor')
  },
  filename: function (req, file, cb) {
    // console.log('file',file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })



//addDoctor
router.post(
  "/adddoctor",
  upload.single("image"),
  userController.CHECKJWT,
  isAdmin,
  doctorController.addDoctor
);

//allDoctor
router.get('/alldoctor',doctorController.allDoctor);

//updateDoctor
router.put(
  "/updatedoctor/:id",
  upload.single("image"),
  userController.CHECKJWT,
  
  doctorController.updateDoctor
);

//BlockDoctor
router.put(
  "/blockdoctor/:id",
  userController.CHECKJWT,
  isAdmin,
  doctorController.updateDoctor
);

// UnblockeDoctor
router.put('/unblockdoctor/:id',userController.CHECKJWT,isAdmin,doctorController.updateDoctor);

//deleteDoctor
router.delete(
  "/deletedoctor/:id",
  userController.CHECKJWT,
  isAdmin,
  doctorController.deleteDoctor
);

//searchDoctor
router.get('/searchdoctor/:name',doctorController.searchDoctor);
//ratingsDoctor
router.put("/rating", userController.CHECKJWT,doctorController.rating);

//searchDoctorbyId
router.get("/searchdoctorbyid/:id", doctorController.searchDoctorById);
router.get(
  "/searchDoctorByFiltets",
  doctorController.searchDoctorByFiltets
);



// //addTime
// router.delete('/deletetime/:id',userController.CHECKJWT,timeController.deleteTime);

module.exports = router;

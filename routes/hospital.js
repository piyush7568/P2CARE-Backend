var express = require('express');
var router = express.Router();
const hospitalController =  require('../controller/hospital')
const userController = require('../controller/user')
const multer  = require('multer')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/hospital')
  },
  filename: function (req, file, cb) {
    // console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })


//addhospital
router.post('/addhospital',upload.single('hospitallogo'),userController.CHECKJWT,hospitalController.addHospital);

//allhospital
router.get('/allhospital',hospitalController.allHospital);

//updatehospital
router.put('/edithospital/:id',upload.single('hospitallogo'),userController.CHECKJWT,hospitalController.updateHospital);

//deletehospital
router.delete('/deletehospital/:id',userController.CHECKJWT,hospitalController.deleteHospital);

//searchHospital
router.get('/searchhospital/:name',hospitalController.searchHospital);

//searchHospitalbyId
router.get('/searchhospitalbyid/:id',hospitalController.searchHospitalbyId);

module.exports = router;

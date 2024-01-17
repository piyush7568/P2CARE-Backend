var express = require('express');
var router = express.Router();
const serviceController = require("../controller/service")
const userController = require('../controller/user')
const multer  = require('multer');
const { isAdmin } = require('../middleware/authMidleware');


/* GET users listing. */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/service')
  },
  filename: function (req, file, cb) {
    // console.log('file',file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

const cpUpload = upload.fields([{ name: 'ogmetaimage', maxCount: 1 }, { name: 'iconimage', maxCount: 1 }, { name: 'image', maxCount: 1 }])



//addService
router.post(
  "/addservice",
  cpUpload,
  userController.CHECKJWT,
  isAdmin,
  
  serviceController.newService
);

//allService
router.get('/allservice',serviceController.allService);

//updateService
router.put(
  "/editservice/:id",
  cpUpload,
  userController.CHECKJWT,
  isAdmin,
  serviceController.updateService
);

//deleteService
router.delete(
  "/deleteservice/:id",
  userController.CHECKJWT,
  isAdmin,
  serviceController.deleteService
);

//searchServicebyname
router.get('/searchservice/:name',serviceController.searchService);

//searchServicebyId
router.get('/searchservicebyid/:id',serviceController.searchServicebyID);


module.exports = router;

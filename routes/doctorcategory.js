var express = require('express');
var router = express.Router();
const doctorCategoryController = require("../controller/doctorcategory")
const userController = require('../controller/user')
const multer  = require('multer');
const { isAdmin } = require('../middleware/authMidleware');

/* GET users listing. */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/doctorcategory')
  },
  filename: function (req, file, cb) {
    
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

//addCategory
router.post(
  "/addcategory",
  upload.single("image"),
  userController.CHECKJWT,
  isAdmin,
  doctorCategoryController.newCategory
);

//allCategory
router.get('/allcategory',doctorCategoryController.allCategory);

//updateCategory
router.put(
  "/updatecategory/:id",
  upload.single("image"),
  userController.CHECKJWT,
  isAdmin,
  doctorCategoryController.updateCategory
);

//deleteCategory
router.delete(
  "/deletecategory/:id",
  userController.CHECKJWT,
  isAdmin,
  doctorCategoryController.deleteCategory
);

//searchCategorybyname
router.get('/searchcategory/:name',doctorCategoryController.searchCategory);

//searchCategorybyId
router.get('/searchcategorybyid/:id',doctorCategoryController.searchCategorybyID);

//deleteAllCategory
router.delete(
  "/deleteallcategory",
  userController.CHECKJWT,
  isAdmin,
  doctorCategoryController.deleteAllCategory
);

module.exports = router;
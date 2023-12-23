var express = require('express');
var router = express.Router();
const serviceCategoryController = require("../controller/servicecategory")
const userController = require('../controller/user')
const multer  = require('multer')

/* GET users listing. */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/servicecategory')
  },
  filename: function (req, file, cb) {
    console.log(file);
    console.log(req);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })


//addCategory
router.post('/addcategory',upload.single('Icon'),userController.CHECKJWT,serviceCategoryController.newCategory);

//allCategory
router.get('/allcategory',serviceCategoryController.allCategory);

//updateCategory
router.put('/updatecategory/:id',upload.single('Icon'),userController.CHECKJWT,serviceCategoryController.updateCategory);

//deleteCategory
router.delete('/deletecategory/:id',userController.CHECKJWT,serviceCategoryController.deleteCategory);

//searchCategorybyname
router.get('/searchcategory/:name',serviceCategoryController.searchCategory);

//searchCategorybyId
router.get('/searchcategorybyid/:id',serviceCategoryController.searchCategorybyID);

//deleteAllCategory
router.delete('/deleteallcategory',userController.CHECKJWT,serviceCategoryController.deleteAllCategory);

module.exports = router;
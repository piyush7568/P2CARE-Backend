var express = require('express');
var router = express.Router();
const blogCategoryController = require("../controller/blogcategory")
const userController = require('../controller/user')

//addCategory
router.post('/addcategory',userController.CHECKJWT,blogCategoryController.newCategory);

//allCategory
router.get('/allcategory',blogCategoryController.allCategory);

//updateCategory
router.put('/updatecategory/:id',userController.CHECKJWT,blogCategoryController.updateCategory);

//deleteCategory
router.delete('/deletecategory/:id',userController.CHECKJWT,blogCategoryController.deleteCategory);

//searchCategorybyname
router.get('/searchcategory/:name',blogCategoryController.searchCategory);

//searchCategorybyId
router.get('/searchcategorybyid/:id',blogCategoryController.searchCategorybyID);

//deleteCategory
router.delete('/deleteallcategory',userController.CHECKJWT,blogCategoryController.deleteAllCategory);

module.exports = router;
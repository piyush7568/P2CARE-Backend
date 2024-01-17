var express = require('express');
var router = express.Router();
const blogCategoryController = require("../controller/blogcategory")
const userController = require('../controller/user');
const { isAdmin } = require('../middleware/authMidleware');

//addCategory
router.post(
  "/addcategory",
  userController.CHECKJWT,
  isAdmin,
  blogCategoryController.newCategory
);

//allCategory
router.get('/allcategory',blogCategoryController.allCategory);

//updateCategory
router.put(
  "/updatecategory/:id",
  userController.CHECKJWT,
  isAdmin,
  blogCategoryController.updateCategory
);

//deleteCategory
router.delete(
  "/deletecategory/:id",
  userController.CHECKJWT,
  isAdmin,
  blogCategoryController.deleteCategory
);

//searchCategorybyname
router.get('/searchcategory/:name',blogCategoryController.searchCategory);

//searchCategorybyId
router.get('/searchcategorybyid/:id',blogCategoryController.searchCategorybyID);

//deleteCategory
router.delete(
  "/deleteallcategory",
  userController.CHECKJWT,
  isAdmin,
  blogCategoryController.deleteAllCategory
);

module.exports = router;
var express = require('express');
const  router = express.Router();
const userController = require('../controller/user');
const { isAdmin } = require('../middleware/authMidleware');

//signup
router.post("/add", userController.addUser);

//signup_ADMIN
router.post("/addadmin", userController.addAdmin);

//Login
router.post('/login',userController.logIn);
//Login
router.post("/loginadmin", userController.logInAdmin);

//Alluser
router.get("/all", userController.CHECKJWT, isAdmin,userController.ALLUSER);

// update
router.put('/update/:id',userController.CHECKJWT,userController.EDITUSER);

// delete
router.delete('/delete/:id',userController.CHECKJWT, userController.DELETETUSER);

// //Logout
// router.get('/logout',userController.CHECKJWT,userController.logOut);


module.exports = router;

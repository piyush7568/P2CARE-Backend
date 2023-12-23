var express = require('express');
const  router = express.Router();
const userController = require('../controller/user')

//signup
router.post("/add", userController.addUser);

//Login
router.post('/login',userController.logIn);

//Alluser
router.get('/all',userController.CHECKJWT,userController.ALLUSER);

// update
router.put('/update/:id',userController.CHECKJWT,userController.EDITUSER);

// delete
router.delete('/delete/:id',userController.CHECKJWT, userController.DELETETUSER);

// //Logout
// router.get('/logout',userController.CHECKJWT,userController.logOut);


module.exports = router;

var express = require('express');
var router = express.Router();
const timeController = require("../controller/time")
const userController = require('../controller/user')


//addTime
router.post('/addtime',userController.CHECKJWT,timeController.addTime);

//allTime
router.get('/alltime',timeController.allTime);

//addTime
router.put('/updatetime/:id',userController.CHECKJWT,timeController.updateTime);

//addTime
router.delete('/deletetime/:id',userController.CHECKJWT,timeController.deleteTime);

module.exports = router;

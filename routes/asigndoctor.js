var express = require('express');
var router = express.Router();
const userController = require('../controller/user')
const asignController = require('../controller/asigndoctor')

//asigndoctor
router.post('/add',userController.CHECKJWT,asignController.asignDoctor);

//allasigndoctor
router.get('/allasign',asignController.allAsign);

//editasigndoctor
router.put('/editasign/:id',userController.CHECKJWT,asignController.editAsign);

//deleteasigndoctor
router.delete('/deleteasign/:id',userController.CHECKJWT,asignController.deleteAsign);


module.exports = router;

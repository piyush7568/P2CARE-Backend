var express = require('express');
var router = express.Router();
const userController = require('../controller/user')
const testimonialController = require('../controller/testimonial')
const multer  = require('multer')



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/testimonial')
  },
  filename: function (req, file, cb) {
    // console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })


//AddTestimonial
router.post('/addtestimonial',upload.single('image'),userController.CHECKJWT,testimonialController.addTestimonial);

//AllTestimonial
router.get('/alltestimonial',testimonialController.allTestimonial);

// updateTestimonial
router.put('/edittestimonial/:id',upload.single('image'),userController.CHECKJWT,testimonialController.editTestimonial);

// deleteTestimonial
router.delete('/deletetestimonial/:id',userController.CHECKJWT, testimonialController.deleteTestimonial);

//searchTestimonial
router.get('/searchtestimonial/:name',testimonialController.searchTestimonial);

//searchDoctorbyId
router.get('/searchtestimonialbyid/:id',testimonialController.searchTestimonialById);

// deleteTestimonial
router.delete('/deletealltestimonial',userController.CHECKJWT, testimonialController.deleteAllTestimonial);

module.exports = router;

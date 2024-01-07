const TESTIMONIAL = require('../model/testimonial')

//=======================addtestimonial====================

exports.addTestimonial = async function(req, res, next) {
    try {
        // console.log(req.file);
            req.body.image = req.file.filename
        if(!req.body.name || !req.body.designation || !req.body.description || !req.body.image){
            throw new Error('Please Enter Valid Feild')
        }
        // console.log(req.body);
        const data = await TESTIMONIAL.create(req.body)
        res.status(201).json({
            status : "Successful",
            message : "Testimonial SucessFully Added",
            data
        })
    } catch (error) {
        res.status(404).json ({
            status : "Fail",
            message : error.message
        })
    }
  };

//=======================allTestimonial====================

  exports.allTestimonial = async function (req, res, next) {
    try {
      const data = await TESTIMONIAL.find()
      res.status(200).json({
        status: "Success",
        message: "Data is found",
        data: data
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      })
  
    }
  };
  
//=======================deleteTestimonial====================

  exports.deleteTestimonial = async function (req, res, next) {
    try {
      await TESTIMONIAL.findByIdAndDelete(req.params.id)
          res.status(200).json({
              status: "sucessfully",
              message: "data is deleted",})
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      })
  
    }
  };
  
//=======================EditUser====================

  exports.editTestimonial = async function (req, res, next) {
    try {
        if(req.file){
          req.body.image = req.file.filename
        }
        console.log(req.body);
      const data = await TESTIMONIAL.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({
        status: "Suceess",
        message: "data updated",
        data
      })
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message
      })
    }
  };

//=====================searchTestimonial=====================
exports.searchTestimonial = async function (req, res, next) {
  try {
    const data = await TESTIMONIAL.find({ name : { "$regex": req.params.name, '$options': 'i' } })
    res.status(200).json({
      status : "Successfull",
      message : "Data is found",
      data
    })
  } catch (error) {
    res.status(404).json({
      status : "Fail",
      message : error.message
    })
  }
}

//=====================searchTestimonialbyId=====================
exports.searchTestimonialById = async function (req, res, next) { 
  try {
    const data = await TESTIMONIAL.findById(req.params.id)
    res.status(200).json({
      status : "successfull",
      message : "Data is found",
      data
    })
  } catch (error) {
    res.status(404).json({
      status : "Fail",
      message : error.message
    })
  }
}


//=======================deleteAllTestimonial====================

exports.deleteAllTestimonial = async function (req, res, next) {
  try {
    await TESTIMONIAL.deleteMany()
        res.status(200).json({
            status: "sucessfully",
            message: "all data is deleted",})
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })
  }
};
  
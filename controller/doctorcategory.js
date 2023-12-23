const DOCTORCATEGORY = require('../model/doctorcategory')

//=======================addCategory====================
exports.newCategory = async function (req, res, next) {
  try {
   
    console.log(req.body);
    console.log(req.file);
    
    
    req.body.image = req.file?.originalname  

      
    if (!req.body.name || !req.body.image || !req.body.status) {

      throw new Error("Please fill valid data")
    }
    // console.log(req.body);
    const data = await DOCTORCATEGORY.create(req.body)
    res.status(201).json({
      status: "Sucessfull",
      message: "Added Sucessfully",
      data
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

//=======================allCategory====================
exports.allCategory = async function (req, res, next) {
  try {
    const data = await DOCTORCATEGORY.find()
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

//=======================updateCategory====================

exports.updateCategory = async function (req, res, next) {
  try {
    const getData = await DOCTORCATEGORY.findById(req.params.id)
    var data = {...getData._doc, ...req.body}
    if (req.file) {
      data.image = req.file.filename
    }
    if(data.status){
    if (data.status && !['publish', 'draft'].includes(data.status)) {
      throw new Error('Invalid status value');
    }
  }
    const udata = await DOCTORCATEGORY.findByIdAndUpdate(req.params.id, req.body)
    console.log(udata);
    res.status(200).json({
      status: "Suceess",
      message: "category updated",
      udata
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};

//=======================deleteCategory====================

exports.deleteCategory = async function (req, res, next) {
  try {
    await DOCTORCATEGORY.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status: "Suceess",
      message: "Category Deleted",
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};

//=====================searchDoctor=====================

exports.searchCategory = async function (req, res, next) {
  try {
    const data = await DOCTORCATEGORY.find({ Name: { "$regex": req.params.name, '$options': 'i' } })

    res.status(200).json({
      status: "Successfull",
      message: "Data is found",
      data
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

//=====================searchDoctorById=====================

exports.searchCategorybyID = async function (req, res, next) {
  try {
    const data = await DOCTORCATEGORY.findById(req.params.id)
    console.log(data);
    res.status(200).json({
      status: "Successfull",
      message: "Data is found",
      data
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
}

//=======================deleteCategory====================

exports.deleteAllCategory = async function (req, res, next) {
  try {
    await DOCTORCATEGORY.deleteMany()
    res.status(200).json({
      status: "Suceess",
      message: "All Category Deleted",
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};
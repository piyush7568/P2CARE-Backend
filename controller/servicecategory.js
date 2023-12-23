const SERVICECATEGORY = require('../model/servicecategory')

//=======================addCategory====================
exports.newCategory = async function (req, res, next) {
  try {
    // console.log(req.file);
    req.body.Icon = req.file.originalname
    // console.log(req.body);
    if (!req.body.Name || !req.body.ForService || !req.body.Icon || !req.body.status) {
      throw new Error("Please fill valid data")
    }
    console.log(req.body);
    const data = await SERVICECATEGORY.create(req.body)
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
    const data = await SERVICECATEGORY.find()
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
    const getData = await SERVICECATEGORY.findById(req.params.id)
    var data = { ...getData._doc, ...req.body }
    if (req.file) {
      data.image = req.file.filename
    }
    if(data.ForService){
      if (data.ForService && !['Doctor', 'Hospital'].includes(data.ForService)) {
        throw new Error('Invalid Service value');
      }
    }
    if(data.status){
      if (data.status && !['publish', 'draft'].includes(data.status)) {
        throw new Error('Invalid status value');
      }
    }
   const udata = await SERVICECATEGORY.findByIdAndUpdate(req.params.id, req.body)
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
    await SERVICECATEGORY.findByIdAndDelete(req.params.id)
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
    const data = await SERVICECATEGORY.find({ Name: { "$regex": req.params.name, '$options': 'i' } })

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
    const data = await SERVICECATEGORY.findById(req.params.id)
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

//=======================deleteallCategory====================

exports.deleteAllCategory = async function (req, res, next) {
  try {
    await SERVICECATEGORY.deleteMany()
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

const BLOGCATEGORY = require('../model/blogcategory')

//=======================addCategory====================
exports.newCategory = async function (req, res, next) {
  try {
    // console.log(req.file);
    if (!req.body.name || !req.body.status) {
      throw new Error("Please fill valid data")
    }
    // console.log(req.body);
    const data = await BLOGCATEGORY.create(req.body)
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
    const data = await BLOGCATEGORY.find()
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
   const data =  await BLOGCATEGORY.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({
      status: "Suceess",
      message: "category updated",
      data
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
    await BLOGCATEGORY.findByIdAndDelete(req.params.id)
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
    const data = await BLOGCATEGORY.find({ name: { "$regex": req.params.name, '$options': 'i' } })

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
    const data = await BLOGCATEGORY.findById(req.params.id)
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

//=======================deleteAllCategory====================

exports.deleteAllCategory = async function (req, res, next) {
  try {
    await BLOGCATEGORY.deleteMany()
    res.status(200).json({
      status: "Suceess",
      message: "all Category Deleted",
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};


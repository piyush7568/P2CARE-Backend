const SERVICE = require("../model/service");
const SERVICECATEGORY = require("../model/servicecategory");

//========================addService=======================
exports.newService = async function (req, res, next) {
  try {

    var file = req.files?.ogmetaimage;
    var file1 = req.files?.iconimage;
    var file2 = req.files?.image;
    file?.map((el) => {
      // console.log(el.originalname);
      req.body.ogmetaimage = el.originalname;
    });
    file1?.map((el) => {
      // console.log(el.originalname);
      req.body.iconimage = el.originalname;
    });
    file2?.map((el) => {
      // console.log(el.originalname);
      req.body.image = el.originalname;
    });

    // console.log(req.body);
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.expert ||
      !req.body.slug ||
      !req.body.metatitle ||
      !req.body.ogmetatitle ||
      !req.body.metadescription ||
      !req.body.ogmetadescription ||
      !req.body.metatag ||
      !req.body.ogmetaimage ||
      !req.body.category ||
      !req.body.icontype ||
      !req.body.order ||
      !req.body.status
       ||
      !req.body.image
    ) {
      throw new Error("please enter valid data");
    }

    const checkCategory = await SERVICECATEGORY.findOne({
      Name: req.body.category,
    });
    if (!checkCategory) {
      throw new Error("please select valid category");
    }

    const data = await SERVICE.create(req.body);
    res.status(201).json({
      status: "successfull",
      message: "Service is added",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//======================AllService===========================

exports.allService = async function (req, res, next) {
  try {
    const data = await SERVICE.find();
    res.status(200).json({
      status: "successfull",
      message: "data  is founded",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//==========================updateService=========================

exports.updateService = async function (req, res, next) {
  try {
    const getData = await SERVICE.findById(req.params.id);
    var data = { ...getData._doc, ...req.body };
    if (req.files) {
      // console.log(req.files);
      var file = req.files.ogmetaimage;
      var file1 = req.files.iconimage;
      var file2 = req.files.image;
      if (file) {
        file.map((el) => {
          // console.log(el.originalname);
          data.ogmetaimage = el.originalname;
        });
      }
      if (file1) {
        file1.map((el) => {
          // console.log(el.originalname);
          data.iconimage = el.originalname;
        });
      }
      if (file2) {
        file2.map((el) => {
          // console.log(el.originalname);
          data.image = el.originalname;
        });
      }
    }
    const checkCategory = await SERVICECATEGORY.findOne({
      Name: data.category,
    });
    if (!checkCategory) {
      throw new Error("please select valid category");
    }
    if (data.status) {
      if (data.status && !["publish", "draft"].includes(data.status)) {
        throw new Error("Invalid status value");
      }
    }
    // console.log(data);
    const udata = await SERVICE.findByIdAndUpdate(req.params.id, data);
    res.status(200).json({
      status: "Succesful",
      message: "Data is updated",
      udata,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//==================deleteService=======================

exports.deleteService = async function (req, res, next) {
  try {
    await SERVICE.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "Suceess",
      message: "Service Deleted",
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//=====================searchService=====================

exports.searchService = async function (req, res, next) {
  try {
    console.log(req.params.name);
    const data = await SERVICE.find({
      title: { $regex: req.params.name, $options: "i" },
    });
    res.status(200).json({
      status: "Successfull",
      message: "Data is found",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//=====================searchServiceById=====================

exports.searchServicebyID = async function (req, res, next) {
  try {
    const data = await SERVICE.findById(req.params.id);
    console.log(data);
    res.status(200).json({
      status: "Successfull",
      message: "Data is found",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

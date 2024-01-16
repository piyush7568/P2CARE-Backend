const TIME = require('../model/time')

//=======================addTime====================

exports.addTime = async function (req, res, next) {
    console.log(req.body);
    try {
        if (!req.body.Time || !req.body.status) {
            throw new Error("Please fill valid data")
        }
        console.log(req.body);
        const data = await TIME.create(req.body)

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

//=======================allTime====================

exports.allTime = async function (req, res, next) {
    try {
        // console.log(req.body);
        const data = await TIME.find()

        res.status(200).json({
            status: "Sucessfull",
            message: "data is found",
            data

        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//=======================UpdateTime====================

exports.updateTime = async function (req, res, next) {
    try {

        await TIME.findByIdAndUpdate(req.params.id, req.body)

        res.status(200).json({
            status: "Sucessfull",
            message: "update Sucessfully",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//=======================deleteTime====================

exports.deleteTime = async function (req, res, next) {
    try {
        await TIME.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "Sucessfull",
            message: "Deleted Sucessfully",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}
//=======================SearchTime====================

exports.SearchTime = async function (req, res, next) {
    console.log(req.params.id);
  try {

    const data = await TIME.findById(req.params.id);

    res.status(200).json({
      status: "Sucessfull",
      message: "Data Found",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
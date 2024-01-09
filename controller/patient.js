const PATIENT = require('../model/patient')
const bcrypt = require('bcrypt')


//=========================addNewpatient=================
exports.addPatient = async function (req, res, next) {
    try {
        // if (!req.body.name || !req.body.username || !req.body.email || !req.body.phone || !req.body.password || !req.body.passwordconfirm) {
        //     throw new Error('Please Enter Valid Feild')
        if (!req.body.name || !req.body.username || !req.body.email || !req.body.phone ) {
            throw new Error('Please Enter Valid Feild')
        }
        // if (req.body.password === req.body.passwordconfirm) {
        //     req.body.password = await bcrypt.hash(req.body.password, 10)
        //     req.body.passwordconfirm = await bcrypt.hash(req.body.passwordconfirm, 10)
        // }else{
        //     throw new Error('please enter currectpassword')
        // }
        // console.log(req.body);
        const data = await PATIENT.create(req.body)
        res.status(201).json({
            status: "sucessfull",
            message: "Addedd Sucessful",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//=====================allPatient====================

exports.allPatient = async function (req, res, next) {

    try {
        const data = await PATIENT.find()
        res.status(200).json({
            status: "sucessful",
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

//=========================updatePatient==============
exports.editPatient = async function (req, res, next) {
    try {
        // if(req.body.password){
        // if (req.body.password === req.body.passwordconfirm) {
        //     req.body.password = await bcrypt.hash(req.body.password, 10)
        //     req.body.passwordconfirm = await bcrypt.hash(req.body.passwordconfirm, 10)
        // }else{
        //     throw new Error('please enter currectpassword')
        // }
    // }
        // console.log(req.body);
        const data = await PATIENT.findByIdAndUpdate(req.params.id,req.body)
        res.status(201).json({
            status: "sucessfull",
            message: "updated Sucessful",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


//================deletePatient======================

exports.deletePatient = async function (req, res, next) {
    try {
        const data = await PATIENT.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "sucessful",
            message: "Data is deleted",
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//=====================searchPatient=====================
exports.searchPatient = async function (req, res, next) {
    try {
        const data = await PATIENT.find({ name: { "$regex": req.params.name, '$options': 'i' } })
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

//=====================searchDoctorbyId=====================
exports.searchPatientNumber = async function (req, res, next) {
    try {
        const data = await PATIENT.find({ phone: req.params.number });
        res.status(200).json({
            status: "successfull",
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
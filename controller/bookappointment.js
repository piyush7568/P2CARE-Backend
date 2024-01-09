const DOCTORAVAILABILITY = require('../model/doctoravailability')
const BOOKAPPOINTMENT = require('../model/bookappointment')
const DOCTOR = require('../model/doctor')


//====================bookappointment====================

exports.book = async function (req, res, next) {
    try {
        // if (!req.body.date || !req.body.time || !req.body.name || !req.body.email || !req.body.gender || !req.body.message || !req.body.transactionid) {
        //     throw new Error('Enter the details')
        // }
        if (!req.body.date || !req.body.time || !req.body.name || !req.body.email || !req.body.gender  ) {
            throw new Error('Enter the details')
        }
        const isValidDoctor = await DOCTOR.exists({ _id: req.body.doctor });
        if (!isValidDoctor) {
            throw new Error('doctor is not available')
        }

        const dateObject = new Date(req.body.date);
        console.log(dateObject.toLocaleDateString('en-US', { weekday: 'long' }));

        const isTimeAvailable = await DOCTORAVAILABILITY.exists({
            'doctorid': req.body.doctor,
            "bookingavailabilityInformation.day": dateObject.toLocaleDateString('en-US', { weekday: 'long' }),
            "bookingavailabilityInformation.available": true,
            "bookingavailabilityInformation.bookingtime": { $in: [req.body.time] },
        });
        console.log(isTimeAvailable);

        if (!isTimeAvailable) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid time for the doctor on the specified date',
            })
        }
        console.log(req.body);
        const data = await BOOKAPPOINTMENT.create(req.body)
        res.status(201).json({
            status: "sucessfull",
            messgae: "appointment booked sucessfully",
            data
        })
    } catch (error) {
        // console.log(error);
        res.status(500).json({
            status: "fail",
            message: error.message
        })
    }
}


//==========================allAppointment==================================

exports.allAppointment = async function (req, res, next) {
    try {
        const data = await BOOKAPPOINTMENT.find()
        res.status(201).json({
            status : "sucessfull",
            message : "all appointment is found",
            data
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}


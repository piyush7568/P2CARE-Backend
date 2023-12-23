const TIME = require('../model/time');
const DOCTOR = require('../model/doctor');
const DOCTORAVAILABILITY = require('../model/doctoravailability')


//====================doctorAvailable================
exports.availability = async function (req, res, next){
try {
    var bookdata = req.body.bookingavailabilityInformation 
    // console.log(bookdata);
    // const bookingAvailabilityInformation = bookdata.bookingavailabilityInformation;
    const time = bookdata.map(info => info.bookingtime);
    // console.log("Time",time);
    const checkTime = async (el) => {
      const timeResult = await TIME.find({ Time: el });
      return timeResult.length > 0;
    };
    const isValidTime = await Promise.all(
      time.flat().map(async el => await checkTime(el))
    );

    if (!isValidTime.every(Boolean)) {
      throw new Error('Invalid add value');
    }
    // console.log(req.body);
    const data = await DOCTORAVAILABILITY.create(req.body)
   res.status(201).json({
    status : "successful",
    message : "added succesfully",
    data

   })
} catch (error) {
  // console.error(error);
  res.status(500).json({
    status :  "fail", 
    message : error.message
   });
}
};


//====================alltimeAvailbles===================

exports.allData =  async function (req, res, next) {
  try {
    const data = await DOCTORAVAILABILITY.find()
      res.status(200).json({
        status : "succesful",
        message : "data is found",
        data
      })
    
  } catch (error) {
    res.status(500).json({
      status :  "fail", 
      message : error.message
     });
  }
}


//====================updateAvailableTime==================

exports.updatAvailable =  async function (req, res, next) {
  try {
    const getData = await DOCTORAVAILABILITY.findById(req.params.id)
    const data = {...getData._doc,...req.body}
    if(data.doctorid){
      const cheCkid = await DOCTOR.findOne({_id : data.doctorid})
      if(!cheCkid){
        throw new Error("doctor is not")
      }
    }
    if(data.bookingavailabilityInformation){
      var bookdata = data.bookingavailabilityInformation 
      // console.log(bookdata);
      // const bookingAvailabilityInformation = bookdata.bookingavailabilityInformation;
      const time = bookdata.map(info => info.bookingtime);
      // console.log("Time",time);
      const checkTime = async (el) => {
        const timeResult = await TIME.find({ Time: el });
        return timeResult.length > 0;
      };
      const isValidTime = await Promise.all(
        time.flat().map(async el => await checkTime(el))
      );
  
      if (!isValidTime.every(Boolean)) {
        throw new Error('Invalid add value');
      }
    }
    console.log(req.body);
    const udata =  await DOCTORAVAILABILITY.findByIdAndUpdate(req.params.id,data)
    res.status(200).json({
      status : "successfull",
      message : "updated successfull",
      udata

    })
    
  } catch (error) {
    res.status(500).json({
      status :  "fail", 
      message : error.message
     });
  }
}


//================deleteAvailability=======================

exports.deleteAvailable =  async function (req, res, next) {
  try {
      await DOCTORAVAILABILITY.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status : "successfull",
      message : "deleted successfull",
    })
  } catch (error) {
    res.status(500).json({
      status :  "fail", 
      message : error.message
     });
  }
}
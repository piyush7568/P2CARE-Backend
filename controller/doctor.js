const DOCTOR = require('../model/doctor')
const DOCTORCATEGORY = require('../model/doctorcategory');
const HOSPITAL = require('../model/hospital')

//==========================addDoctor=========================
exports.addDoctor = async function (req, res, next) {
  try {
    // console.log('Controller',req.file);
  console.log(req.body.experties);
    req.body.image = req?.file?.filename
    if (!req.body.doctorName || !req.body.doctorCode || !req.body.departmentName || !req.body.departmentCode || !req.body.designation || !req.body.experties || !req.body.specialities || !req.body.slug || !req.body.location || !req.body.description || !req.body.shortDescription || !req.body.experienceInfo || !req.body.awardAndAchivementsInfo || !req.body.talkPublicationInfo || !req.body.languageInfo || !req.body.educationInfo || !req.body.fellowShipInfo || !req.body.metaTitle || !req.body.ogMetaTitle || !req.body.metaDescription || !req.body.ogMetaDescription || !req.body.metaTags || !req.body.price || !req.body.image || !req.body.status || !req.body.availabileforappointment) {
      throw new Error('Please Enter Valid Feild')
    }

    const experties = JSON.parse(req.body.experties);

    const cate = experties.map((el) => el);
   

    const checkCategory = async (el) => {
     
        const cat = await DOCTORCATEGORY.find({ name : el.name });
        return cat.length > 0;
    };
   
    const isValidName = await Promise.all(
        cate.flat().map(async el => await checkCategory(el))
    );


    if (!isValidName.every(Boolean)) {
        throw new Error('expertice is not in category');
    }

    
    const chekspecialist = req.body.experties.includes(req.body.specialities)
    
    if (chekspecialist === false) {
      throw new Error('Invalid add value')
    }
    if(req.body.hospital){
    const hospital = JSON.parse(req.body.hospital);
    const checkHos = hospital.map((el) => el);
    const checkHospital = async (el) => {
        const cat = await HOSPITAL.find({ hospitalname : el.hospitalname });
        return cat.length > 0;
    };
    const isValidhospital = await Promise.all(
      checkHos.flat().map(async el => await checkHospital(el))
    );
    if (!isValidhospital.every(Boolean)) {
        throw new Error('Hospital is not added');
    }
  }
   
  

        // req.body.hospital = JSON.parse(req.body.hospital) 
        // req.body.experties = JSON.parse(req.body.experties); 

        // console.log(req.body);
        
    const data = await DOCTOR.create(req.body)
    res.status(201).json({
      status: "Successful",
      message: "Doctor SucessFully Added",
      data
    })
    
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};







//=============================allDoctor===========================
exports.allDoctor = async function (req, res, next) {
  try {
    const data = await DOCTOR.find()
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

//===========================update doctor=========================

exports.updateDoctor = async function (req, res, next) {
  try {
    const getData = await DOCTOR.findById(req.params.id)
    var data = { ...getData._doc, ...req.body }

    if (req.file) {
      data.image = req.file.filename
    }


    if(data.experties){
    const experties = JSON.parse(data.experties);
    
    const cate = experties?.map((el) => el);
    // console.log('category', cate);
    const checkCategory = async (el) => {
        const cat = await DOCTORCATEGORY.find({ name : el.name });
        return  cat.length > 0;
    };
    const isValidName = await Promise.all(
        cate.flat().map(async el => await checkCategory(el))
    );

    if (!isValidName.every(Boolean)) {
        throw new Error('Invalid add category');
    }
  }

    if(data.specialities){
    let experties = data.experties
    const chekspecialist = experties.includes(data.specialities)
    if (chekspecialist === false) {
      throw new Error('Invalid add value')
    }
  }
  if(data.hospital){
    const hospital = JSON.parse(data.hospital);

    const checkHos = hospital.map((el) => el);
    const checkHospital = async (el) => {
        const cat = await HOSPITAL.find({ hospitalname: el.hospitalname });
        return cat.length > 0;
    };
    const isValidhospital = await Promise.all(
      checkHos.flat().map(async el => await checkHospital(el))
    );

    if (!isValidhospital.every(Boolean)) {
        throw new Error('Hospital is not added');
    }
  }
  if(data.status){
    if (data.status && !['publish', 'draft'].includes(data.status)) {
      throw new Error('Invalid status value');
    }
  }

    
    const udata = await DOCTOR.findByIdAndUpdate(req.params.id, data)    
    res.status(200).json({
      status: "Sucessfull",
      message: "data is updated sucessfully",
      udata
    })

  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message
    })

  }
}

//=================deleteDoctor================
exports.deleteDoctor = async function (req, res, next) {
  try {
    await DOCTOR.findByIdAndDelete(req.params.id)
    res.status(200).json({
      status : "SuccessFul",
      message : "Data is deleted"
    })
    
  } catch (error) {
    res.status(404).json({
      status : "Fail",
      message : error.message
    })  
  }
}

//=====================searchDoctor=====================
exports.searchDoctor = async function (req, res, next) {
  try {
    const data = await DOCTOR.find({ doctorName: { "$regex": req.params.name, '$options': 'i' } })
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

//=====================searchDoctorbyId=====================
exports.searchDoctorById = async function (req, res, next) { 
  try {
    const data = await DOCTOR.find({_id:req.params.id})
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


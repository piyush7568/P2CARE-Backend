const ASIGNDOCTOR =  require('../model/asigndoctor')
const HOSPITAL = require('../model/hospital')
const DOCTOR = require('../model/doctor')


//===============================AsignDoctor=======================

exports.asignDoctor =  async function (req, res, next) {
    try {
        if(!req.body.hospital || !req.body.category || !req.body.doctor || !req.body.ammount){
            throw new Error ('please enter feild')
        }
        const checkHospital = await HOSPITAL.findOne({ hospitalname : req.body.hospital })
        if (!checkHospital) {
            throw new Error('hospital is not available')
        }
        let category = req.body.category
        const checkCat = checkHospital.category
        const checkCategory =  checkCat.includes(category)
        if(checkCategory === false){
          throw new Error ('Category is not available')
        }
    
        const checkDoctor = await DOCTOR.findOne({ doctorName : req.body.doctor })
        if (!checkDoctor) {
            throw new Error('invalid choise')
        }

        // console.log(req.body);
        const data = await ASIGNDOCTOR.create(req.body)
        res.status(201).json({
            status: "Succesfull",
            message : "sucesfully added",
            data
        })

    } catch (error) {
        res.status(404).json({
            status : 'fail',
            message : error.message
        })
    }
}

//=======================allAsign====================

exports.allAsign = async function (req, res, next) {
    try {
      const data = await ASIGNDOCTOR.find()
      res.status(200).json({
        status: "Success",
        message: "Data is found",
        data
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      })
    }
  };


  //=======================EditAsign====================

  exports.editAsign = async function (req, res, next) {
    try {
      // const getData = await ASIGNDOCTOR.findById(req.params.id)
      //   var data = {...getData._doc, ...req.body}
        if(req.body.hospital){
          var checkHospital = await HOSPITAL.findOne({ hospitalname : req.body.hospital })
          if (!checkHospital) {
              throw new Error('hospital is not available')
          }
        }
        if(req.body.category){
          let category = req.body.category
          const checkCat = checkHospital.category
          const checkCategory =  checkCat.includes(category)
          if(checkCategory === false){
            throw new Error ('Category is not available')
          }
        }
        if(req.body.doctor){
        const checkDoctor = await DOCTOR.findOne({ doctorName : req.body.doctor })
        if (!checkDoctor) {
            throw new Error('invalide choise')
        }
      }
        // console.log(req.body)
   const data =    await ASIGNDOCTOR.findByIdAndUpdate(req.params.id, req.body)
      res.status(200).json({
        status: "Suceess",
        message: "user updated",
        data
      })
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message
      })
    }
  };

  //===================deleteAsign==================

  exports.deleteAsign = async function (req, res, next){
    try {
        await ASIGNDOCTOR.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status : "Successfull",
            message : "Deleted data"
        })
        
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
          })
    }
  }


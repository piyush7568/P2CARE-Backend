const HOSPITAL = require('../model/hospital')
const DOCTORCATEGORY = require('../model/doctorcategory')
const SERVICE = require('../model/service');



//====================addHospital=======================
exports.addHospital = async function (req, res, next) {
    try {
       
        // req.body.hospitallogo = req.file.filename
        // if (!req.body.hospitalname || !req.body.hospitaladdress || !req.body.description || !req.body.openingtime || !req.body.closingtime || !req.body.shortdescription || !req.body.category || !req.body.service || !req.body.hospitallogo || !req.body.status) {
        //     throw new Error("Please fill valid data")
        // }



        req.body.hospitallogo = req.file.filename
        if (!req.body.hospitalname || !req.body.hospitaladdress || !req.body.description || !req.body.openingtime || !req.body.closingtime || !req.body.shortdescription || !req.body.category || !req.body.service || !req.body.status) {
            throw new Error("Please fill valid data")
        }



        const category = JSON.parse(req.body.category);
        // const category = req.body.category
        const cate = category.map((el) => el.name);
        console.log('category', cate);

        const checkCategory = async (el) => {
            const cat = await DOCTORCATEGORY.find({ name: el });
            return cat.length > 0;
        };
        const isValidName = await Promise.all(
            cate.flat().map(async el => await checkCategory(el))
        );

        if (!isValidName.every(Boolean)) {
            throw new Error('Invalid add category');
        }
        let service = JSON.parse(req.body.service);
        // let service = req.body.service
       
        const serv = service?.map((el) => el.title);
        console.log('service', serv);
        const checkService = async (el) => {
            const ser = await SERVICE.find({ title: el });
            return ser.length > 0;
        };
        const isValidtitle = await Promise.all(
            serv.flat().map(async el => await checkService(el))
        );

        if (!isValidtitle.every(Boolean)) {
            throw new Error('Invalid add service');
        }


        req.body.category = cate;
        req.body.service = serv 
        console.log(req.body);


        const data = await HOSPITAL.create(req.body)
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

//=======================allhospital====================

exports.allHospital = async function (req, res, next) {
    try {
        const data = await HOSPITAL.find()
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


//=======================updatehospital====================

exports.updateHospital = async function (req, res, next) {
    try {
        const getdata = await HOSPITAL.findById(req.params.id)
        const updata = { ...getdata._doc, ...req.body }
        if (req.file) {
            updata.hospitallogo = req.file.filename
        }
        if(updata.category){
        const category = JSON.parse(updata.category);
        const cate = category.map((el) => el);
        console.log('category', cate);
        const checkCategory = async (el) => {
            const cat = await DOCTORCATEGORY.find({ name: el.name });
            return cat.length > 0;
        };
        const isValidName = await Promise.all(
            cate.flat().map(async el => await checkCategory(el))
        );

        if (!isValidName.every(Boolean)) {
            throw new Error('Invalid add category');
        }
    }
        if(updata.service){
        let service = JSON.parse(updata.service)
        const serv = service.map((el) => el);
        const checkService = async (el) => {
            const ser = await SERVICE.find({ title: el.title });
            return ser.length > 0;
        };
        console.log(checkService);
        const isValidtitle = await Promise.all(
            serv.flat().map(async el => await checkService(el))
        );

        if (!isValidtitle.every(Boolean)) {
            throw new Error('Invalid add service');
        }
    }
    if(updata.status){
        if (updata.status && !['publish', 'draft'].includes(updata.status)) {
          throw new Error('Invalid status value');
        }
      }
    req.body.hospitallogo = updata.hospitallogo; 
        // console.log('body',req.body);
        const udata = await HOSPITAL.findByIdAndUpdate(req.params.id,req.body )
        // console.log(udata);
        res.status(200).json({
            status: "Suceess",
            message: "user updated",
            udata
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//=======================deleteHospital====================

exports.deleteHospital = async function (req, res, next) {
    try {
        await HOSPITAL.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "sucessfully",
            message: "data is deleted",
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })

    }
};


//=====================searchHospital=====================
exports.searchHospital = async function (req, res, next) {
    try {
        const data = await HOSPITAL.find({ hospitalname: { "$regex": req.params.name, '$options': 'i' } })
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

//=====================searchHospitalId=====================
exports.searchHospitalbyId = async function (req, res, next) {
    try {
        const data = await HOSPITAL.findById(req.params.id)
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

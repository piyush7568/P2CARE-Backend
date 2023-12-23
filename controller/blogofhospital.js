const HOSPITALBLOG = require('../model/blogofhospital')
const DOCTORCATEGORY = require('../model/doctorcategory')
const HOSPITAL = require('../model/hospital')

//========================addService=======================
exports.newBlog = async function (req, res, next) {
    try {
        // console.log(req.files);
        var file1 = req.files.blogimage
        var file2 = req.files.ogmetaimage

        file1.map((el) => {
            // console.log(el.originalname);
            req.body.blogimage = el.originalname
        })
        file2.map((el) => {
            // console.log(el.originalname);
            req.body.ogmetaimage = el.originalname
        })

        if (!req.body.title || !req.body.hospital || !req.body.blogcontent || !req.body.author || !req.body.slug || !req.body.blogtags || !req.body.metatag || !req.body.metatitle || !req.body.ogmetatitle || !req.body.metadescription || !req.body.ogmetadescription || !req.body.blogimage || !req.body.ogmetaimage || !req.body.category || !req.body.status) {
            throw new Error("please enter valid data")
        }
        const checkHospital = await HOSPITAL.findOne({ hospitalname : req.body.hospital })
        if (!checkHospital) {
            throw new Error('Hospital is not available')
        }
        const checkCategory = await DOCTORCATEGORY.findOne({ name: req.body.category })
        if (!checkCategory) {
            throw new Error('please select valid category')
        }
        // console.log(req.body);
        const data = await HOSPITALBLOG.create(req.body)
        res.status(201).json({
            status: "successfull",
            message: "Blog is added",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


//======================Allblog===========================

exports.allBlog = async function (req, res, next) {
    try {
        const data = await BLOG.find()
        res.status(200).json({
            status: "successfull",
            message: "data  is founded",
            data
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//==========================updateBlog=========================

exports.updateBlog = async function (req, res, next) {
    try {
        const getData = await BLOG.findById(req.params.id)
        var data = { ...getData._doc, ...req.body }
        if(req.files)
        {
            var file1 = req.files.blogimage
            var file2 = req.files.ogmetaimage
            
            if(file1){
            file1.map((el) => {
                // console.log(el.originalname);
                req.body.blogimage = el.originalname
            })
        }
        if(file2){
            file2.map((el) => {
                // console.log(el.originalname);
                req.body.ogmetaimage = el.originalname
            })
        }
    
        }    
        const checkCategory = await BLOGCATEGORY.findOne({ name: data.category })
        if (!checkCategory) {
            throw new Error('please select valid category')
        }   
        // console.log(data);
        const udata = await BLOG.findByIdAndUpdate(req.params.id,data)
        res.status(200).json({
            status : "Succesful",
            message: "Data is updated",
            udata
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

//==================deleteService=======================

exports.deleteBlog = async function (req, res, next) {
    try {
      await BLOG.findByIdAndDelete(req.params.id)
      res.status(200).json({
        status: "Suceess",
        message: "blog Deleted",
      })
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message
      })
    }
  };
  
  //=====================searchService=====================
  
  exports.searchBlog = async function (req, res, next) {
    try {
        // console.log(req.params.name);
    const data = await BLOG.find({ title: { "$regex": req.params.name, '$options': 'i' } }) 
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

  //=====================searchServiceById=====================

exports.searchBlogbyID = async function (req, res, next) {
    try {
      const data = await BLOG.findById(req.params.id)
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

  //==================deleteService=======================

exports.deleteAllBlog = async function (req, res, next) {
  try {
    await BLOG.deleteMany()
    res.status(200).json({
      status: "Suceess",
      message: "all blog Deleted",
    })
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message
    })
  }
};


  
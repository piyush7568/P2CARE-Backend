var express = require('express');
var router = express.Router();
const blogController = require("../controller/blog")
const userController = require('../controller/user')
const multer  = require('multer')


/* GET users listing. */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/blog')
  },
  filename: function (req, file, cb) {
    // console.log('file',file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
  }
})

const upload = multer({ storage: storage })

const cpUpload = upload.fields([{ name: 'blogimage', maxCount: 1 }, { name: 'ogmetaimage', maxCount: 1 }])



//addBlog
router.post('/addblog',cpUpload,userController.CHECKJWT,blogController.newBlog);

//allBlog
router.get('/allblog',blogController.allBlog);

//updateBlog
router.put('/editblog/:id',cpUpload,userController.CHECKJWT,blogController.updateBlog);

//deleteBlog
router.delete('/deleteblog/:id',userController.CHECKJWT,blogController.deleteBlog);

//searchBlogbyname
router.get('/searchblog/:name',blogController.searchBlog);

//searchBlogbyId
router.get('/searchblogbyid/:id',blogController.searchBlogbyID);

//deleteAllBlog
router.delete('/deleteallblog',userController.CHECKJWT,blogController.deleteAllBlog);



module.exports = router;

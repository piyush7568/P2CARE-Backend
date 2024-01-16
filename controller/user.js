const USER = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//==================================checkToken===============
exports.CHECKJWT = async function (req, res, next) {
  try {
    // console.log(req.headers);
    const token = req.headers.authorization;
   
    if (!token) {
      throw new Error("Token not found");
    }
    const decode = jwt.verify(token, process.env.JwtSign);
    const checkUser = await USER.findById(decode.id);
    if (!checkUser) {
      throw new Error("user not found");
    }
    req.token = token;
    next();
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

//=======================addUser====================

exports.addUser = async function (req, res, next) {
  try {
    if (
      !req.body.Username ||
      !req.body.Name ||
      !req.body.Email ||
      !req.body.Password
    ) {
      throw new Error("Please Enter Valid Feild");
    }
    req.body.Password = await bcrypt.hash(req.body.Password, 10);
    console.log(req.body);

    const data = await USER.create(req.body);
    res.status(201).json({
      status: "Successful",
      message: "User SucessFully Added",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//=======================login====================

exports.logIn = async function (req, res, next) {
  try {
    const checkUser = await USER.findOne({ Email: req.body.Email });
    console.log(checkUser);
    if (!checkUser) {
      throw new Error("User not found");
    }
    const checkPass = await bcrypt.compare(
      req.body.Password,
      checkUser.Password
    );
    console.log(checkPass);
    if (!checkPass) {
      throw new Error("Password is Wrong");
    }
    var token = jwt.sign(
      { id: checkUser._id },
      process.env.JwtSign ||
        `my-32-character-ultra-secure-and-ultra-long-secret`
    );

    res.status(200).json({
      status: "Successful",
      message: "Login SucessFully",
      data: { token: token, user: checkUser },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//=======================allUser====================

exports.ALLUSER = async function (req, res, next) {
  try {
    const data = await USER.find();
    res.status(200).json({
      status: "Success",
      message: "Data is found",
      data: data,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

//=======================deleteUser====================

exports.DELETETUSER = async function (req, res, next) {
  try {
    await USER.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "sucessfully",
      message: "user is deleted",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

//=======================EditUser====================

exports.EDITUSER = async function (req, res, next) {
  
  try {
    const getData = await USER.findById(req.params.id);
    
    var data = { ...getData._doc, ...req.body };
    if (req.body.Password) {
      req.body.Password = await bcrypt.hash(req.body.Password, 10);
    }
    if (req.file) {
      req.body.profileImage = req.file.filename;
    }
    const udata = await USER.findByIdAndUpdate(req.params.id, data);
    res.status(200).json({
      status: "Suceess",
      message: "user updated",
      udata,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

// //=======================logout====================

//   exports.logOut =  async function (req, res, next) {
//     try{
//         await USER.findOne(Email)
//         res.clearCookie("jwt")
//         console.log("logout sucessfully")
//       res.status(200).json({
//         status: "Suceess",
//         message: "User Successfully logout",
//       })
//     } catch (error) {
//         next(error)
//     }

//   };

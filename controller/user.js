const USER = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//==================================checkToken===============
exports.CHECKJWT = async function (req, res, next) {
  try {
    
    const token = req.headers.authorization;

    if (!token) {
      throw new Error("Token not found");
    }
    const decode = jwt.verify(token, process.env.JwtSign);
    const checkUser = await USER.findById(decode.id);
    if (!checkUser) {
      throw new Error("user not found");
    }
    // req.token = token;
    req.user = checkUser;
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

    const exist = await USER.findOne({ Email: req.body.Email });
    if (exist) {
      throw new Error("This email already exist");
    }
    req.body.Password = await bcrypt.hash(req.body.Password, 10);
    

    const data = await USER.create(req.body);
    res.status(201).json({
      status: "Successful",
      message: "User SucessFully Added",
      data: {
        Username: data.Username,
        Name: data.Name,
        Email: data.Email,
        Password: data.Password,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
//=======================addAdmin====================

exports.addAdmin = async function (req, res, next) {
  try {
    if (
      !req.body.Username ||
      !req.body.Name ||
      !req.body.Email ||
      !req.body.Password
    ) {
      throw new Error("Please Enter Valid Feild");
    }

    const exist = await USER.findOne({ Email: req.body.Email });
    if (exist) {
      throw new Error("This email already exist");
    }
    req.body.Password = await bcrypt.hash(req.body.Password, 10);
    req.body.Role = "ADMIN";
    

    const data = await USER.create(req.body);
    res.status(201).json({
      status: "Successful",
      message: "User SucessFully Added",
      data: {
        Username: data.Username,
        Name: data.Name,
        Email: data.Email,
        Password: data.Password,
      },
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
    
    if (!checkUser) {
      throw new Error("User not found");
    }
    const checkPass = await bcrypt.compare(
      req.body.Password,
      checkUser.Password
    );
    
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
      data: {
        token: token,
        Username: checkUser.Username,
        Name: checkUser.Name,
        Email: checkUser.Email,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//=======================loginADMIN====================

exports.logInAdmin = async function (req, res, next) {
  try {
    const checkUser = await USER.findOne({ Email: req.body.Email });
    
    if (!checkUser) {
      throw new Error("User not found");
    }

    if (checkUser.Role !== "ADMIN") throw new Error("Not Authorized");

    const checkPass = await bcrypt.compare(
      req.body.Password,
      checkUser.Password
    );
    
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
      message: "Admin Login SucessFully",
      data: {
        token: token,
        Username: checkUser.Username,
        // Password: checkUser.Password,
        Email: checkUser.Email,
        Name: checkUser.Name,
      },
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

//=======================logout====================

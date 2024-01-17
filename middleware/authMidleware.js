const USER = require("../model/user");

const isAdmin =async (req, res, next) => {
    
  const { Email } = req.user;
  const adminUser = await USER.findOne({ Email: Email });
  if (adminUser.Role !== "ADMIN") {
    throw new Error("You are not Administrator");
  } else {
    next();
  }
};
module.exports = {  isAdmin };

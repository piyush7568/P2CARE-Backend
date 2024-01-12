const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
  Username: String,
  Name: String,
  Email: String,
  Password: String,
  Role: {
    type: String,
    enum: ["ADMIN", "USER", "DOCTOR"],
    default: "USER",
  },
});

const USER = mongoose.model('user', userSchema);

module.exports = USER
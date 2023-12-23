const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
  "Username": String,
  "Name": String,
  "Email": String,
  "Password" : String
});

const USER = mongoose.model('user', userSchema);

module.exports = USER
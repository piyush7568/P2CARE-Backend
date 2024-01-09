const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const patientSchema = new Schema({
  "name": String,
  "username": String,
  "email": String,
  "phone": Number,
  "country" : String,
  "state" : String,
  "city" : String,
  "zipcode" : Number,
  "address" : String,
  // "password" : String,
  // "passwordconfirm" : String,
});

const PATIENT = mongoose.model('patient', patientSchema);

module.exports = PATIENT
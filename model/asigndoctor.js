const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const asignDoctorSchema = new Schema({
  hospital: String,
  category: String,
  doctor: String,
  amount: Number,
});

const ASIGNDOCTOR = mongoose.model("asigndoctor", asignDoctorSchema);

module.exports = ASIGNDOCTOR;

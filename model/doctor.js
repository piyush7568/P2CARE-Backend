const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const doctorSchema = new Schema({
  doctorName: {
    type: String,
    required: true,
  },
  doctorCode: String,
  departmentName: String,
  departmentCode: String,
  experties: [String],

  designation: String,
  experienceInfo: [String],

  location: String,
  description: String,
  shortDescription: String,
  specialities: String,
  awardAndAchivementsInfo: [String],

  talkPublicationInfo: [String],
  languageInfo: [String],
  educationInfo: [String],
  fellowShipInfo: [String],
  metaTitle: String,
  ogMetaTitle: String,
  metaDescription: String,
  ogMetaDescription: String,
  metaTags: String,
  price: Number,
  image: String,
  availabileforappointment: {
    type: Boolean,
    default: false,
  },
  hospital: [String],
  status: {
    type: String,
    enum: ["publish", "draft"],
    default: "draft",
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  ratings: [
    {
      star: Number,
      comment: String,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
  totalratings: { type: String ,default:0},
});


const DOCTOR = mongoose.model('doctor', doctorSchema);

module.exports = DOCTOR;






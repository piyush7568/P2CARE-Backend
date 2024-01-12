const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const hospitalSchema = new Schema({
  hospitalname: String,
  hospitaladdress: String,
  description: String,
  openingtime: String,
  closingtime: String,
  shortdescription: String,
  service: [String],
  // service: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "service",
  // },

  category: [String],
  // category: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "doctorcategory",
  // },
  hospitallogo: String,
  status: {
    type: String,
    enum: ["publish", "draft"],
    default: "publish",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const HOSPITAL = mongoose.model('hospital', hospitalSchema);

module.exports = HOSPITAL;
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
 
  category: [String],

  hospitallogo: String,
  ratings: [
    {
      star: Number,
      comment: String,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
  totalratings: { type: String, default: 0 },
  status: {
    type: String,
    enum: ["publish", "draft"],
    default: "publish",
  },
});

const HOSPITAL = mongoose.model('hospital', hospitalSchema);

module.exports = HOSPITAL;
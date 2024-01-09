const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const doctorAvailabilitySchema = new Schema({
  "doctorid" : {type : mongoose.Schema.ObjectId, ref : 'doctors', required : true,unique : true},
  bookingavailabilityInformation: [{
    day: {
      type: String,
      required: true,
      enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    },
    available: {
      type: Boolean,
      default: false,
    },
    bookingtime: {
      type: [String]
    }
  }]
})

const DOCTORAVAILABILITY = mongoose.model('doctoavailability', doctorAvailabilitySchema);

module.exports = DOCTORAVAILABILITY
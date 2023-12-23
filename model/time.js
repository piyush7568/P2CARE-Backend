const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const timeSchema = new Schema({
  Time: {
    type : String,
    unique : true
  },
  status: {
    type: String,
    enum: ["publish", "draft"],
    default: 'draft'
  }
});

const TIME = mongoose.model('time', timeSchema);

module.exports = TIME;
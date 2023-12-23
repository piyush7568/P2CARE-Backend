const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const hospitalSchema = new Schema({
  hospitalname : String,
  hospitaladdress : String,
  description : String,
  openingtime : String,
  closingtime : String, 
  shortdescription : String, 
  service : [String],
  category : [String],
  hospitallogo : String,
  status : {
    type : String,
    enum : ['Publish' , 'Draft'],
    default : 'Publish'
  }
});

const HOSPITAL = mongoose.model('hospital', hospitalSchema);

module.exports = HOSPITAL;
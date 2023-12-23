const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const serviceCategorySchema = new Schema({
  Name: {
    type: String,
    unique : true
  },
  ForService: {
    type : String,
    enum : ['Doctor' , 'Hospital'],
    default : 'Doctor'
  },
  Icon: String,
  status: {
    type: String,
    enum : ["publish","draft"],
    default: 'draft'
}
});

const SERVICECATEGORY = mongoose.model('servicecategory', serviceCategorySchema);

module.exports = SERVICECATEGORY;
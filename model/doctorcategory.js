const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const doctorCategorySchema = new Schema({
  name: {
    type: String,
    unique : true
  },
  image: String,
  status: {
    type: String,
    default: 'draft',
    enum : ["publish","draft"],
}
});

const DOCTORCATEGORY = mongoose.model('doctorcategory', doctorCategorySchema);

module.exports = DOCTORCATEGORY;
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const blogCategorySchema = new Schema({
 name : String,
 status: {
    type: String,
    enum : ["publish","draft"],
    default: 'draft'
}
});

const BLOGCATEGORY = mongoose.model('blogcategory', blogCategorySchema);

module.exports = BLOGCATEGORY
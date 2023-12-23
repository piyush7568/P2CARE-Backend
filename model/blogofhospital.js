const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const hospitalBlogSchema = new Schema({
  title: String,
  hospital : String,
  blogcontent: String,
  author: String,
  slug: String,
  blogtags: [String],
  metatag :[String],
  metatitle :String,
  ogmetatitle :String,
  metadescription :String,
  ogmetadescription : String,
  blogimage : String,
  ogmetaimage : String,
  category : String,
  status: {
      type: String,
      enum : ["publish","draft"],
      default: 'draft'
  }
});


const HOSPITALBLOG = mongoose.model('hospitalblog', hospitalBlogSchema);

module.exports = HOSPITALBLOG;



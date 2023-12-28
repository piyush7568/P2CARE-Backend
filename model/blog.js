const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const blogSchema = new Schema(
  {
    title: String,
    blogcontent: String,
    author: String,
    slug: String,
    blogtags: [String],
    metatag: [String],
    metatitle: String,
    ogmetatitle: String,
    metadescription: String,
    ogmetadescription: String,
    blogimage: String,
    ogmetaimage: String,
    category: String,
    status: {
      type: String,
      enum: ["publish", "draft"],
      default: "draft",
    },
    // date:DATE.now()
  },
  { timeseries: true }
);


const BLOG = mongoose.model('blog', blogSchema);

module.exports = BLOG;



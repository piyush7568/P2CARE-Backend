const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const serviceSchema = new Schema({
  title: String,
  description: String,
  expert: String,
  slug: String,
  metatitle: String,
  ogmetatitle :String,
  metadescription :String,
  ogmetadescription :String,
  metatag :String,
  ogmetaimage : String,
  category : String,
  icontype: {
    type: String,
    enum : ["image icon","font icon"],
    default: 'image icon'
  },
  iconimage : {
    type :String,
    require :function() {
      // The iconimage is required only when icontype is "image icon"
      return this.icontype === 'image icon';
    }
  },
  order : Number,
  image : String,
  status: {
    type: String,
    enum : ["publish","draft"],
    default: 'draft'
  }
});


const SERVICE = mongoose.model('service', serviceSchema);

module.exports = SERVICE;



const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const testimonialSchema = new Schema({
  "name": String,
  "designation": String,
  "description": String,
  "image": String,
});

const TESTIMONIAL = mongoose.model('testimonial', testimonialSchema);

module.exports = TESTIMONIAL
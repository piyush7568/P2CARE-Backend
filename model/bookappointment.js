const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const bookappointmentSchema = new Schema({
    doctor : {type : mongoose.Schema.ObjectId, ref : 'doctors', required : true},
    date : Date,
    time : [String],
    user : [{type : mongoose.Schema.ObjectId, ref: 'users', required: true },
    { type: mongoose.Schema.ObjectId, ref: 'patients' }],
    name : String,
    email : String,
    gender : {
        type : String,
        enum : ["Male" , "Female"],
        default : "Male"
    },
    message : String,
    transactionid : String
})

const BOOKAPPOINTMENT = mongoose.model('bookappointment', bookappointmentSchema);

module.exports = BOOKAPPOINTMENT
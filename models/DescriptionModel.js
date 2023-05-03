const mongoose= require ('mongoose');
const ProjetModel = require('./ProjetModel');


const Schema = mongoose.Schema
const DescSchema= new Schema({
    content: {
        type : String,
        required : true
    } ,
    projectid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'ProjetModel'
    } ,
    

}, { timestamps: true})
module.exports= mongoose.model('DescSchema',DescSchema )
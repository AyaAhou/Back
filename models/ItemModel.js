const mongoose= require ('mongoose');


const Schema = mongoose.Schema
const ItemSchema= new Schema({
    status: {
        type : String,
        required : true
    } ,
    className: {
        type : String,
       // required : true
    } ,
    start:{
        type : Date,
        //required: true
    },
    end: {
        type: Date,
        //required: false
    },
    
    group:{
        type:String
    },


}, { timestamps: true})
module.exports= mongoose.model('ItemModel',ItemSchema )
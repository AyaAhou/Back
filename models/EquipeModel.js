const mongoose= require ('mongoose');
const UserModel = require('./UserModel');
const ProjetModel = require ('./ProjetModel')

const Schema = mongoose.Schema
const EquipeSchema= new Schema({
    name: {
        type : String,
        required : true
    } ,
    pole: ["web", "mobile" , "qa"],
    
    members: [{     
      type: mongoose.Schema.Types.ObjectId, 
         ref : 'UserModel'
      

   }],
   projet:{
    type: mongoose.Schema.Types.ObjectId, 
    ref : 'ProjetModel'
   }

}, { timestamps: true})
module.exports= mongoose.model('EquipeModel',EquipeSchema )
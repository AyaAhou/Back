const mongoose= require ('mongoose');
const EquipeModel = require('./EquipeModel');

const Schema = mongoose.Schema
const ProjetSchema= new Schema({
    projectName:{type:String,required:true},
    client:{type:String,required:false},
    startDate:{type:Date,required:false},
    endDate:{type:Date,required:false},
    description:{type:String,required:false},
    equipe: {     
      type: mongoose.Schema.Types.ObjectId, 
        ref : 'EquipeModel'
    
   }

}, { timestamps: true})
module.exports= mongoose.model('ProjetModel',ProjetSchema )



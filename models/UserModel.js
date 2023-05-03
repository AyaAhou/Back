const mongoose= require ('mongoose');


const Schema = mongoose.Schema
const UserSchema= new Schema({
    firstname: {
        type : String,
        required : true
    } ,
    lastname:{
        type : String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    
    equipe:{
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'EquipeModel',
        required : false,
        default:null


    },
    skill :{
        type : String,
        required : true 
    },
    item:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref : 'ItemModel'
    }]

}, { timestamps: true})
module.exports= mongoose.model('UserModel',UserSchema )
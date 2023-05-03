require('dotenv').config()
//import http from "http";
const http= require('http')
const UserRoute= require('./routes/UserRoute')
const EquipeRoute= require('./routes/EquipeRoute')
const ProjectRoute= require ('./routes/ProjectRoute')
const ItemRoute = require('./routes/ItemRoute')
const DescRoute = require('./routes/DescriptionRoute')
const mongoose =require('mongoose');
const express = require('express');
const cors = require('cors');






//express app 
const app = express();
app.use(cors());
// connectbto db 
mongoose.set('strictQuery', false)

mongoose.connect('mongodb://127.0.0.1:27017')
.then(()=> {
    app.set('port', (process.env.PORT || 5000));
    app.listen(app.get('port'), function() {
        console.log('db connected Server started on port '+app.get('port'));
    });

})
.catch((error)=>{
    console.log(error)
})


//middleware 
app.use(express.json())
app.use((req, res , next )=> {
    console.log(req.path, req.method)
    next()
})
// routes 
app.use('/api/user',UserRoute)
app.use('/api/equipe',EquipeRoute)
app.use('/api/projet',ProjectRoute)
app.use('/api/item',ItemRoute)
app.use('/api/desc',DescRoute)




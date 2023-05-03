const express = require('express')
const router = express.Router();
const ProjectModel =require('../models/ProjetModel')
const {
    createProject,updateProject,deleteProject,getProject,getAllProjects

     
} = require('../controllers/ProjetController')
//get all
router.get('/',getAllProjects)

//get one
router.get('/:id',getProject)

//post 
router.post('/',createProject)

//delete
router.delete('/:id',deleteProject)

//update
router.patch('/:id',updateProject)

    
    
    


module.exports=router
const express = require('express')
const router = express.Router();
const EquipeModel =require('../models/EquipeModel')
const {
    getEquipes,
    getEquipe,
    creatEquipe,
    deleteEquipe,
    updateEquipe,
    getUsersOfEquipe,
    getMembersById,deleteMemberEquipe

     
} = require('../controllers/EquipeController')
// GET ALL WORK
router.get('/',getEquipes)
// get user of an equipe 
router.get('/:id',getUsersOfEquipe)
// GET A single WORK
router.get('/:id',getEquipe)
// get membres 
router.get('/:id/members',getMembersById)
// post a new WORK
router.post('/',creatEquipe)
// delete a WORK
router.delete('/:id',deleteEquipe)
// delete a member 
router.delete('/:idEquipe/member/:idMembre',deleteMemberEquipe)
// update a WORK
router.patch('/:id',updateEquipe)


//axios.get('http://localhost:5000/users?active=true&archived=false&blocked=false')
    
    
    
    


module.exports=router
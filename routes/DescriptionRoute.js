const express = require('express')
const router = express.Router();
const {
    getDescs,
    createDesc,
    deleteDesc,
    getDescbyIdprojet

} = require('../controllers/DescriptionController')

 
router.get('/', getDescs)
router.post('/',createDesc)
router.get('/:id', getDescbyIdprojet) 
router.delete('/:id',deleteDesc)


module.exports = router
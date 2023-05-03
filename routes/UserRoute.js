const express = require('express')
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUsersWithoutEquipe,
    addItemToUser

} = require('../controllers/UserController')
// GET ALL WORK
router.get('/', getUsers)
router.get('/without-equipe', getUsersWithoutEquipe)
// GET A single WORK
router.get('/:id', getUser)
// post a new WORK
router.post('/', createUser)
// delete a WORK
router.delete('/:id', deleteUser)
// update a WORK
router.patch('/:id', updateUser)
//get users without equipe 

router.post('/:id/item/:id',addItemToUser)



module.exports = router
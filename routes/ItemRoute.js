const express = require('express')
const router = express.Router();
const {
    getItembyIduser,
    getItems,
    getItem,
    createItem,
    deleteItem
} = require('../controllers/ItemController')

// GET a item by id user 
router.get('/user/:id', getItembyIduser)
// get all items
router.get('/', getItems)
// get an  item by id 
router.get('/:id', getItem)
// creat item 
router.post('/',createItem)
// delete item
router.delete('/:id',deleteItem)


module.exports = router
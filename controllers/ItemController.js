const { default: mongoose } = require('mongoose')
const Item = require('../models/ItemModel');
const UserModel = require('../models/UserModel');



// get all item 
const getItems = async (req, res) => {
    const Items = await Item.find({}).sort({ createdAt: -1 })
    res.status(200).json(Items)

}
//get a single item 
const getItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: ' no such file ' })

    }
    const Items = await Item.findById(id)
    if (!Items) {
        return res.status(404).json({
            error: ' no such file '
        })
    }
    res.status(200).json(Items)
}
// creat new Item 
const createItem = async (req, res) => {
    const { status, className , start, end, group } = req.body

    try {
        const item = await Item.create({ status,className, start, end, group})
        if (!mongoose.Types.ObjectId.isValid(group)) {
            return res.status(404).json({ error: 'no such user' });
        }
        if (!mongoose.Types.ObjectId.isValid(item._id)) {
            return res.status(404).json({ error: 'no such item' });
        }
        const user = await UserModel.findByIdAndUpdate(
            group,
            { $addToSet: { item: item._id } },
           // { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'no such user' });
        }
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({
            error: error.msg
        })
    }
};

// delete 
const deleteItem = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: ' no such item' })
    }
    const item = await Item.findOneAndDelete({ _id: id })
    if (!item) {
        return res.status(404).json({ error: ' no such item' })

    }
    res.status(200).json('item deleted')
}







// get Item by id
const getItembyIduser = async (req, res) => {
   try{
    const user = await UserModel.findById(req.params.group)
    res.status(200).json(user.item)

   }catch (err) {
    console.error(err);
    res.status(500).send('Erreur du serveur');
}
};

module.exports = {
    getItembyIduser,
    getItems,
    getItem,
    createItem,
    deleteItem

}
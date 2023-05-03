const { default: mongoose } = require('mongoose')
const User = require('../models/UserModel')
const EquipeModel = require('../models/EquipeModel')


// get all User 
const getUsers = async (req, res) => {
    const Users = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(Users)

}
// get users of equipe 
const getUsersOfEquipe = async (req, res) => {
    try {
        const equipe = await EquipeModel.findById(req.params.equipeId).populate('members');
        res.status(200).json(equipe.members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving users of equipe.' });
    }
};



//get a single user 
const getUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: ' no such file ' })

    }
    const Users = await User.findById(id)
    if (!Users) {
        return res.status(404).json({
            error: ' no such file '
        })
    }
    res.status(200).json(Users)
}

// creat new user 
const createUser = async (req, res) => {
    const { firstname, lastname, email, equipe , skill} = req.body

    try {
        const user = await User.create({ firstname, lastname, email, equipe , skill})
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({
            error: error.msg
        })
    }
};



// delete 
const deleteUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: ' no such user' })
    }
    const user = await User.findOneAndDelete({ _id: id })
    if (!user) {
        return res.status(404).json({ error: ' no such user' })

    }
    res.status(200).json('user deleted')
}
// update
const updateUser = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: ' no such user' })
    }
    const user = await User.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!user) {
        return res.status(404).json({ error: ' no such user' })

    }
    res.status(200).json('user updated')

}
//get users without equipe 
const getUsersWithoutEquipe = async (req, res) => {
    try {
        //const query = _.pick['equipe'];
        //console.log("users here ");
        //const users = await User.find({ ...query }).exec();
        const users = await User.find({ equipe: null }).exec();
        //console.log(users)
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
};
// add item to user
const addItemToUser = async (req, res) => {
    const { userId, itemId } = req.params;
    console.log('item id ', itemId)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ error: 'no such user' });
    }
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        return res.status(404).json({ error: 'no such item' });
    }
    const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { item: itemId } },
       // { new: true }
    );
    if (!user) {
        return res.status(404).json({ error: 'no such user' });
    }
    res.status(200).json(user);
};



module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    getUsersOfEquipe,
    getUsersWithoutEquipe,
    addItemToUser

}
const { default: mongoose } = require('mongoose')
const Equipe = require('../models/EquipeModel')


// get all equipe 
const getEquipes = async (req, res) => {
    const Equipes = await Equipe.find({}).sort({ createdAt: -1 })
    res.status(200).json(Equipes)

}

//get a single equipe 
const getEquipe = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: ' no such file ' })

    }
    const Equipes = await Equipe.findById(id)
    if (!Equipes) {
        return res.status(404).json({
            error: ' no such file '
        })
    }
    res.status(200).json(Equipes)
}

// creat new equipe 
const creatEquipe = async (req, res) => {
    const { name, pole, members } = req.body

    try {
        const equipe = await Equipe.create({ name, pole, members })
        res.status(200).json(equipe)

    } catch (error) {
        res.status(400).json({
            error: error.msg
        })
    }
};

// get membres 
const getMembersById = async (req, res, next) => {
    try {
        const equipeId = req.params.id;
        const equipe = await Equipe.findById(equipeId).populate('members');
        res.status(200).json(equipe.members);
    } catch (error) {
        next(error);
    }
};

// delete 
const deleteEquipe = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: ' is not a valid id equipe' })
    }
    const equipe = await Equipe.findOneAndDelete({ _id: id })
    if (!equipe) {
        return res.status(404).json({ error: ' no such equipe found ' })

    }
    res.status(200).json('equipe deleted')
}
// delete membres from equipe 
const deleteMemberEquipe = async (req , res) => {
    try {
        const equipe = await Equipe.findById(req.params.idEquipe);
        if (!equipe) {
          return res.status(404).json({ message: 'L\'équipe n\'a pas été trouvée' });
        }
    
        const memberIndex = equipe.members.indexOf(req.params.idMembre);
        if (memberIndex === -1) {
          return res.status(404).json({ message: 'Le membre n\'a pas été trouvé dans l\'équipe' });
        }
    
        equipe.members.splice(memberIndex, 1);
        await equipe.save();
    
        return res.json({ message: 'Le membre a été supprimé de l\'équipe avec succès' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du membre' });
      }
    
    
}
// update
const updateEquipe = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: ' no such equipe' })
    }
    const equipe = await Equipe.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!equipe) {
        return res.status(404).json({ error: ' no such equipe' })

    }
    res.status(200).json('equipe updated')

}


module.exports = {
    getEquipes,
    getEquipe,
    creatEquipe,
    deleteEquipe,
    updateEquipe,
    getMembersById,
    deleteMemberEquipe

}
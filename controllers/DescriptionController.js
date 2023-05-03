const { default: mongoose } = require('mongoose')
const Desc = require('../models/DescriptionModel');
const Project = require('../models/ProjetModel');



// get all desc
const getDescs = async (req, res) => {
    const Descs = await Desc.find({}).sort({ createdAt: -1 })
    res.status(200).json(Descs)

}

// creat new desc 
const createDesc = async (req, res) => {
    const { content, projectid } = req.body

    try {
        const project = await Project.findById(projectid)
        
        if (!project) {
            return res.status(404).json({ error: 'no such project' });
        }
        const desc = await Desc.create({ content,projectid})
        res.status(200).json(desc)

    } catch (error) {
        res.status(400).json({
            error: error.msg
        })
    }
};

// delete 
const deleteDesc = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: ' no such desc' })
    }
    const desc = await Desc.findOneAndDelete({ _id: id })
    if (!desc) {
        return res.status(404).json({ error: ' no such desc' })

    }
    res.status(200).json('desc deleted')
}
// get desc by id projet 
const getDescbyIdprojet = async (req, res) => {
   try{
    const project = await Project.findById(req.params.projectid)
    if (!project) {
        return res.status(404).json({ error: 'no such project' });
    }
    const desc = await Desc.findOne({ projectid: req.params.projectid });
      if (!desc) {
         return res.status(404).json({ error: 'no description found for this project' });
      }

      res.status(200).json({ content: desc.content });
    
   }catch (err) {
    console.error(err);
    res.status(500).send('Erreur du serveur');
}
};

module.exports = {
    getDescs,
    createDesc,
    deleteDesc,
    getDescbyIdprojet

}
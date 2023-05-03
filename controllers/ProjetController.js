const { default: mongoose } = require('mongoose')
const Project = require ('../models/ProjetModel')
    
    //get all
    const getAllProjects=async(req,res)=>{
        const projects=await Project.find({}).sort({createdAt:-1})
        res.status(200).json(projects)
    }
    
    //get one
    const getProject=async(req,res)=>{
        const {id}=req.params
    
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"no such project "})
        }
        const project=await Project.findById(id)
        if(!project){
            return res.status(404).json({error:'No such project'})
        }
        res.status(200).json(project)
    }
    
    //create
    const createProject=async(req,res)=>{
        const{projectName,client,startDate,endDate,description}=req.body
        //ad doc to db
        try{
            const project=await Project.create({projectName,client,startDate,endDate,description})
            res.status(200).json(project)
    
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }
    
    //delete
    
    const deleteProject= async(req,res)=>{
        const{id}=req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:"no such project "})
        }
        const project= await Project.findByIdAndDelete({_id:id})
        if(!project ){
            return res.status(400).json({error:'No such project'})
        }
        res.status(200).json(project)
    }
    
    
    //update
    const updateProject= async(req,res)=>{
        const{id}=req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error:'No such project'})
        }
    
        const project=await Project.findByIdAndUpdate({_id:id},{...req.body})
    if(!project){
        return res.status(400).json({error:'No such project '})
    }
    res.status(200).json(project)
    }
    
    module.exports={createProject,updateProject,deleteProject,getProject,getAllProjects}
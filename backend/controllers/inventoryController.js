const Inventory=require('../models/inventoryModel')
const mongoose=require('mongoose')

//get all inventorys
const getInventorys=async(req,res)=>{
    const inventorys=await Inventory.find({}).sort({createdAt: -1})

    res.status(200).json(inventorys)
}

//get a single inventory
const getInventory=async (req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such inventory'})
    }

    const inventory=await Inventory.findById(id)

    if(!inventory){
        return res.status(404).json({error:'No such inventory'})
    }

    res.status(200).json(inventory)
}

//create new inventory
const createInventory=async(req,res)=>{
    const {title,desc1,desc2}=req.body

    let emptyFields=[]

    if(!title){
        emptyFields.push('title')
    }

    if(!desc1){
        emptyFields.push('desc1')
    }

    if(!desc2){
        emptyFields.push('desc2')
    }

    if(emptyFields.length>0){
        return res.status(400).json({error:'Please fill in all the fields',emptyFields})
    }

    //add doc to db
    try{
        const inventory=await Inventory.create({title,desc1,desc2})
        res.status(200).json(inventory)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a inventory
const deleteInventory=async (req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such inventory'})
    }

    const inventory =await Inventory.findOneAndDelete({_id:id})

    if(!inventory){
        return res.status(404).json({error:'No such inventory'})
    }

    res.status(200).json(inventory)
}

//update a inventory
const updateInventory=async (req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such inventory'})
    }

    const inventory=await Inventory.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!inventory){
        return res.status(404).json({error:'No such inventory'})
    }

    res.status(200).json(inventory)
}

module.exports={
    getInventorys,
    getInventory,
    createInventory,
    deleteInventory,
    updateInventory
}
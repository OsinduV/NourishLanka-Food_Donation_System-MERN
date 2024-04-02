// const mongoose=require('mongoose')
import mongoose from 'mongoose';

const Schema=mongoose.Schema;

const inventorySchema=new Schema({
    title:{
        type:String,
        required:true
    },
    desc2:{
        type:String,
        required:true
    },
    desc1:{
        type:String,
        required:true
    },
    expdate:{
        type:String,
        required:true
    }
},{timestamps:true})

// module.exports=mongoose.model('Inventory',inventorySchema)

const Inventory = mongoose.model('Inventory',inventorySchema)

export default Inventory
// const mongoose=require('mongoose')
import mongoose from "mongoose"

const Schema=mongoose.Schema

const inventorySchema=new Schema({
    title:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    expdate:{
        type:Date,
        required:false
    }
},{timestamps:true})

const Inventory =mongoose.model('Inventory',inventorySchema)

export default Inventory
const mongoose=require('mongoose')

const Schema=mongoose.Schema

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
    }
},{timestamps:true})

module.exports=mongoose.model('Inventory',inventorySchema)
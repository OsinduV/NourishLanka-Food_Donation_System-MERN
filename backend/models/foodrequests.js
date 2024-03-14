const mongoose = require('mongoose')

const Schema = mongoose.Schema

const foodrequestSchema = new Schema({

    RecipientName:{
        type: String,
        required:true
    },
    Age:{
        type: Number,
        required:true
    },
    District:{
        type: String,
        required:true
    },
    FoodNeed:{
        type:String,
        required:true
    }
},{timestamps:true})


module.exports = mongoose.model('FoodRequest',foodrequestSchema)

FoodRequest

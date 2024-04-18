import mongoose from "mongoose";

const foodbankSchema = new mongoose.Schema({
    /*ownername foodbankname storagespace currentspace address district
    email phoneno opentime closetime status password*/
    ownername:{
        type:String,
        required:true,
    },
    foodbankname:{
        type:String,
        required:true,
    },
    storagespace:{
        type:Number,
        required:true,
    },
    currentspace:{
        type:Number,
        required:true,
        default:100,
    },
    address:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneno:{
        type:String,
        required:true,
    },
    opentime:{
        type:String,
        required:true,
    },
    closetime:{
        type:String,
        required:true,
    },
    status:{   
        type:Boolean,
        required:true,
        default:false
    },
    password:{
        type:String,
        required:true,
    },

},
{timestamps:true}

)

const Foodbank = mongoose.model('Foodbank' ,foodbankSchema)

export default Foodbank
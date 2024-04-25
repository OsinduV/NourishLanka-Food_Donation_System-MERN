import mongoose from "mongoose";

// Define the volunteer schema
const volunteerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
      scheduleId: {
        type: String,
        required: true,
    },
   
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true, 
    },
    address:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
        
    },
    date: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
      },
   
   
}, { timestamps:true });

// Create the Volunteer model
const Volunteer = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
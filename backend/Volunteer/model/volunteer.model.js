import mongoose from "mongoose";

// Define the volunteer schema
const volunteerSchema = new mongoose.Schema({
    userId: {
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
        default:'nodistrict',
    },
    volunteeringDay: {
        type: String,
        default: 'uncategorized',
        required: true,
    },
    volunteeringType: {
        type: String,
        default: 'uncategorized',
        required: true,
    },
    volunteeringTime: {
        type: String,
        default: 'uncategorized',
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
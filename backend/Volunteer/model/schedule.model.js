import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
          },
        scheduleId: {
            type: String,
            required: true,
        },
        
        date: {
            type: String,
            required: true,
        },
        day: {
            type: String,
           
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
        foodbankId: {
            type: mongoose.SchemaTypes.ObjectId,
           
            ref: "Foodbank"
          },
        
    },{timestamp : true}
  
);
const Schedule  = mongoose.model('Schedule',scheduleSchema);

export default Schedule;
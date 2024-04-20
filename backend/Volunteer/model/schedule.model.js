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
            required: true,
        },
        catagory: {
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
        
    },{timestamp : true}
  
);
const Schedule  = mongoose.model('Schedule',scheduleSchema);

export default Schedule;
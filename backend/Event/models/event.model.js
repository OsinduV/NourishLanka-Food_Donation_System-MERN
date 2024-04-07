import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {
    userId: {
        type: String,
        required: true,
      },

    content: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
        unique: true,
    },

    image: {
        type: String,
        default:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJVV0iPy0DhxTgaVWIWZZgXT8EBxYJU4G75at09iQSMy2nFRqD_rwDlQ2bzDeNNEyfE8&usqp=CAU',
    },

    date: {
        type: String,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    donorid: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        default: 'uncategorized',
    },

    slug: {
        type: String,
        required: true,
        unique: true,
    },
    
    },  
    { timestamps: true }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {
    userId: {
        type: String,
        required: true,
      },

    content: {
        type: String,
    },

    title: {
        type: String,
        unique: true,
    },

    image: {
        type: String,
        default:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJVV0iPy0DhxTgaVWIWZZgXT8EBxYJU4G75at09iQSMy2nFRqD_rwDlQ2bzDeNNEyfE8&usqp=CAU',
    },

    date: {
        type: String,
    },

    time: {
        type: String,
    },

    location: {
        type: String,
    },

    donorid: {
        type: String,
        required: true,
    },

    donoremail: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: 'nostatus',
    },

    category: {
        type: String,
        default: 'uncategorized',
    },

    type: {
        type: String,
        default: 'notype',
    },

    eventdate: {
        type: String,
    },

    eventlocation: {
        type: String,
    },

    eventtimefrom: {
        type: String,
    },

    eventtimeto: {
        type: String,
    },

    DateFrom: {
        type: String,
    },

    DateTo: {
        type: String,
    },

    eventtimelongfrom: {
        type: String,
    },

    eventtimelongto:{
        type: String,
    },

    eventlocationlong:{
        type: String,
    },


    slug: {
        type: String,
        required: true,
        unique: true,
    },
    
    customId: {
        type: String,
        unique: true,
        required: true,
        default: () => `Eventid${Math.floor(1000 + Math.random() * 9000)}` // Generates a random ID starting with "id" followed by 4 digits
    },
    },  
    { timestamps: true }
);


const Event = mongoose.model('Event', eventSchema);

export default Event;
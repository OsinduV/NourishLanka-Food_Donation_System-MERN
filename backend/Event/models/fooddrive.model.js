import mongoose from 'mongoose';

const fooddriveSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        eventtitle: {
            type: String,
            required: true,
            unique: true,
        },

        category: {
            type: String,
            default: 'fooddrive',
        },

        dnid: {
            type: String,
            required: true,
        },

        donoremail: {
            type: String,
            required: true,
        },

        group: {
            type: String,
            required: true,
        },

        ogname: {
            type: String,
        },

        website: {
            type: String,
        },

        type: {
            type: String,
            required: true,
        },

        eventdate: {
            type: String,

        },

        eventtime: {
            type: String,

        },

        eventlocation: {
            type: String,

        },

        DateFrom: {
            type: String,

        },

        DateTo: {
            type: String,

        },

        eventtimelong: {
            type: String,
        },

        eventlocationlong: {
            type: String,

        },

        volunteers: {
            type: String,
            required: true,
        },

        eventdescription: {
            type: String,
            required: true,
        },

        foodbank: {
            type: String,
            required: true,
        },

        requirements: {
            type: String,
        },

        image1: {
            type: String,
            required: true,
        },

        image2: {
            type: String,
            required: true,
        },

        image3: {
            type: String,
        },

        status: {
            type: String,
            default: 'processing',
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

    },{ timestamps: true }
);

const Fooddrive = mongoose.model('Fooddrive', fooddriveSchema);

export default Fooddrive;
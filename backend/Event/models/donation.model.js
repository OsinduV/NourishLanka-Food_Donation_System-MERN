import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
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

        dnid: {
            type: String,
            required: true,
        },

        donoremail: {
            type: String,
            required: true,
        },

        eventdate: {
            type: String,
            required: true,
        },

        eventtime: {
            type: String,
            required: true,
        },

        eventlocation: {
            type: String,
            required: true,
        },

        eventdescription: {
            type: String,
            required: true,
        },

        budget: {
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

        attendees: {
            type: String,
            required: true,
        },

        volunteers: {
            type: String,
            required: true,
        },

        conserns: {
            type: String,
        },

        category: {
            type: String,
            default: 'donationevent',
        },

        status: {
            type: String,
            default: 'processing',
        },

        note: {
            type: String,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },

    },{ timestamps: true }
);

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
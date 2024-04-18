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
            default: 'nobudget',
        },

        image1: {
            type: String,
        },

        image2: {
            type: String,
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
            required: true,
        },

        category: {
            type: String,
            default: 'donationevent',
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

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
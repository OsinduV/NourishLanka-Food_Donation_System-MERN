import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },

        eventtitle: {
            type: String,
            unique: true,
        },

        dnid: {
            type: String,
        },

        donoremail: {
            type: String,
        },

        eventdate: {
            type: Date,
        },

        eventtime: {
            type: String,
        },

        eventlocation: {
            type: String,
        },

        eventdescription: {
            type: String,
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
        },

        volunteers: {
            type: String,
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

        donationId: {
            type: String,
            unique: true,
            required: true,
            default: () => `Donationid${Math.floor(1000 + Math.random() * 9000)}` // Generates a random ID starting with "id" followed by 4 digits
        },

    },{ timestamps: true }
);

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;
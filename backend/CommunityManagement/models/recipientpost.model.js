import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
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
     district: {
      type: String,
      required: true,
    },

      nameofplace: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default:
        'https://img.freepik.com/free-photo/smiley-female-volunteer-holding-food-donations_23-2148732641.jpg',
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

const RecipientPost = mongoose.model('Post', postSchema);

export default RecipientPost;
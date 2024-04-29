import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
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
          'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-review.png',
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
  
  const Review = mongoose.model('Review', reviewSchema);
  
  export default Review;
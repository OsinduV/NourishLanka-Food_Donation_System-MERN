import mongoose from 'mongoose';

//rules or conditions for the user

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,     //required field
      unique: true,       //unique username for each user
    },
    email: {
      type: String,
      required: true,       //required field
      unique: true,         //unique email for each user
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "data:image/png;base64,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",
    },
    district: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    isFundraiser: {
      type: Boolean,
      default: false,
    },

    //Priviledge of accessing event organise
    //01.create a user called event organiser and make it true from mongodb////////////////////

    isAdmin: {
      type: Boolean,
      default: false,
    },

  },
  { timestamps: true }
);


//creating model called User
const User = mongoose.model('User', userSchema);

//export the model User
export default User;


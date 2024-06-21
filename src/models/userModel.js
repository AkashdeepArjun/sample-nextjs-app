import mongoose from "mongoose";


const user_schema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,

  },

  email: {

    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,


  },
  isVerified: {
    type: Boolean,
    default: false,

  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiryToken: Date,
  verifyPasswordToken: String,
  verifyPasswordTokenExpiry: Date,


});

mongoose.models = {};
const User = mongoose.model("dummy_user", user_schema);






export default User;

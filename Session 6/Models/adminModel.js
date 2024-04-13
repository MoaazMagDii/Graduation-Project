const mongoose = require('mongoose');


const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name!"],
  },

  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength: [8],
    //select: false,
  },

  role: {
    type: String,
    default: 'admin'
  },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;

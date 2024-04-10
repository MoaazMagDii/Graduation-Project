const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please tell us your name!"],
  },

  email: {
    type: String,
    required: [true, "please provide your email"],
    unique: true,
    lowercase: true, //transform the email into lower case
    validate: [validator.isEmail, "please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength: [8],
    //select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],

    //this only works on create and save not updating
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },

  balance: {
    type: Number,
    required: true,
    min: 0,
  },


  role: {
    type: String,
    default: 'user'
  },


});


userSchema.pre('save', async function (next) {
  //only runs this function if password was actually modified
  if (!this.isModified('password')) return next();

  //hashing the password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

  next();
});


userSchema.methods.verifyPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};


const User = mongoose.model('User', userSchema);

module.exports = User;

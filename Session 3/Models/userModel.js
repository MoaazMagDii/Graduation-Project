const mongoose = require('mongoose');
const validator = require('validator');


const userModel = mongoose.Schema({
    name: {
        type : String,
        required:[true, "Please tell us your name"],
    },

    email: {

        type: String,
        required: [true, "please tell us your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail],
    },

    password: {
        type: String,
        required: [true, "please enter your password"],
        minLength: [8],
    },

    passwordConfirm: {
        type: String, 
        required: [true, "please confirm your password"],

        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "passwords are not the same",
        },
    },

    balance: {
        type: Number,
        required: true,
        min: 0,
        default: 100000
    },

    role: {
        type: String,
        default: 'user',
    }

});


const User = mongoose.model("User", userModel);

module.exports = User;
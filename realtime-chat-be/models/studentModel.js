const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const studentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'This is a required field'],
        min:3,
        max:20,
        unique:true,
    },
    email: {
        type: String,
        required: [true, 'This is a required field'],
        min:3,
        max:20,
        unique:true,
    },
    password: {
        type: String,
        min:8,
        max:50,
        required: [true, 'This is a required field'],
    },
    firstName: {
        type: String,
        min:3,
        max:20,
        required: [true, 'This is a required field']
    },
    lastName: {
        type: String,
        min:3,
        max:20,
        required: [true, 'This is a required field']
    },
    isAvatarImgSet: {
        type: Boolean,
        default: false
    },
    avatarImg: {
        type: String,
        default: ""
    },
   
});



module.exports = mongoose.model("Students", studentSchema);
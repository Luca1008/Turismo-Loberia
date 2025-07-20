const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    surname: {
        type: String, 
        required: true
    },
    nick: {
        type: String, 
        required: true, 
        unique: true
    },
    bio: String,
    email: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String, 
        default: "role_user"
    },
    image: {
        type: String,
        default: "default.png"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

    userSchema.plugin(mongoosePaginate);

    module.exports = mongoose.model('User', userSchema);
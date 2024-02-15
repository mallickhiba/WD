const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    //role: {type: String,enum: ['Super', 'Admin', 'Poject Manager', 'Member'],default: 'Member'},
    admin: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Users = mongoose.model('Users', UserSchema);

module.exports = Users;
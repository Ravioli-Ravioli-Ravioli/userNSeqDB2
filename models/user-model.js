const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String,
    username: String,
    thumbnail: String,
    fname: String,
    gname: String,
    gender: String,
    provider: String,
    kind: String,
    etag: String,
    objectType: String,
    url: String,
    isPlusUser: Boolean,
    lang: String,
    cir: Number,
    verified: Boolean,
    email: String,
    reputation: Number,
    acType: String,
    contact: String,
    dob: String,
    desig: String,
    insti: String,
    instiAdd: String
});

const User = mongoose.model('user', userSchema);

module.exports = User;

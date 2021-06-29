const mongoose = require('mongoose');
const { Schema } = mongoose;

const apiinfo = new Schema({
    name : String,
    version : String,
    port : Number,
});

module.exports = mongoose.model('apiinf', apiinfo)
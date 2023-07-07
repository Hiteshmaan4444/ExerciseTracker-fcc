const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    count: Number,
    log:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'exercises'
    }
},{
    versionKey:false
})

let log = mongoose.model('logs',logSchema);

module.exports = log
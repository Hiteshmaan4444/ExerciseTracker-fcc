const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'users'
    },
    description: String,
    duration: Number,
    date: { type: Date, default: Date.now }, 
},{
    versionKey:false
})

const exercise = mongoose.model('exercise',exerciseSchema);

module.exports = exercise
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String
},{
    versionKey: false
})

let User = mongoose.model('user',userSchema);

module.exports=User
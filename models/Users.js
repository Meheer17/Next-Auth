const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name: String, 
    email: String,
    image: String, 
    emailVerified: Boolean,
    admin: Boolean
})

module.exports = mongoose.models.users ||  mongoose.model('users', UsersSchema);

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number
});

// Export the User model
module.exports = mongoose.model('User', userSchema);

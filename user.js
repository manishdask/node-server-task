
const  mongoose  = require("mongoose");

// define the schema 

const userSchema = new mongoose.Schema ({
    name: {type: String, require: true },
    email: {type: String, require: true , unique: true},
    password: {type: String, require: true }

});


// export the model
module.exports = mongoose.model('User', userSchema);
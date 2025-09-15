
const  mongoose  = require("mongoose");

// define the schema 

const userSchema = new mongoose.Schema ({
    name: {type: String, require: true },
    email: {type: String, require: true , unique: true},
    password: {type: String, require: true },
 role : { type: String , enum: [ "user", "admin"], default: "user"},

// latest notification
notifications: [{
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      } ]



});

// export the model
module.exports = mongoose.model('User', userSchema);
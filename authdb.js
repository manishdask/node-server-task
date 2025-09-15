const mongoose = require('mongoose'); 

const MONGO_URL = process.env.MONGO_URL; //from .env
mongoose.connect(MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB connection error:", err));


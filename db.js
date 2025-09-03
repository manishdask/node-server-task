const mongoose = require('mongoose'); 

const MONGO_URL = "mongodb+srv://manishkd120_db_user:manishkd021@manishapi.bdv2rkw.mongodb.net/?retryWrites=true&w=majority&appName=ManishAPI"

mongoose.connect(MONGO_URL, {
    useNewUrlParser : true,
    useUnifiedTopology: true

}) 
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB connection error:", err));


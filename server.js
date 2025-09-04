const express = require('express');
const mongoose = require('mongoose'); 
const bcrypt = require ('bcryptjs');
const jwt= require ('jsonwebtoken');


require('./db') // Connect DB 
const User = require ('./user') // import  User model

const app = express();
const PORT = 9000;
const JWT_SECRET = 'ThisIsSecretKey123@#';// Secret key for JWT 

app.use(express.json());
 


// To register user
app.post('/register', async (req, res) => {
 const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email }); // Check if user exists
 if (existingUser) {
       return res.send('User already exists');
 }
   
const hashedPassword = await bcrypt.hash(password, 10); // Hash password

const newUser = new User({ name, email, password: hashedPassword }); // Create new user
await newUser.save();
 
    res.send('User registered successfully'); // Send response
});



    // to login API
  app.post('/login', async (req, res) => {
     const { email, password } = req.body 
   
     const user = await User.findOne( {email});   // check if the user exits

     if (!user) {
      return res.json ("user not found")
     }

     const isMatch = await bcrypt.compare (password, user.password); //comparing the password
     if ( !isMatch) {
      return res.json ( "invalid password or email")
     }

    // Generate JWT token
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email
    };
const token = jwt.sign (payload, JWT_SECRET);
res.send ( "Login sucessful." + token);
    
});


// Update API to update detail
app.put('/update', async (req, res) => {
   const { name, email, password} = req.body;

   const user= await User.findOne({email}); // find user by email
   if (!user) {
      return res.json ("user not found");
   }

if (name){
   user.name =name  // update user name if new name is provided
}

if (password) {
   const hashedPassword = await bcrypt.hash(password, 10); // update password if new password is provided
   user.password = hashedPassword;
}

await user.save();
res.json ('user updated successfully');

})


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

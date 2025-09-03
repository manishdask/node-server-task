const express = require('express');
const mongoose = require('mongoose'); 
require('./database/db') // Connect DB 
const User = require ('./models/user') // import  User model

const app = express();
const PORT = 9000;

app.use(express.json());


// post api to add new user
app.post ( '/users' , async (req, res) =>{ // call back function

const user = new User (req.body);
await user.save();
res.send ("user saved!");
})

app.get ('/user', async (req, res)=> {
  const user = await User.find()
res.json(user)

})



// GET user by name
app.get('/users/:name', async (req, res) => {
  
  const user = await User.findOne ({ name: "Manish" });

  // If user exists, send it, otherwise send a message
  if (user) {
    res.json(user);
  } else {
    res.json({ message: "User not found" });
  }

});


// Update a user by name
app.put ('/user/:name', async (req, res) => 
  {
  const UserName = req.params.name // get the user name
  const newData = req.body // to upadate new data
const upadatedUser = await user.findOneAndUpdate(
 
{ name: userName }, newData, { new:true });

if (upadatedUser) res.json (upadatedUser);
else res.json("user not found");
});

// Delete a user by name

app.delete ('/user/:name', async (req, res) =>
{ 
  const userName = req.params.name;

  const deletedUser = await user.findOneAnddelete ( { name:userName});
  if (deletedUser){
    res.json ("user delted sucessfully");

  } else {
    res.json ("user not found");
  }
  
})


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

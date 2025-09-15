// controllers/authcontroller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schema/user');
const { authmiddleware, adminmiddleware } = require('../middleware/authmiddleware');

const JWT_SECRET = process.env.JWT_SECRET;

const multer = require('multer');
 




//set up multer to store file
const storage = multer.diskStorage({

  destination: (req, file,cb) =>{
    cb(null, 'uploads/');
  },

filename: ( req, file, cb)=> {
  const suffix= Date.now();
  cb(null, suffix + '_' + file.originalname);
}

})
const upload = multer ({storage});






//  define the function
function registerAuthRoutes(app) {
  app.post('/register', async (req, res) => {        //to register user
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.send('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.send('User registered successfully');
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json('user not found');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.json('invalid password or email');

    const payload = { id: user._id, name: user.name, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET);

    res.send('Login sucessful.' + token);
  });

  app.put('/update', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json('user not found');

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json('user updated successfully');
  });
// admin change password

app.put('/admin', async (req, res)=> {


  const {id} = req.params;
  const { newPassword } = req.body;
  try {
    const user = await User.findByID(id);
    if (!user) return res.send ("user not found");
    user.password = await bcrypt.hash (newPassword, 10);
    
// notification 
user.notifications.push ({

  message: 'Admin changed password'
});

await user.save();
res.send("Password updated by admin successfully");
  } catch (err) {
    res.send ("Error updating password")
  }

})

// Upload profile image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.json({
    message: 'Image uploaded successfully',
    file: req.file
  });
});


}

module.exports = registerAuthRoutes;

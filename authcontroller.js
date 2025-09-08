// controllers/authcontroller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schema/user');
const authMiddleware = require('../middleware/authmiddleware');



const JWT_SECRET = 'ThisIsSecretKey123@#';

//  to register
function registerAuthRoutes(app) {
  app.post('/register', async (req, res) => {
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
}

module.exports = registerAuthRoutes;

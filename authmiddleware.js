const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET

function authmiddleware (req,res, next) {
  const token = req.header('Authorization');
  if (!token) return res.send('No token');

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.send('Invalid token');
  }
};
 
// adminmiddleware

function adminmiddleware (req, res, next) {
  if ( req.user && req.user.role === "admin"){
    next ();
  } else {
    res.send("Access denied. Admin only");
  }
}

module.exports = { authmiddleware, adminmiddleware}
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'ThisIsSecretKey123@#';

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.send('No token');

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.send('Invalid token');
  }
};

// authserver.js
const express = require('express');
require ('dotenv').config ();
require('./database/authdb');



const registerAuthRoutes  = require('./controllers/authcontroller'); 
const { adminmiddleware } = require('./middleware/authmiddleware');
const app = express();
const PORT = 9000;

app.use(express.json());

registerAuthRoutes(app);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

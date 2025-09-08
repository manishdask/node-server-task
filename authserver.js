// authserver.js
const express = require('express');
require('./database/authdb');


const registerAuthRoutes  = require('./controllers/authcontroller'); 
const app = express();
const PORT = 9000;

app.use(express.json());

//  call it here
registerAuthRoutes(app);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

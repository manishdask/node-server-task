// Load express
const express = require('express');

// Create app
const app = express();

// Choose port
const PORT = 3000;

// Route home
app.get('/', (req, res) => {
  res.send('Hello, this is my first Express server!');
});

// Route about
app.get('/about', (req, res) => {
  res.send('This is the About Page.');
});

// Route API
app.get('/api', (req, res) => {
  const data = {
    name: "Manish",
    role: "Intern",
    stack: "Full-Stack"
  };
  res.json(data);
});

// Start the server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});

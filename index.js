// Simple API that returns a list of users
// This uses Express, a popular library for building web servers in Node.js

const express = require('express');
const app = express();

// Render will tell our app which port to use via process.env.PORT
// If that's not set (e.g. testing on your own computer), fall back to 3000
const PORT = process.env.PORT || 3000;

// Our list of users. Feel free to edit these or add more!
const users = [
  {
    LastName: "Dela Cruz",
    FirstName: "Juan",
    Email: "juan.delacruz@example.com",
    Password: "Passw0rd!23"
  },
  {
    LastName: "Santos",
    FirstName: "Maria",
    Email: "maria.santos@example.com",
    Password: "M4riaSant0s!"
  },
  {
    LastName: "Reyes",
    FirstName: "Carlos",
    Email: "carlos.reyes@example.com",
    Password: "Carl0sR3yes#"
  },
  {
    LastName: "Garcia",
    FirstName: "Ana",
    Email: "ana.garcia@example.com",
    Password: "AnaG@rcia99"
  },
  {
    LastName: "Lim",
    FirstName: "Kevin",
    Email: "kevin.lim@example.com",
    Password: "K3vinLim$88"
  }
];

// When someone visits the homepage ("/"), send back the list of users as JSON
app.get('/', (req, res) => {
  res.json(users);
});

// Also make it available at "/users" as a more descriptive endpoint
app.get('/users', (req, res) => {
  res.json(users);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

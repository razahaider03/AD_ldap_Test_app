require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ActiveDirectory = require('activedirectory2');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// AD Config - update these!
const config = {
  url: process.env.LDAP_URL,
  baseDN: process.env.LDAP_BASEDN,
  username: process.env.LDAP_USERNAME,
  password: process.env.LDAP_PASSWORD,
};

// console.log(process.env.LDAP_URL, process.env.LDAP_BASEDN)
const ad = new ActiveDirectory(config);

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'login.html'));
});

// Handle form submission
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Format the login name: DOMAIN\username
  const loginUser = `${config.username.split('\\')[0]}\\${username}`;

  ad.authenticate(loginUser, password, function(err, auth) {
    if (err) {
      console.error('ERROR: ' + JSON.stringify(err));
      return res.send('Authentication failed due to error.');
    }

    if (auth) {
      res.send('Authentication successful!');
    } else {
      res.send('Invalid credentials.');
    }
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

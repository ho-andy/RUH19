const express = require('express');
const app = express();
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser')
const connection = require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render("index");
});

app.get('/about', (req, res) => {
  res.render("about");
});

app.get('/sign-up', (req, res) => {
  res.render("signup");
});


// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

app.post('/submit-form', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  const country = req.body.country;

  var sql_creds = "INSERT INTO user_creds (user, password) VALUES ('" + username + "', '" + password + "')";
  var sql_info = "INSERT INTO user_information (user, country, personality) VALUES ('" + username + "', '" + country + "', 'A')";

  connection.query(sql_creds, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  connection.query(sql_info, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

  console.log(username);
  console.log(password);
  console.log(country);
  res.end()
});
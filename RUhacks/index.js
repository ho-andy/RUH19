var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var router = express.Router();
var bodyParser = require('body-parser')
const connection = require('./database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
app.use(express.static(__dirname + '/public'));
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

app.get('/chat', (req, res) => {
  res.render("chat");
});

//Server IO
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('user-message', function(msg){
    console.log("balls");
    io.emit('user-message', msg);
  });
});



// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

app.post('/submit-form', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  const country = req.body.country;

  
  var query = "SELECT * FROM user_creds WHERE user = '" + username + "'";

  var sql_creds = "INSERT INTO user_creds (user, password) VALUES ('" + username + "', '" + password + "')";
  var sql_info = "INSERT INTO user_information (user, country, personality) VALUES ('" + username + "', '" + country + "', 'A')";

  connection.query(query, function(err,result) {
    if(result && result.length){
      res.render("signup");
    }
    else{
      connection.query(sql_creds, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    
      connection.query(sql_info, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
      res.redirect('/chat');
    }
  res.end();
  });
});

app.post('/chat', (req,res)=>{
  const username = req.body.username;
  const password = req.body.password;
  console.log("1");
  var sql_creds = "SELECT * FROM user_creds WHERE user = '" + username + "' AND password='" + password + "'";
  console.log("2");

  if(result && result.length){
    res.render("chat");
    console.log("3");

  }
  else{
    res.render("index");
    console.log("4");

  }

});

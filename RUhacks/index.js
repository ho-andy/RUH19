var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.listen(65080);
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

app.get('/profile',(req,res) =>{
  res.render("profile");
});

//Server IO
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('user-message', function(msg){
    //var ip = socket.handshake.address;
    //var out = ip + ": " + msg;
    console.log("balls");
    io.emit('user-message', msg); // out --> msg
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
  var d = req.body;
  var userAnswer = [];

  for(var key in d){
    if(key != "username" && key != "password" && key != "country"){
      userAnswer.push(d[key]);
    }
  }
  
  var personality = calculation(userAnswer);
  console.log(personality);
  var query = "SELECT * FROM user_creds WHERE user = '" + username + "'";

  var sql_creds = "INSERT INTO user_creds (user, password) VALUES ('" + username + "', '" + password + "')";
  var sql_info = "INSERT INTO user_information (user, country, personality) VALUES ('" + username + "', '" + country + "', '" + personality + "')";

  connection.query(query, function(err,result) {
    if(result && result.length){
      res.redirect("/sign-up#failed");
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
      res.redirect('/');
    }
  res.end();
  });
});

app.post('/profile', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  var personality;
  var sql_creds = "SELECT * FROM user_creds WHERE user = '" + username + "' AND password='" + password + "'";

  connection.query("SELECT personality FROM user_information WHERE user='" + username + "'",function(err,row,fields){
    if(err)throw err;
    else{
      personality = row[0].personality;
      connection.query(sql_creds, function(err,result) {

        if(result && result.length){
          res.redirect("/profile#" + username + "#" + personality);
        }
        else{
          res.redirect("/#failed");
        }
      });
    }
  });



});

function calculation(userAnswer) {
  var openness=0, conscientiousness=0, extraversion=0, agreeableness=0, neuoticism=0;
  var personality;
  //openness
  for (var i = 0; i <= 2; i++) {
      if (userAnswer[i].trim() == "Agree") {
          openness+=2;
      }
      if (userAnswer[i].trim() == "Neutral") {
          openness+=1;
      }
  }

  //conscientiousness
  for (var i = 3; i <= 5; i++) {
      if (userAnswer[i].trim() == "Agree") {
        conscientiousness+=2;
      }
      if (userAnswer[i].trim() == "Neutral") {
        conscientiousness+=1;
      }
  }

  //extraversion
  for (var i = 6; i <= 8; i++) {
      if (userAnswer[i].trim() == "Agree") {
        extraversion+=2;
      }
      if (userAnswer[i].trim() == "Neutral") {
        extraversion+=1;
      }
  }

  //agreeableness
  for (var i = 9; i <= 11; i++) {
      if (userAnswer[i].trim() == "Agree") {
        agreeableness+=2;
      }
      if (userAnswer[i].trim() == "Neutral") {
        agreeableness+=1;
      }
  }

  //neuoticism
  for (var i = 12; i <= 14; i++) {
      if (userAnswer[i].trim() == "Agree") {
        neuoticism+=2;
      }
      if (userAnswer[i].trim() == "Neutral") {
        neuoticism+=1;
      }
  }

  console.log(userAnswer);
  //Should return the variable with highest number
  var personalities = [openness, conscientiousness, extraversion, agreeableness, neuoticism];
  var maxPersonality = Math.max.apply(Math.max, personalities);
  var personalitiesNumber = ["openness", "conscientiousness", "extraversion", "agreeableness", "neuoticism"];
  var answer = personalitiesNumber[personalities.indexOf(maxPersonality)];

  console.log(personalities);

  if (answer === "openness") {
      personality = "A";
  }
  if (answer === "conscientiousness") {
      personality = "B";
  }
  if (answer === "extraversion") {
      personality = "C";
  }
  if (answer === "agreeableness") {
      personality = "D";
  }
  if (answer === "neuoticism") {
      personality = "E";
  }

  return personality;

}
function setValue(value) {
  var t = value;
  return t;
}
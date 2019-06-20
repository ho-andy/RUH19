const mysql = require('mysql');
var connection = mysql.createConnection({
    socketPath: '', //GAE
    //host: '',                                                   //local
    user: '',
    password: '',
    database: ''
  })
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  module.exports = connection;

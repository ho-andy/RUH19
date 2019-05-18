const mysql = require('mysql');
var connection = mysql.createConnection({
    host: '35.236.239.48',
    user: 'admin',
    password: 'admin',
    database: 'penpalr'
  })
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  module.exports = connection;

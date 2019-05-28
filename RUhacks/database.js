const mysql = require('mysql');
var connection = mysql.createConnection({
    socketPath: '/cloudsql/certain-voyager-241002:us-east4:ru-hacks-2019', //GAE
    //host: '35.236.239.48',                                                   //local
    user: 'admin',
    password: 'admin',
    database: 'penpalr'
  })
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  module.exports = connection;

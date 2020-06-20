var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

/*
const connection = mysql.createConnection({.....});
global.db  = Bluebird.promisifyAll(connection);
db.queryAsync("SELECT * FROM users").then(function(rows){
console.log(rows);});
*/
var connection = mysql.createConnection({
  //host: 'localhost',
  user: 'student',
  password: 'student',
  database: 'chat'
});

connection.connect(function (err) {
  if (err) {
    throw err;
  }
  console.log('connected!');
});
module.exports = connection;


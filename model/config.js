const mysql = require('mysql');

var connection;

var db_config = {
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1234",
  database: "forum"
};

if (process.env.JAWSDB_URL) {
  connection  = mysql.createPool(process.env.JAWSDB_URL);  
} else {
  connection  = mysql.createPool(db_config);
}

connection.getConnection(function(err, connection) {
  // connected! (unless `err` is set)
});

module.exports = connection;

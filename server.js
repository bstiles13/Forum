const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const PORT = process.ENV || 9000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/dist"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(PORT, function() {
    console.log('App listening on port ' + PORT);
})

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "1234",
    database: "forum"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  });

  app.get('/threads', function(req, res) {
    var query = "SELECT * FROM threads";
    connection.query(query, function(err, data) {
      res.json(data);
    });
});

app.get('/thread/:id', function(req, res) {
  var id = req.params.id;
  var query = "SELECT * FROM threads WHERE id = " + id;
  connection.query(query, function(err, data) {
    res.json(data);
  });
});
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const PORT = process.env.PORT || 9000;
var connection;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/dist"));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.listen(PORT, function() {
    console.log('App listening on port ' + PORT);
})

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL)
} else {
  connection = mysql.createConnection({
      host: "localhost",
      port: 3306,
    
      // Your username
      user: "root",
    
      // Your password
      password: "1234",
      database: "forum"
    });
}
  
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
  var query = 'SELECT * FROM threads WHERE id = ' + id;
  connection.query(query, function(err, data) {
    res.json(data);
  })
})

app.get('/reply/:id', function(req, res) {
  var id = req.params.id;
  var query = "SELECT * FROM replies WHERE thread_id = " + id;
  connection.query(query, function(err, data) {
    if (err) {
      console.log(err);
    } else {
    res.json(data);
    }
  });
});

app.post('/newthread', function(req, res) {
  var thread = req.body;
  console.log(thread);
  var saveThread = 'INSERT INTO threads ( title, message, poster ) VALUES ( "' + thread.title + '", "' + thread.message + '", "' + thread.user + '" )';
  connection.query(saveThread, function(err, data) {
    err ? console.log(err) : res.json('success');    
  })
})

app.post('/newreply', function(req, res) {
  var reply = req.body;
  console.log(reply);
  var saveReply = 'INSERT INTO replies ( thread_id, message, poster ) VALUES ( ' + reply.id + ', "' + reply.reply + '", "' + reply.user + '")';
  connection.query(saveReply, function(err, data) {
    err ? console.log(err) : res.json('success');        
  });
})

app.post('/existinguser', function(req, res) {
  console.log(req.body);
  var username = req.body.username;
  var query = "SELECT * FROM users WHERE user_username = '" + username + "'";
  connection.query(query, function(err, data) {
    if (err) {
      console.log(err);
      res.json('unsuccessful');
    } else if (data.length === 0) {
      res.json('unsuccessful');
    } else {
      console.log(data);
      var savedHash = data[0].user_password;
      bcrypt.compare(req.body.password, savedHash, function(err, status) {
        console.log(status);
        status === true ? res.json('success') : res.json('unsuccessful');
      });
    }
  });
});

app.post('/newuser', function(req, res) {
  console.log(req.body);
  var username = req.body.username;
  var query = "SELECT * FROM users WHERE user_username = '" + username + "'";
  connection.query(query, function(err, data) {
    if (err) {
      console.log(err);
      res.json('Error');
    } else {
      if (data.length > 0) {
        res.json('unsuccessful');
      } else {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password1, salt, function(err, hash) {
              var saveUser = "INSERT INTO users ( user_username, user_password ) VALUES ( '" + username + "', '" + hash + "' )";
              connection.query(saveUser, function(err, data) {
                err ? console.log(err) : res.json('success');
              })
            });
        });
      }
    }
  });
});
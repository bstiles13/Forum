const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const connection = require('../model/config.js');


router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
});

router.get('/threads', function(req, res) {
    var query = "SELECT * FROM threads";
    connection.query(query, function(err, data) {
      res.json(data);
    });
});

router.get('/thread/:id', function(req, res) {
  var id = req.params.id;
  var query = 'SELECT * FROM threads WHERE id = ' + id;
  connection.query(query, function(err, data) {
    res.json(data);
  })
})

router.get('/reply/:id', function(req, res) {
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

router.post('/newthread', function(req, res) {
  var thread = req.body;
  console.log(thread);
  var saveThread = 'INSERT INTO threads ( title, message, poster ) VALUES ( "' + thread.title + '", "' + thread.message + '", "' + thread.user + '" )';
  connection.query(saveThread, function(err, data) {
    err ? console.log(err) : res.json('success');    
  })
})

router.post('/newreply', function(req, res) {
  var reply = req.body;
  console.log(reply);
  var saveReply = 'INSERT INTO replies ( thread_id, message, poster ) VALUES ( ' + reply.id + ', "' + reply.reply + '", "' + reply.user + '")';
  connection.query(saveReply, function(err, data) {
    err ? console.log(err) : res.json('success');        
  });
})

router.post('/existinguser', function(req, res) {
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

router.post('/newuser', function(req, res) {
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

module.exports = router;
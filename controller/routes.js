const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const connection = require('../model/config.js');

// Sends homepage to browser
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

// Sends all existing threads to homepage for display
router.get('/topics', function (req, res) {
  // var query = "SELECT * FROM topics ORDER BY id";
  var query = "SELECT t.*, r.topic_id, r.thread_id, r.message, r.poster, r.time_posted, t1.title FROM topics t LEFT JOIN replies r ON r.topic_id = t.id AND r.id = (SELECT MAX(r2.id) FROM replies r2 WHERE r.topic_id = r2.topic_id) LEFT JOIN threads t1 ON t1.id = r.thread_id ORDER BY id";
  connection.query(query, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

router.get('/onetopic/:id', function (req, res) {
  var id = req.params.id;
  var query = "SELECT * FROM topics WHERE id = " + id;
  connection.query(query, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// Sends all existing threads to homepage for display
router.get('/threads/:id', function (req, res) {
  var id = req.params.id;
  var query = "SELECT t1.*, COUNT(t2.id) AS count FROM threads AS t1 LEFT JOIN replies AS t2 ON t2.thread_id = t1.id WHERE t1.topic_id = " + id + " GROUP BY t1.id";
  connection.query(query, function (err, data) {
    if (err) {
      throw err;
    } else {
      res.json(data);
    };
  });
});

// Sends a single thread to browser when user selects one from homepage
router.get('/thread/:id', function (req, res) {
  var id = req.params.id;
  var query = 'SELECT * FROM threads WHERE id = ' + id;
  connection.query(query, function (err, data) {
    res.json(data);
  })
})

// Sends all replies for a single thread when a thread is selected from the homepage
router.get('/reply/:id', function (req, res) {
  var id = req.params.id;
  var query = "SELECT * FROM replies WHERE thread_id = " + id;
  connection.query(query, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

// Receives new thread from user and saves to database
router.post('/newthread', function (req, res) {
  var thread = req.body;
  var saveThread = "INSERT INTO threads ( topic_id, title, message, poster ) VALUES ( " + thread.topic + ", '" + thread.title + "', '" + thread.message + "', '" + thread.user + "' )";
  connection.query(saveThread, function (err, data) {
    err ? console.log(err) : res.json(data);
  })
})

// Receives new reply from user and saves to database for any given thread
router.post('/newreply', function (req, res) { 
  var reply = req.body;
  let message = '';
  if (req.body.quotedUser != '') {
    message = '<div class="quote"><div class="quote-poster">Posted by ' + reply.quotedUser + '</div><div class="quote-body">' + reply.quotedPost + '</div></div><br/>' + reply.reply;
  } else {
    message = reply.reply;
  }
  var saveReply = "INSERT INTO replies ( topic_id, thread_id, message, poster ) VALUES ( " + reply.topicId + ", " + reply.threadId + ", '" + message + "', '" + reply.user + "' )";
  connection.query(saveReply, function (err, data) {
    err ? console.log(err) : res.json('success');
  });
})

router.post('/deletereply', function (req, res) {
  var id = req.body.id;
  var query = "DELETE FROM replies WHERE id = " + id;
  connection.query(query, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
})

router.post('/deletethread', function (req, res) {
  var id = req.body.id;
  var query = "DELETE FROM threads WHERE id = " + id;
  connection.query(query, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
})

// Receives and authenticates login information from existing users
router.post('/existinguser', function (req, res) {
  var username = req.body.username;
  var query = "SELECT * FROM users WHERE user_username = '" + username + "'";
  connection.query(query, function (err, data) {
    if (err) {
      console.log(err);
      res.json('unsuccessful');
    } else if (data.length === 0) {
      res.json('unsuccessful');
    } else {
      var savedHash = data[0].user_password;
      bcrypt.compare(req.body.password, savedHash, function (err, status) {
        console.log(status);
        status === true ? res.json('success') : res.json('unsuccessful');
      });
    }
  });
});

// Accepts login information from new users, checks if the username exists, and saves the user if unique
router.post('/newuser', function (req, res) {
  var username = req.body.username;
  var query = "SELECT * FROM users WHERE user_username = '" + username + "'";
  connection.query(query, function (err, data) {
    if (err) {
      console.log(err);
      res.json('Error');
    } else {
      if (data.length > 0) {
        res.json('unsuccessful');
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password1, salt, function (err, hash) {
            var saveUser = "INSERT INTO users ( user_username, user_password ) VALUES ( '" + username + "', '" + hash + "' )";
            connection.query(saveUser, function (err, data) {
              err ? console.log(err) : res.json('success');
            })
          });
        });
      }
    }
  });
});

module.exports = router;
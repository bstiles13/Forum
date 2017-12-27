const bcrypt = require('bcrypt');
const connection = require('../model/config.js');

const controller = {

    // Sends all existing threads to homepage for display
    topics: function (req, res) {
        // var query = "SELECT * FROM topics ORDER BY id";
        var query = "SELECT t.*, r.topic_id, r.thread_id, r.message, r.poster, r.time_posted, t1.title FROM topics t LEFT JOIN replies r ON r.topic_id = t.id AND r.id = (SELECT MAX(r2.id) FROM replies r2 WHERE r.topic_id = r2.topic_id) LEFT JOIN threads t1 ON t1.id = r.thread_id ORDER BY id";
        connection.query(query, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
    },

    oneTopic: function (req, res) {
        var id = req.params.id;
        var query = "SELECT * FROM topics WHERE id = " + id;
        connection.query(query, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
    },

    // Sends all existing threads to homepage for display
    threads: function (req, res) {
        var id = req.params.id;
        var query = "SELECT t1.*, COUNT(t2.id) AS count FROM threads AS t1 LEFT JOIN replies AS t2 ON t2.thread_id = t1.id WHERE t1.topic_id = " + id + " GROUP BY t1.id";
        connection.query(query, function (err, data) {
            if (err) {
                throw err;
            } else {
                res.json(data);
            };
        });
    },

    // Sends a single thread to browser when user selects one from homepage
    thread: function (req, res) {
        var id = req.params.id;
        var query = 'SELECT * FROM threads WHERE id = ' + id;
        connection.query(query, function (err, data) {
            res.json(data);
        })
    },

    // Sends all replies for a single thread when a thread is selected from the homepage
    reply: function (req, res) {
        var id = req.params.id;
        var query = "SELECT * FROM replies WHERE thread_id = " + id;
        connection.query(query, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
    },

    // Receives new thread from user and saves to database
    newThread: function (req, res) {
        var thread = req.body;
        connection.query("INSERT INTO threads SET ?", {
            topic_id: thread.topic,
            title: thread.title,
            message: thread.message,
            poster: thread.user
        }, function (err, data) {
            err ? console.log(err) : res.json(data);
        })
    },

    // Receives new reply from user and saves to database for any given thread
    newReply: function (req, res) {
        var reply = req.body;
        let message = '';
        if (req.body.quotedUser != '') {
            message = '<div class="quote"><div class="quote-poster">Posted by ' + reply.quotedUser + '</div><div class="quote-body">' + reply.quotedPost + '</div></div><br/>' + reply.reply;
        } else {
            message = reply.reply;
        }
        connection.query("INSERT INTO replies SET ?", {
            topic_id: reply.topicId,
            thread_id: reply.threadId,
            message: message,
            poster: reply.user
        }, function (err, data) {
            err ? console.log(err) : res.json('success');
        });
    },

    deleteReply: function (req, res) {
        var id = req.body.id;
        var query = "DELETE FROM replies WHERE id = " + id;
        connection.query(query, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
    },

    deleteThread: function (req, res) {
        var id = req.body.id;
        var query = "DELETE FROM threads WHERE id = " + id;
        connection.query(query, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                res.json(data);
            }
        });
    },

    // Receives and authenticates login information from existing users
    existingUser: function (req, res) {
        var username = req.body.username;
        var query = "SELECT * FROM users WHERE user_username = '" + username + "'";
        connection.query(query, function (err, data) {
            if (err) {
                console.log(err);
                res.json(false);
            } else if (data.length === 0) {
                res.json(false);
            } else {
                var savedHash = data[0].user_password;
                bcrypt.compare(req.body.password, savedHash, function (err, status) {
                    console.log(status);
                    status === true ? res.json(true) : res.json(false);
                });
            }
        });
    },

    // Accepts login information from new users, checks if the username exists, and saves the user if unique
    newUser: function (req, res) {
        var username = req.body.username;
        var query = "SELECT * FROM users WHERE user_username = '" + username + "'";
        connection.query(query, function (err, data) {
            if (err) {
                console.log(err);
                res.json(false);
            } else {
                if (data.length > 0) {
                    res.json(false);
                } else {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(req.body.password1, salt, function (err, hash) {
                            var saveUser = "INSERT INTO users ( user_username, user_password ) VALUES ( '" + username + "', '" + hash + "' )";
                            connection.query(saveUser, function (err, data) {
                                err ? console.log(err) : res.json(true);
                            })
                        });
                    });
                }
            }
        });
    },

}

module.exports = controller;
const express = require('express');
const router = new express.Router();
const path = require('path');
const controller = require('../controller/controller.js');

// Sends all existing threads to homepage for display
router.get('/topics', controller.topics);

router.get('/onetopic/:id', controller.oneTopic);

// Sends all existing threads to homepage for display
router.get('/threads/:id', controller.threads);

// Sends a single thread to browser when user selects one from homepage
router.get('/thread/:id', controller.thread);

// Sends all replies for a single thread when a thread is selected from the homepage
router.get('/reply/:id', controller.reply);

// Receives new thread from user and saves to database
router.post('/newthread', controller.newThread);

// Receives new reply from user and saves to database for any given thread
router.post('/newreply', controller.newReply)

router.post('/deletereply', controller.deleteReply);

router.post('/deletethread', controller.deleteThread);

// Receives and authenticates login information from existing users
router.post('/existinguser', controller.existingUser);

// Accepts login information from new users, checks if the username exists, and saves the user if unique
router.post('/newuser', controller.newUser);

// Sends homepage to browser
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

module.exports = router;
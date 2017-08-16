const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
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
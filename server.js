const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const PORT = process.env.PORT || 4201;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/dist"));
app.use('/', routes);

app.listen(PORT, function() {
    console.log('App listening on port ' + PORT);
})
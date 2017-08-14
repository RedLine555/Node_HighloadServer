const express = require('express'),
    bodyParser = require('body-parser'),
    user_route = require('./routes/user.route');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//Init routes
app.use(user_route);

app.listen(4000, () => {
    console.log('Application started');
})
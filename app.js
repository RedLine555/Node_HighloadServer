const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    user_route = require(path.resolve('server/routes/user.route')),
    location_route = require(path.resolve('server/routes/location.route')),
    visit_route = require(path.resolve('server/routes/visit.route'));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//Init routes
app.use(user_route);
app.use(location_route);
app.use(visit_route);

app.listen(4000, () => {
    console.log('Application started');
})
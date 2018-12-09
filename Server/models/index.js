//When setting up a model directory it will automatically look for index.js within. This file is where we will connect to mongo
//setting a model for index.js with mongodb. requiring mongoose for handling mongodb in js. We are responding with JSON since it's an API were building
var mongoose = require('mongoose');
//setting debug to true
// allows us to see what is happening when things are being sent to the database
mongoose.set('debug', true);
// connecting to the db server
//todo-api is what we are calling this db
mongoose.connect('mongodb://localhost/todo-api');

// allows us to use promise syntax like .then
mongoose.Promise = Promise;
// reqiring the Todo var and exporting it out
module.exports.Todo = require("./todo");
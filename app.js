//require express for routing
var express = require('express');
var app = express();
var path = require('path');
//make node  aware of ejs files
app.set('view engine','ejs');
//import Controller files
var todoController = require('./controller/todoController');

//use the static files
app.use('/static',express.static('static'));

//fire Controller
todoController(app);

//listen to port 3000
app.listen(3000);

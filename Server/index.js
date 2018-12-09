//requiring express and saving to app var
var express = require('express'),
    app = express(),
    //setting port as 3000 
    port = process.env.PORT || 3000,
    //bodyParser for inputing to body
    bodyParser = require('body-parser');
    
    //requiring todo routes
var todoRoutes = require("./routes/todos");

// bodyParser syntax needed
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// setting up the use of public and views directories
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));

// when we get '/' render index.html
// Here we are sending json instead of a message. To do this, we simply send our response in an object like {message: "He there!"}
// can also use res.json to be even more clear
app.get('/', function(req, res){
    res.sendFile("index.html");
});

// this is a prefix for todos paths. All url paths start with /api/todos, when we get a get request to /, its actually to api/todos
app.use('/api/todos', todoRoutes);

// set port to listen for pushes and get them
app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + process.env.PORT);
})
    
    
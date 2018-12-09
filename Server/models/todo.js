//requiring mongoose for handling schema
var mongoose = require('mongoose');

//creating a Schema that will take a string, boolen and created date object.
var todoSchema = new mongoose.Schema({
    name: {
        //passed in more than just string to make it required. Thing of other things passed in beyond type as attributes in css. They add to the object. This one makes it required 
        type: String,
        required: 'Name cannot be blank!'
    },
    completed: {
        type: Boolean,
        //this automatically sets it as false
        default: false
    },
    created_date: {
        type: Date,
        //default is current date. With using two defaults all we really need the user to provide is a name since these are taken care of
        default: Date.now
    }
});

//setting the todo model in todoSchema
// uppercase Todo is the standard
// saving the model as singular Todo in the db and using the todoSchema. 
var Todo = mongoose.model('Todo', todoSchema);

// exporting model for use of Todo var through docs
module.exports = Todo;

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/todos-backend");
// mongoose.set("debug", true);
// mongoose.Promise = Promise;

// const todoSchema = new mongoose.Schema({
//   task: String
// });

// const Todo = mongoose.model("Todo", todoSchema);

// module.exports = Todo;

// these routes are included with index.js models. We set up mongoose promises so that we can send and handling asyncronously

// require models for db handling. save to db
var db = require('../models');

//we exported Todo from the index.js model
exports.getTodos = function(req, res){
    //finding Todo objects in db. Sending these files in a JSON object if found. Or sending error
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.createTodo = function(req, res){
    //creating new todo based on input in body and sending it to db. If successful, respond with success status and send in json new todo
  db.Todo.create(req.body)
  .then(function(newTodo){
      res.status(201).json(newTodo);
  })
  // error
  .catch(function(err){
      res.send(err);
  })
}

exports.getTodo = function(req, res){
    //searching for todo by id. Params of todo are specified by number in todoId param
   db.Todo.findById(req.params.todoId)
   // if we find todo send json of info
   .then(function(foundTodo){
       res.json(foundTodo);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.updateTodo =  function(req, res){
    //finding todoId by path then updating with what was input into the body. new:true is placed in because mongoose will respond first with the old data then the new on res.json if we don't. by default this method responds with the old data before it was changed
   db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
   .then(function(todo){
       res.json(todo);
   })
   .catch(function(err){
       res.send(err);
   })
}

exports.deleteTodo = function(req, res){
    //finding by id in path and removing
   db.Todo.remove({_id: req.params.todoId}) 
   .then(function(){
       res.json({message: 'We deleted it!'});
   })
   .catch(function(err){
       res.send(err);
   })
}

module.exports = exports;
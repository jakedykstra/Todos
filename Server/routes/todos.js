var express = require('express');
// allows us to break our routes out into modular chunks
var router = express.Router();
// requiring db models, which will search in models/index.js
var db = require("../models");
// requiring helpers which is used to keep this page nice and cleaned up
var helpers = require("../helpers/todos");

//at home page getTodos and createTodo from helpers
router.route('/')
// gets all todos from db and responds with json of them
 .get(helpers.getTodos)
 //creates todo to db and responds with json of todo
 .post(helpers.createTodo)

 // when clicking on a todo, getTodo
 // : allows anything to go in after
router.route('/:todoId')
// get specific todo info
  .get(helpers.getTodo)
  // updating 
  .put(helpers.updateTodo)
  // delete todo
  .delete(helpers.deleteTodo)
  
module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Todo = require("../models/todo");

// router.get("/", function(req, res, next) {
//   Todo.find({})
//     .then(todos => res.send(todos))
//     .catch(err => next(err));
// });

// router.post("/", function(req, res, next) {
//   Todo.create(req.body)
//     .then(todo => res.status(201).send(todo))
//     .catch(err => next(err));
// });

// router.delete("/:id", function(req, res, next) {
//   Todo.findByIdAndRemove(req.params.id)
//     .then(todo => res.send(todo))
//     .catch(err => next(err));
// });

// module.exports = router;

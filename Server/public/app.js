/* global $ */
$(document).ready(function(){
  //request for json from api/todos
  $.getJSON("/api/todos")
  //calling addTodos with data
  .then(addTodos)
  
  // on keypress to input, call createTodo
  $('#todoInput').keypress(function(event){
    if(event.which == 13) {
      createTodo();
    }
  });
  
  //on click of list li, call updateTodo with this passed in
  $('.list').on('click', 'li', function(){
    updateTodo($(this));
  })
  
  // if on list click the event runs up to span, stopPropagation so it doesnt continue up to h1. removeTodo
  $('.list').on('click', 'span', function(e){
    e.stopPropagation();
    removeTodo($(this).parent());
  })
});

function addTodos(todos) {
  //add todos to page here preaking out into a list
  todos.forEach(function(todo){
    addTodo(todo);
  });
}
// how we are laying out the todo
function addTodo(todo){
  var newTodo = $('<li class="task">'+todo.name +' <span>X</span></li>');
  //placing the id info based on the todo._id info we get from the json
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if(todo.completed){
    newTodo.addClass("done");
  }
  $('.list').append(newTodo);
}

function createTodo(){
  //send request to create new todo
  var usrInput = $('#todoInput').val();
  $.post('/api/todos',{name: usrInput})
  .then(function(newTodo){
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err);
  })
}

function removeTodo(todo){
  var clickedId = todo.data('id');
  var deleteUrl = '/api/todos/' + clickedId; 
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data){
    todo.remove();
  })
  .catch(function(err){
    console.log(err);
  })
}

function updateTodo(todo){
  var updateUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone}
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTodo){
    todo.toggleClass("done");
    todo.data('completed', isDone);
  })
}
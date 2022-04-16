const express = require('express');
const app = express();

app.use(express.json());    // add JSON express middleware

let todos = [];   // handles all the todos

/*
  -------------------- get all todos -------------------------

  1. return all the todos
*/
app.get("/api/todos", (req, res) => {

  // 1
  res.send(todos);
});

/*
  ---------------------- add a todo -------------------

  1. destructure the todo from the response
  2. save to the todo list
  3. get the index of the created todo
  4. return the created todo and index
*/
app.post("/api/todos", (req, res) => {

  // 1.
  let { todo } = req.body;

  // 2.
  todos.push(todo);

  // 3.
  let index = todos.length;

  // 4.
  res.send({ todo, index });            // shortcut for: { todo: todo, index: index }
});

/*
  -------------- change a todo --------------------

  1. get index to change
  2. destructure the item from the response
  3. replace the todo at index
  4. return changed todo and index

*/
app.get("/api/todos/:index", (req, res) => {
  // 1.
  let { index } = req.params;           // same as: let index = req.params.index;

  // 2.
  let { todo } = req.body;

  // 3.
  todos[index - 1] = todo;            // "index" parameter is 1-index by convention

  // 4.
  res.send({ todo, index });            // shortcut for: { todo: todo, index: index }

});

/*
  -------------------- delete a todo ---------------

  1. get the index to delete
  2. save the todo to a variable
  3. delete the item at the index
  4. shift all items after it a step to the left
  5. pop the last item
  6. return the deleted to do and the index
*/
app.post("/api/todos/:index", (req, res) => {
  // 1.
  let { index } = req.params;

  // 2.
  let todo = todos[index - 1]       // "index" parameter is 1-index by convention

  // 3.
  delete todos[index - 1];

  // 4.
  for (let i = index - 1; i < todos.length - 1; i++) {
    todos[i] = todos[i + 1];
  }

  // 5.
  todos.pop();

  // 6. 
  res.send({ todo, index });        // shortcut for: { todo: todo, index: index }
})
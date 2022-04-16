const express = require('express');
const app = express();

app.use(express.json());    // adds JSON express middleware
app.use(express.static('static'));   // adds static hosting for 'static' folder
let todos = [];   // handles all the todos


/*
  -------------------- get all todos -------------------------

  1. return all the todos
*/
app.get("/api/todos", (req, res) => {
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
  let { todo } = req.body;
  todos.push(todo);
  let index = todos.length;
  res.send({ todo, index });            // { todo: todo, index: index }
});

/*
  -------------- change a todo --------------------

  1. get index to change
  2. destructure the item from the response
  3. replace the todo at index
  4. return changed todo and index
*/
app.put("/api/todos/:index", (req, res) => {
  let { index } = req.params;         // index = req.params.index;
  let { todo } = req.body;
  todos[index - 1] = todo;            // "index" parameter is 1-index by convention
  res.send({ todo, index });          // { todo: todo, index: index }

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
app.delete("/api/todos/:index", (req, res) => {
  let { index } = req.params;
  let todo = todos[index - 1]       // "index" parameter is 1-index by convention
  delete todos[index - 1];

  for (let i = index - 1; i < todos.length - 1; i++) {
    todos[i] = todos[i + 1];
  }
  
  todos.pop();
  res.send({ todo, index });        // { todo: todo, index: index }
})

app.listen(8000, () => console.log('listening on port 8000...'))    // setup listener
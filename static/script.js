/*
  The "newTodo" function adds a new todo item to the list

  It adds a new todo with the following steps:
  1. stop the form from reloading when submitted
  2. get the value of the add-new todo "input"
  3. package the new todo to an object
  4. send the object to the server
  5. update the user interface
*/
function newTodo(e) {
  e.preventDefault();
  let item = document.getElementById("new-todo").value;
  let body = { todo: item };

  fetch("/api/todos", {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(() => {
      update();
    })
}

/*
  The "changeTodo" function changes a todo item in the list

  It changes a todo item with the following steps:
  1. stop the form from reloading when submitted
  2. get the value of the change-todo "input"
  3. get the value of the change-todo "select"
  4. package the new todo to an object
  5. send the object to the server
  6. update the user interface
*/
function changeTodo(e) {
  e.preventDefault();
  let item = document.getElementById("new-todo-change").value;
  let pos = document.getElementById("todo-pos").value;
  let body = { todo: item };

  fetch(`/api/todos/${pos}`, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(() => {
      update();
    })
}

/*
  The "changeTodo" function changes a todo item in the list

  It changes a todo item with the following steps:
  1. stop the form from reloading when submitted
  2. get the value of the change-todo "input"
  3. get the value of the change-todo "select"
  4. package the new todo to an object
  5. send the object to the server
  6. update the user interface
*/
function deleteTodo(e) {
  e.preventDefault();
  let pos = document.getElementById("del-todo-pos").value;

  fetch(`/api/todos/${pos}`, {
    method: "DELETE"
  })
    .then(() => {
      update();
    })
}

/*
  The below waits for the page to load before starting the script
  
  When the browser triggers the below script, The script does the following:
  1. update the ui components
  2. register the onsubmit event for the add-todo form
  3. register the change-todo form's onsubmit event
  4. register the delete-todo form's onsubmit event
*/
window.addEventListener('load', () => {
  update();
  document.getElementById("add-todo").addEventListener('submit', newTodo);
  document.getElementById("change-todo").addEventListener('submit', changeTodo);
  document.getElementById("delete-todo").addEventListener('submit', deleteTodo);
});

/*
  The below function updates the following:
  * the change-todo form's "select" element
  * the list of todos
  
  The following describes the steps that will be taken:
  1. fetch the list of todos from the backend
  2. parse the todos to a json format
  3. convert the todos to HTML lists
  4. insert the list into the ul element 
  5. prepare an list of numbers for the change-todo and delete-todo dropdown
  6. insert a list of numbers into the change-todo and delete-todo dropdown
  
*/

function update() {
  fetch('/api/todos')
    .then(res => res.json())
    .then(todo => {
      const htmlList = toList(todo);
      document.getElementById("list").innerHTML = htmlList; 
      const numbers = createNumbers(todo.length);
      document.getElementById("todo-pos").innerHTML = numbers;
      document.getElementById("del-todo-pos").innerHTML = numbers;
    })
}

/*
  The function below converts an array to a
  string of li tags. e.g

  t = [
    "a",
    "b",
    "c"
  ]

  result -> "
  <li>a</li>
  <li>b</li>
  <li>c</li>
  "
  -------------------------------

  The following is how it works
  1. use "map" method to convert the items to a the element string
  2. use "join" method to combine them into one string
*/
function toList(array) {
  return array
    .map(item => `<li>${item}</li>` )
    .join("\n");
}

/*
  The function below has the following properties
  * it takes a number as argument
  * it generates an list of numbers surrounded by an "option" element
  
  The steps in the function are described in the following:
  1. create an empty array
  2. create a for loop from 1 to the argument specified
  3. push each number to the empty array
  4. surround each number with an "option" tag using "map"
  4. join the elements with newlines

  Example:
    n = [1, 2, 3, 4]

    result ->
    "
      <option value"1">1</option>
      <option value"2">2</option>
      <option value"3">3</option>
      <option value"4">4</option>
    "
*/
function createNumbers(n) {
  let numbers = [];

  for (let i = 1; i <= n; i++) {
    numbers.push(i);
  }
  
  return numbers
    .map(n => `<option value="${n}">${n}</option>`)
    .join("\n");
}
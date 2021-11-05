class ToDo {
  constructor(task) {
    this.task = task;
  }
}

class UI {
  static addTodo(todo) {
    const ul = document.querySelector(".todo-list");
    const li = document.createElement("li");
    li.classList.add("flex", "container");

    li.innerHTML = `
      <div class="col2">
        <input type="checkbox" /> 
        <p>${todo.task}</p>
      </div>
      <i class="fas fa-trash-alt delete"></i>
    `;
    ul.append(li);
  }

  static deleteTodo(target) {
    if (target.classList.contains("delete")) target.parentElement.remove();
  }

  static clearFields() {
    const inputTask = (document.querySelector("#task").value = "");
  }
}

class Store {
  static getTodo() {
    let todos;

    if (localStorage.getItem("todos") === null) todos = [];
    else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
  }
  static displayTodo() {
    const items = document.querySelector(".items");
    const todos = Store.getTodo();

    todos.forEach((todo) => {
      UI.addTodo(todo);
    });

    items.textContent = `${todos.length} items left`;
  }
  static addTodo(todo) {
    const items = document.querySelector(".items");
    const todos = Store.getTodo();

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    items.textContent = `${todos.length} items left`;
  }
  static removeTodo(target) {
    const items = document.querySelector(".items");
    const todos = Store.getTodo();

    todos.forEach((todo, index) => {
      if (
        target.classList.contains("delete") &&
        todo.task === target.previousElementSibling.children[1].textContent
      )
        todos.splice(index, 1);
      items.textContent = `${todos.length} items left`;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

//EventListener
document.addEventListener("DOMContentLoaded", Store.displayTodo);

document.querySelector(".todos").addEventListener("keypress", (e) => {
  const inputTask = document.querySelector("#task").value;

  if (e.key === "Enter") {
    if (inputTask === "") alert("Please enter task");
    else {
      const task = new ToDo(inputTask);
      UI.addTodo(task);

      Store.addTodo(task);
      UI.clearFields();
    }
  }
});

document.querySelector(".todo-list").addEventListener("click", (e) => {
  UI.deleteTodo(e.target);
  Store.removeTodo(e.target);
});

//Todo Constructor
class ToDo {
  constructor(task) {
    this.task = task;
  }
}

class UI {
  static addTask(todo) {
    const todoList = document.querySelector(".todo-list");
    const li = document.createElement("li");
    li.classList.add("flex", "container");
    li.innerHTML = `
      <div class="col2">
          <input type="checkbox" /> 
          <p>${todo.task}</p>
      </div>
      <i class="fas fa-trash-alt delete"></i>
    `;
    todoList.append(li);
  }
  static deleteBook(target) {
    if (target.classList.contains("delete")) target.parentElement.remove();
  }
  static clearFields() {
    document.querySelector("#task").value = "";
  }
}

//Event Listener
document.querySelector(".todos").addEventListener("keypress", (e) => {
  const task = document.querySelector("#task").value;
  if (e.key === "Enter") {
    const todo = new ToDo(task);

    if (task === "") alert("Please enter task");
    else {
      UI.addTask(todo);
      UI.clearFields();
    }
  }
});

document.querySelector(".card").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});

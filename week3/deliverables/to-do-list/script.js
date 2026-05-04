let tasks = []; // a storage to manipulate data

const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    button.click();
  }
});
button.addEventListener("click", function () {
  const taskText = input.value;

  if (taskText === "") return;
  tasks.push(taskText);
  input.value = "";
  renderTasks();
});

function renderTasks() {
  list.innerHTML = ""; //re-rendering our user interface
  tasks.forEach(function (task, index) {
    // looping through data(tasks)
    const li = document.createElement("li");
    li.textContent = task;
    li.addEventListener("click", function () {
      const done = (li.style.textDecoration = "line-through");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1); //explain: .splice() accept 3 parameters, the first selects, the second how many should be removed then the third the item to be added
      renderTasks();
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

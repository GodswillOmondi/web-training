let tasks = [];

const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

button.addEventListener("click", function () {
  const taskText = input.value;
  if (taskText === "") return;

  tasks.push(taskText);
  input.value = "";
  renderTasks();
});

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.textContent = task;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      renderTasks();
    });
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

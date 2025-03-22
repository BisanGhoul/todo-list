const taskList = document.querySelector("[data-tasks]");

const tasks = [
  { id: 1, todo: "Laundry", completed: false },
  { id: 2, todo: "Buy groceries", completed: true },
];

function createTodoElement(task) {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  if (task.completed) li.classList.add("completed");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task-${task.id}`;
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-checked", task.completed.toString());

  // Label
  const taskLabel = document.createElement("label");
  taskLabel.htmlFor = `task-${task.id}`;
  if (task.completed) {
    const crossedOut = document.createElement("s");
    crossedOut.textContent = task.todo;
    taskLabel.appendChild(crossedOut);
  } else {
    taskLabel.textContent = task.todo;
  }

  // Edit Button
  const taskEditBtn = document.createElement("button");
  taskEditBtn.classList.add("edit-btn");
  taskEditBtn.setAttribute("aria-label", `Edit task ${task.todo}`);
  const taskEditImg = document.createElement("img");
  taskEditImg.src = task.completed
    ? "assets/img/edit-icon-disables-35.svg"
    : "assets/img/edit-icon-35.svg";
  taskEditBtn.appendChild(taskEditImg);

  // Delete Button
  const taskDeleteBtn = document.createElement("button");
  taskDeleteBtn.classList.add("delete-btn");
  taskDeleteBtn.setAttribute("aria-label", `Delete task ${task.todo}`);
  const deleteIcon = document.createElement("img");
  deleteIcon.src = task.completed
    ? "assets/img/delete-icon-disabled-40.svg"
    : "assets/img/delete-icon-40.svg";
  taskDeleteBtn.appendChild(deleteIcon);

  li.appendChild(checkbox);
  li.appendChild(taskLabel);
  li.appendChild(taskEditBtn);
  li.appendChild(taskDeleteBtn);

  return li;
}

tasks.forEach((task) => taskList.appendChild(createTodoElement(task)));

const API_URL = "https://dummyjson.com/todos";
const TODO_LIMIT = 5;

const taskList = document.querySelector("[data-tasks]");
let tasks = [];

async function init() {
  tasks = await loadTasks();
  if (!Array.isArray(tasks) || tasks.length === 0) {
    console.error("No tasks available to render.");
    return;
  }
  renderList();
}

init();

async function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (storedTasks.length > 0) {
    console.log(storedTasks);
    return storedTasks;
  } else {
    const fetchedTasks = await fetchTodos();
    localStorage.setItem("tasks", JSON.stringify(fetchedTasks));
    return fetchedTasks;
  }
}

async function fetchTodos() {
  try {
    const response = await fetch(`${API_URL}?limit=${TODO_LIMIT}`);
    const data = await response.json();
    console.log("Fetched todos:", data);
    return Array.isArray(data.todos) ? data.todos : [];
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
}

function createTodoElement(task) {
  if (!task || !task.todo) {
    console.error("Invalid task object:", task);
    return document.createElement("li");
  }

  const li = document.createElement("li");
  li.classList.add("todo-item");
  if (task.completed) li.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task-${task.id}`;
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-checked", task.completed.toString());
  checkbox.addEventListener("change", () => toggleTaskCompletion(task.id));

  const taskLabel = document.createElement("label");
  taskLabel.htmlFor = `task-${task.id}`;
  if (task.completed) {
    const crossedOut = document.createElement("s");
    crossedOut.textContent = task.todo;
    taskLabel.appendChild(crossedOut);
  } else {
    taskLabel.textContent = task.todo;
  }

  const taskEditBtn = document.createElement("button");
  taskEditBtn.classList.add("edit-btn");
  taskEditBtn.setAttribute("aria-label", `Edit task ${task.todo}`);
  const taskEditImg = document.createElement("img");
  taskEditImg.src = task.completed
    ? "assets/img/edit-icon-disables-35.svg"
    : "assets/img/edit-icon-35.svg";
  taskEditBtn.appendChild(taskEditImg);

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

function toggleTaskCompletion(taskId) {
  tasks = tasks.map((task) => {
    return task.id === taskId ? { ...task, completed: !task.completed } : task;
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderList();
}

function renderList() {
  clearElement(taskList);
  tasks
    .filter((task) => task && task.id !== undefined) 
    .forEach((task) => taskList.appendChild(createTodoElement(task)));
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

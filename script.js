const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = []; // Array to hold task objects { text: "...", completed: true/false }

// Load saved tasks from localStorage when page loads
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("tasks");
  if (saved) {
    tasks = JSON.parse(saved);
    tasks.forEach(task => createTaskElement(task));
  }
});

// Add new task when button clicked
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  const newTask = { text: taskText, completed: false };
  tasks.push(newTask);
  createTaskElement(newTask);
  saveTasks();
  taskInput.value = "";
  taskInput.focus();
});

// Add task on Enter key press
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});

function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  if (task.completed) {
    li.classList.add("completed");
  }
  li.textContent = task.text;

  // Toggle completed on click
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    // Update tasks array
    const index = tasks.findIndex(t => t.text === task.text);
    if (index > -1) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    }
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.title = "Delete task";

  deleteBtn.addEventListener("click", e => {
    e.stopPropagation();
    taskList.removeChild(li);
    // Remove from tasks array
    const index = tasks.findIndex(t => t.text === task.text);
    if (index > -1) {
      tasks.splice(index, 1);
      saveTasks();
    }
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save current tasks array to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

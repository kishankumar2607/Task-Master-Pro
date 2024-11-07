// Task Manager
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const noTasksMessage = document.getElementById("no-tasks-message");

// Modal elements
const editTaskModal = document.getElementById("edit-task-modal");
const closeModalButton = document.getElementById("close-modal");
const editTaskForm = document.getElementById("edit-task-form");

let tasks = [];

// Display tasks in the task list
// Function to load tasks and display them on the page
function loadTasks() {
    const taskListSection = $("#task-list");
    taskListSection.empty(); // Clear any existing content in task list

    // Get tasks from localStorage and parse it into an array
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Loop through tasks array and create HTML rows for each task
    tasks.forEach((task, index) => {
        const priorityClass = getPriorityClass(task.priority);

        // Create HTML for task row with a delete button
        const taskRow = `
            <div class="task-row ${priorityClass}">
                <div class="task-field">${task.name}</div>
                <div class="task-field">${task.assigned}</div>
                <div class="task-field">${task.due}</div>
                <div class="task-field">${task.priority}</div>
                <div class="task-field">${task.description}</div>
                <button onclick="editTask(${index})">Edit</button>
                &nbsp;&nbsp;&nbsp;
                <button class="delete-btn" onclick="deleteTask(${index})">×</button>
            </div>
        `;

        // Append the created row to the task list section
        taskListSection.append(taskRow);
    });
}

// Function to get priority class based on priority value
function getPriorityClass(priority) {
    switch (priority.toLowerCase()) {
        case "high":
            return "priority-high";
        case "medium":
            return "priority-medium";
        default:
            return "priority-low";
    }
}

// Edit a task
function editTask(index) {
    const task = tasks[index];
    document.getElementById("edit-task-name").value = task.name;
    document.getElementById("edit-task-assigned").value = task.assigned;
    document.getElementById("edit-task-due").value = task.due;
    document.getElementById("edit-task-priority").value = task.priority;
    document.getElementById("edit-task-description").value = task.description;

    // Show the modal
    editTaskModal.style.display = "block";

    // Handle form submission to update the task
    editTaskForm.onsubmit = function (e) {
        e.preventDefault();
        // Update the task
        tasks[index] = {
            name: document.getElementById("edit-task-name").value,
            assigned: document.getElementById("edit-task-assigned").value,
            due: document.getElementById("edit-task-due").value,
            priority: document.getElementById("edit-task-priority").value,
            description: document.getElementById("edit-task-description").value,
        };
        localStorage.setItem("tasks", JSON.stringify(tasks));
        window.location.href = "index.html";
    };
}

// Close the modal
function closeModal() {
    editTaskModal.style.display = "none ";
}

// Add event listener to close the modal when the close button is clicked
closeModalButton.addEventListener("click", closeModal);

// Add event listener to close the modal when the user clicks outside the modal
window.addEventListener("click", function (event) {
    if (event.target === editTaskModal) {
        closeModal();
    }
});

// Delete a task
// Function to delete a task based on its index in the array
function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.splice(index, 1); // Remove the task from the array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage
        loadTasks(); // Reload tasks to reflect the changes
    }
}

// Load tasks on page load
window.onload = loadTasks;

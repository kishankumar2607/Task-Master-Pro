// Task Manager
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const noTasksMessage = document.getElementById('no-tasks-message');

// Modal elements
const editTaskModal = document.getElementById('edit-task-modal');
const closeModalButton = document.getElementById('close-modal');
const editTaskForm = document.getElementById('edit-task-form');

let tasks = [];

// Load tasks from localStorage





// Display tasks in the task list





// Add a new task




// Edit a task
function editTask(index) {
    const task = tasks[index];
    document.getElementById('edit-task-name').value = task.name;
    document.getElementById('edit-task-assigned').value = task.assigned;
    document.getElementById('edit-task-due').value = task.due;
    document.getElementById('edit-task-priority').value = task.priority;
    document.getElementById('edit-task-description').value = task.description;

    // Show the modal
    editTaskModal.style.display = 'block';

    // Handle form submission to update the task
    editTaskForm.onsubmit = function (e) {
        e.preventDefault();
        // Update the task
        tasks[index] = {
            name: document.getElementById('edit-task-name').value,
            assigned: document.getElementById('edit-task-assigned').value,
            due: document.getElementById('edit-task-due').value,
            priority: document.getElementById('edit-task-priority').value,
            description: document.getElementById('edit-task-description').value,
        };
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks(tasks);
        closeModal();
    };
}

// Close the modal
function closeModal() {
    editTaskModal.style.display = 'none ';
}

// Add event listener to close the modal when the close button is clicked
closeModalButton.addEventListener('click', closeModal);

// Add event listener to close the modal when the user clicks outside the modal
window.addEventListener('click', function (event) {
    if (event.target === editTaskModal) {
        closeModal();
    }
});



// Delete a task




// Search tasks




// Load tasks on page load
window.onload = loadTasks;
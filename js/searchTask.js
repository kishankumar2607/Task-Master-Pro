// Get references to search input and search results container
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to display filtered tasks based on search query
function displayTasks(filteredTasks) {
    searchResults.innerHTML = ''; // Clear previous results

    if (filteredTasks.length === 0) {
        searchResults.innerHTML = '<p>No matching tasks found.</p>';
        return;
    }

    // Loop through the filtered tasks and display them
    filteredTasks.forEach(task => {
        const priorityClass = getPriorityClass(task.priority);

        // Create HTML structure for each task
        const taskHtml = `
            <div class="task-row ${priorityClass}">
                <div class="task-field">${task.name}</div>
                <div class="task-field">${task.assigned}</div>
                <div class="task-field">${task.due}</div>
                <div class="task-field">${task.priority}</div>
                <div class="task-field">${task.description}</div>
            </div>
        `;
        
        // Append task HTML to search results
        searchResults.innerHTML += taskHtml;
    });
}

// Function to filter tasks based on search query
function filterTasks(query) {
    const searchQuery = query.toLowerCase();

    // Filter tasks to only those that contain the search query in any field
    const filteredTasks = tasks.filter(task =>
        task.name.toLowerCase().includes(searchQuery) ||
        task.assigned.toLowerCase().includes(searchQuery) ||
        task.due.toLowerCase().includes(searchQuery) ||
        task.priority.toLowerCase().includes(searchQuery) ||
        task.description.toLowerCase().includes(searchQuery)
    );

    displayTasks(filteredTasks);
}

// Event listener for search input
searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    filterTasks(query);
});

// Display all tasks on page load
displayTasks(tasks);

// Helper function to get priority class based on priority value
function getPriorityClass(priority) {
    switch (priority.toLowerCase()) {
        case 'high':
            return 'priority-high';
        case 'medium':
            return 'priority-medium';
        default:
            return 'priority-low';
    }
}

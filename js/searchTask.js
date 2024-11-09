//Get search input and results container references.
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Show tasks that match the search query.
function displayTasks(filteredTasks) {
    searchResults.innerHTML = ""; // Clear previous results

    if (filteredTasks.length === 0) {
        searchResults.innerHTML = "<p>No matching tasks found.</p>";
        return;
    }

    // Show the filtered tasks one by one.
    filteredTasks.forEach((task) => {
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

    // Show only tasks that match the search query.
    const filteredTasks = tasks.filter(
        (task) =>
            task.name.toLowerCase().includes(searchQuery) ||
            task.assigned.toLowerCase().includes(searchQuery) ||
            task.due.toLowerCase().includes(searchQuery) ||
            task.priority.toLowerCase().includes(searchQuery) ||
            task.description.toLowerCase().includes(searchQuery)
    );

    displayTasks(filteredTasks);
}

// Event listener for search input
searchInput.addEventListener("input", () => {
    const query = searchInput.value;
    filterTasks(query);
});

// Display all tasks on page load
displayTasks(tasks);

// Function to get priority class from priority value
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

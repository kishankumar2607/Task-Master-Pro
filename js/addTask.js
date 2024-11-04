
$(document).ready(function() {
    $("#submit").click((evt) => {
        evt.preventDefault()

        const name = $("#task-name").val().trim()
        const assigned = $("#task-assigned").val().trim()
        const due = $("#task-due").val().trim()
        const priority = $("#task-priority").val().trim()
        const description = $("#task-description").val().trim()

        if (!name) {
            alert("Please enter a task name")
            return
        }

        if (!assigned) {
            alert("Please enter the name of the task assignee")
            return
        }

        const newTask = {
            name,
            assigned,
            due,
            priority,
            description,
        }
        
        let tasks = []
        if (localStorage.tasks) {
            tasks = JSON.parse(localStorage.tasks)
        }
        tasks.push(newTask)
        localStorage.tasks = JSON.stringify(tasks)

        window.location.href = "index.html"
    })
})

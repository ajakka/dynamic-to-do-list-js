document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        if (!taskText) return; // Return if taskText is empty

        // Create a new task list item (li)
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item'); // Adding a class to the li element

        // Create a remove button for the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // Using classList.add for adding class

        // Add event listener to remove the task
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText); // Remove from Local Storage
        };

        // Append the button to the list item, and the item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Update Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Clear the input field
        taskInput.value = '';
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Add click event to "Add Task" button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText); // Pass trimmed taskText to addTask
    });

    // Add keypress event to allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText); // Pass trimmed taskText to addTask
        }
    });
});

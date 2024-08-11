//taskService.js

const fs = require('fs');

// Path to the JSON file where tasks will be stored
const filePath = './src/data/tasks.json';

// Function to load tasks from the JSON file
function loadTasks() {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        // If there's an error reading the file, return an empty array
        return [];
    }
}

// Function to save tasks to the JSON file
function saveTasks(tasks) {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 4));
}

// Function to format the date as 'dd/MM/yyyy'
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

module.exports = {

    // Retrieve all tasks
    getAllTasks() {
        return loadTasks();
    },

    // Retrieve a task by its ID
    getTaskById(id) {
        const tasks = loadTasks();
        return tasks.find(task => task.id === id);
    },

    // Add a new task
    addTask(task) {
        const tasks = loadTasks();
        task.id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1; 
        tasks.push(task);
        saveTasks(tasks);
        return task;
    },

    // Update an existing task
    updateTask(id, updatedTask) {
        const tasks = loadTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return null;
        }
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        saveTasks(tasks);
        return tasks[taskIndex];
    },

    // Delete a task by its ID
    deleteTask(id) {
        const tasks = loadTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) {
            return null;
        }
        const deletedTask = tasks.splice(taskIndex, 1);
        saveTasks(tasks);
        return deletedTask;
    }
    
};

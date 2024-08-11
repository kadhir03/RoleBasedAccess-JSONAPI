//taskController.js

const Task = require('./taskService');
const User = require('../users/userService');

module.exports = {
   getAllTasks(req, res) {
       try {
           const tasks = Task.getAllTasks();
           tasks.forEach(task => {
               if (task.dueDate) {
                   const date = new Date(task.dueDate);
                   task.dueDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
               }
           });
           res.status(200).json(tasks);
       } catch (error) {
           res.status(500).json({ message: 'Error retrieving tasks', error: error.message });
       }
   },
   
   getTaskById(req, res) {
       try {
           const id = parseInt(req.params.id);
           if (isNaN(id)) {
               return res.status(400).json({ message: 'Invalid task ID' });
           }
           const task = Task.getTaskById(id);
           if (!task) {
               return res.status(404).json({ message: 'Task not found' });
           }
           if (task.dueDate) {
               const date = new Date(task.dueDate);
               task.dueDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
           }
           res.status(200).json(task);
       } catch (error) {
           res.status(500).json({ message: 'Error retrieving task', error: error.message });
       }
   },
   
   addTask(req, res) {
       try {
           const { title, description, dueDate, status, assignedTo, state } = req.body;
           if (!title || typeof status !== 'boolean' || !['pendiente', 'en proceso', 'finalizada'].includes(state)) {
               return res.status(400).json({ message: 'Invalid task data' });
           }

        
           if (assignedTo && !User.getUserById(assignedTo)) {
               return res.status(404).json({ message: 'Assigned user not found' });
           }

          
           const [day, month, year] = dueDate.split('/').map(Number);
           const formattedDueDate = new Date(year, month - 1, day);
           if (isNaN(formattedDueDate)) {
               return res.status(400).json({ message: 'Invalid due date' });
           }

           const newTask = {
               title,
               description,
               dueDate: formattedDueDate,
               status,
               createdBy: req.userId, 
               assignedTo,
               state
           };

           const task = Task.addTask(newTask);
           task.dueDate = dueDate; 
           res.status(201).json(task);
       } catch (error) {
           res.status(500).json({ message: 'Error adding task', error: error.message });
       }
   },

   updateTask(req, res) {
       try {
           const id = parseInt(req.params.id);
           if (isNaN(id)) {
               return res.status(400).json({ message: 'Invalid task ID' });
           }
           const { title, description, dueDate, status, assignedTo, state } = req.body;
           if (!title || typeof status !== 'boolean' || !['pendiente', 'en proceso', 'finalizada'].includes(state)) {
               return res.status(400).json({ message: 'Invalid task data' });
           }

       
           if (assignedTo && !User.getUserById(assignedTo)) {
               return res.status(404).json({ message: 'Assigned user not found' });
           }

        
           const [day, month, year] = dueDate.split('/').map(Number);
           const formattedDueDate = new Date(year, month - 1, day);
           if (isNaN(formattedDueDate)) {
               return res.status(400).json({ message: 'Invalid due date' });
           }

           const updatedTask = {
               title,
               description,
               dueDate: formattedDueDate,
               status: state === 'finalizada' ? false : status, 
               assignedTo,
               state
           };
           const task = Task.updateTask(id, updatedTask);
           if (!task) {
               return res.status(404).json({ message: 'Task not found' });
           }
           task.dueDate = dueDate; 
           res.status(200).json(task);
       } catch (error) {
           res.status(500).json({ message: 'Error updating task', error: error.message });
       }
   },
   
   deleteTask(req, res) {
       try {
           const id = parseInt(req.params.id);
           if (isNaN(id)) {
               return res.status(400).json({ message: 'Invalid task ID' });
           }
           const task = Task.deleteTask(id);
           if (!task) {
               return res.status(404).json({ message: 'Task not found' });
           }
           res.status(200).json({ message: 'Task deleted successfully' });
       } catch (error) {
           res.status(500).json({ message: 'Error deleting task', error: error.message });
       }
   }
};

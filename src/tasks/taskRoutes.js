//taskRoutes.js

const express = require('express');
const router = express.Router();
const taskController = require('./taskController');
const { verifyToken } = require('../auth/authService');

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management and administration
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Task ID
 *         title:
 *           type: string
 *           description: Title of the task
 *         description:
 *           type: string
 *           description: Description of the task (optional)
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Due date of the task
 *         status:
 *           type: boolean
 *           description: Status of the task (completed/pending)
 *         assignedTo:
 *           type: integer
 *           description: ID of the user the task is assigned to
 *         state:
 *           type: string
 *           description: Current state of the task (e.g., 'pendiente', 'en progreso')
 *       required:
 *         - title
 *         - dueDate
 *         - status
 *         - assignedTo
 *         - state
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: 
 *       - Tasks
 *     responses:
 *       200:
 *         description: Returns all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/', verifyToken, taskController.getAllTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: 
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the task to get
 *         example: 1
 *     responses:
 *       200:
 *         description: Returns the specified task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.get('/:id', verifyToken, taskController.getTaskById);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Add a new task
 *     tags: 
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           examples:
 *             taskExample:
 *               summary: Example of a new task
 *               value:
 *                 title: "nww Tarea"
 *                 description: "Descripción opcional de la tarea"
 *                 dueDate: "08/08/2024"
 *                 status: true
 *                 assignedTo: 2
 *                 state: "pendiente"
 *     responses:
 *       201:
 *         description: New task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
router.post('/', verifyToken, taskController.addTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     summary: Update an existing task
 *     tags: 
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the task to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *           examples:
 *             updateTaskExample:
 *               summary: Example of an updated task
 *               value:
 *                 title: "Tarea actualizada"
 *                 description: "Nueva descripción opcional"
 *                 dueDate: "09/09/2024"
 *                 status: false
 *                 assignedTo: 3
 *                 state: "en progreso"
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 */
router.patch('/:id', verifyToken, taskController.updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: 
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the task to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete('/:id', verifyToken, taskController.deleteTask);

module.exports = router;

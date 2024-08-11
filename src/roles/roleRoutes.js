//roleRoutes.js

const express = require('express');
const router = express.Router();
const roleController = require('./roleController');
const { verifyToken } = require('../auth/authService');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management and administration
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Role ID
 *         name:
 *           type: string
 *           description: Name of the role
 *         status:
 *           type: boolean
 *           description: Status of the role (active/inactive)
 *       required:
 *         - name
 *         - status
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: 
 *       - Roles
 *     responses:
 *       200:
 *         description: Returns all roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.get('/', verifyToken, roleController.getAllRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get a role by ID
 *     tags: 
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the role to get
 *         example: 1
 *     responses:
 *       200:
 *         description: Returns the specified role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 */
router.get('/:id', verifyToken, roleController.getRoleById);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Add a new role
 *     tags: 
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *           examples:
 *             roleExample:
 *               summary: Example of a new role
 *               value:
 *                 name: "newrole"
 *                 status: true
 *     responses:
 *       201:
 *         description: New role created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 */
router.post('/', roleController.addRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   patch:
 *     summary: Update an existing role
 *     tags: 
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the role to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *           examples:
 *             updateRoleExample:
 *               summary: Example of an updated role
 *               value:
 *                 name: "updatedrole"
 *                 status: false
 *     responses:
 *       200:
 *         description: Role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Role not found
 */
router.patch('/:id', verifyToken, roleController.updateRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete a role
 *     tags: 
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the role to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       404:
 *         description: Role not found
 */
router.delete('/:id', verifyToken, roleController.deleteRole);

module.exports = router;

//userController.js

const User = require('./userService');
const Role = require('../roles/roleService');

module.exports = {
    
    getAllUsers(req, res) {
        try {
            const users = User.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error: error.message });
        }
    },

    getUserById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            const user = User.getUserById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error: error.message });
        }
    },

    addUser(req, res) {
        try {
            const { username, password, roleId } = req.body;
            if (!username || !password || !roleId) {
                return res.status(400).json({ message: 'Invalid user data' });
            }
            //Check if the username already exists
            const existingUser = User.getAllUsers().find(user => user.username === username);
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            // Check if the roleId is valid
            const role = Role.getRoleById(roleId);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            const newUser = { username, password, roleId };
            const user = User.addUser(newUser);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error adding user', error: error.message });
        }
    },

    updateUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            const { username, password, roleId } = req.body;
            if (!username || !password || !roleId) {
                return res.status(400).json({ message: 'Invalid user data' });
            }
            //Check if the username already exists and is not the one of the user being updated
            const existingUser = User.getAllUsers().find(user => user.username === username && user.id !== id);
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            // Check if the roleId is valid
            const role = Role.getRoleById(roleId);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            const updatedUser = { username, password, roleId };
            const user = User.updateUser(id, updatedUser);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error: error.message });
        }
    },

    deleteUser(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid user ID' });
            }
            const user = User.deleteUser(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error: error.message });
        }
    }
};

//roleController.js

const Role = require('./roleService');

module.exports = {
    
    getAllRoles(req, res) {
        try {
            const roles = Role.getAllRoles();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving roles', error: error.message });
        }
    },

    getRoleById(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid role ID' });
            }
            const role = Role.getRoleById(id);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving role', error: error.message });
        }
    },

    addRole(req, res) {
        try {
            const { name, status } = req.body;
            if (!name || typeof status !== 'boolean') {
                return res.status(400).json({ message: 'Invalid role data' });
            }
            //Check if the role name already exists
            const existingRole = Role.getAllRoles().find(role => role.name === name);
            if (existingRole) {
                return res.status(400).json({ message: 'Role name already exists' });
            }

            const newRole = { name, status };
            const role = Role.addRole(newRole);
            res.status(201).json(role);
        } catch (error) {
            res.status(500).json({ message: 'Error adding role', error: error.message });
        }
    },

    updateRole(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid role ID' });
            }
            const { name, status } = req.body;
            if (!name || typeof status !== 'boolean') {
                return res.status(400).json({ message: 'Invalid role data' });
            }

            //Check if the role name already exists and is not the name of the role being updated
            const existingRole = Role.getAllRoles().find(role => role.name === name && role.id !== id);
            if (existingRole) {
                return res.status(400).json({ message: 'Role name already exists' });
            }

            const updatedRole = { name, status };
            const role = Role.updateRole(id, updatedRole);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json(role);
        } catch (error) {
            res.status(500).json({ message: 'Error updating role', error: error.message });
        }
    },

    deleteRole(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'Invalid role ID' });
            }
            const role = Role.deleteRole(id);
            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            }
            res.status(200).json({ message: 'Role deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting role', error: error.message });
        }
    }
};

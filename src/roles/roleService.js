//roleService.js

const fs = require('fs');

// Path to the JSON file where roles will be stored
const filePath = './src/data/roles.json';

// Function to load roles from the JSON file
function loadRoles() {
    try {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    } catch (error) {
        // If there's an error reading the file, return an empty array
        return [];
    }
}

// Function to save roles to the JSON file
function saveRoles(roles) {
    fs.writeFileSync(filePath, JSON.stringify(roles, null, 4));
}

module.exports = {

    // Retrieve all roles
    getAllRoles() {
        return loadRoles();
    },

    // Retrieve a role by its ID
    getRoleById(id) {
        const roles = loadRoles();
        return roles.find(role => role.id === id);
    },

    // Add a new role
    addRole(role) {
        const roles = loadRoles();
        role.id = roles.length > 0 ? roles[roles.length - 1].id + 1 : 1; 
        roles.push(role);
        saveRoles(roles);
        return role;
    },

    // Update an existing role
    updateRole(id, updatedRole) {
        const roles = loadRoles();
        const roleIndex = roles.findIndex(role => role.id === id);
        if (roleIndex === -1) {
            return null;
        }
        roles[roleIndex] = { ...roles[roleIndex], ...updatedRole };
        saveRoles(roles);
        return roles[roleIndex];
    },

    // Delete a role by its ID
    deleteRole(id) {
        const roles = loadRoles();
        const roleIndex = roles.findIndex(role => role.id === id);
        if (roleIndex === -1) {
            return null;
        }
        const deletedRole = roles.splice(roleIndex, 1);
        saveRoles(roles);
        return deletedRole;
    }

};

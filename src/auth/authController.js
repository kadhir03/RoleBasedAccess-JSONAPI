//authController.js

const bcrypt = require('bcryptjs');

const { generateToken } = require('./authService');

const User = require('../users/userService');
const Role = require('../roles/roleService');

const register = (req, res) => {
    const { username, password, roleId } = req.body;
    if (!username || !password || !roleId) {
        return res.status(400).send({ message: 'Username, password, and role ID are required.' });
    }
    const role = Role.getRoleById(roleId);
    if (!role) {
        return res.status(404).send({ message: 'Role not found.' });
    }
    const newUser = { username, password, roleId };
    const user = User.addUser(newUser);
    const token = generateToken(user);
    res.status(201).send({ auth: true, token });
};

const login = (req, res) => {
    const { username, password } = req.body;
    const user = User.getAllUsers().find(u => u.username === username);
    if (!user) {
        return res.status(404).send({ message: 'User not found.' });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
    }
    const token = generateToken(user);
    res.status(200).send({ auth: true, token });
};

module.exports = { register, login };

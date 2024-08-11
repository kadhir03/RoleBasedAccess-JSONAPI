//authService.js

// Load environment variables
require('dotenv').config();

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Generates a JWT token with user details and a 1-hour expiration
function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username, roleId: user.roleId }, SECRET_KEY, { expiresIn: '1h' });
}

// Middleware to verify the JWT token from the Authorization header
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided.' });
    }
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(403).send({ message: 'Invalid token format.' });
    }
    jwt.verify(tokenParts[1], SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        req.user = { id: decoded.id, username: decoded.username, roleId: decoded.roleId };
        next();
    });
}

module.exports = { generateToken, verifyToken };
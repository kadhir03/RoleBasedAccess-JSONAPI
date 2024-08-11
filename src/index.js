// index.js

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();  // Load environment variables

const taskRoutes = require('../src/tasks/taskRoutes');
const userRoutes = require('../src/users/userRoutes');
const roleRoutes = require('../src/roles/roleRoutes');
const authRoutes = require('../src/auth/authRoutes');
const { swaggerUi, swaggerSpec } = require('../src/swaggerConfig'); // Import Swagger configuration

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Auth Routes
app.use('/api/auth', authRoutes);

// Task Routes
app.use('/api/tasks', taskRoutes);

// User Routes
app.use('/api/users', userRoutes);

// Role Routes
app.use('/api/roles', roleRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

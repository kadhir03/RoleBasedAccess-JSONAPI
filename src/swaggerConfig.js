// swaggerConfig.js

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
   openapi: '3.0.0',
   info: {
       title: 'My API',
       version: '1.0.0',
       description: 'This API provides CRUD operations for managing users, roles, and tasks within a role-based authorization system.',
   },
   servers: [{
       url: 'http://localhost:3000', // Replace with your server URL
       description: 'Development server',
   }],
   components: {
       securitySchemes: {
           bearerAuth: {
               type: 'http',
               scheme: 'bearer',
               bearerFormat: 'JWT', 
           },
       },
   },
   security: [{
       bearerAuth: [] 
   }],
};

// Options for the swagger-jsdoc
const options = {
   swaggerDefinition,
   // Paths to files containing OpenAPI definitions
   apis: ['./src/users/*.js','./src/roles/*.js','./src/auth/*.js','./src/tasks/*.js'], // Path to the API routes folder
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };

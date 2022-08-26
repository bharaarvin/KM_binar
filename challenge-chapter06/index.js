const express = require('express');
const dotenv = require('dotenv');
const formidable = require('express-formidable');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const PORT = 8989;

// Load env variable
dotenv.config();

// Load swagger json
swaggerDocument = require('./swagger.json');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Car Management API',
            version: '1.0.0',
        },
    },
    // List of files to be processes. You can also set globs './routes/*.js'
    apis: ['./routes/routes.js'],
};

const specs = swaggerJsdoc(options);

app.use(formidable());
app.use(require('./routes/routes.js'));

// SWAGGER API DOCS
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs)
);


app.listen(PORT, () => {
    console.info(`Server running at locahost:${PORT}`);
});
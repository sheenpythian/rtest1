const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const openapiPath = path.join(__dirname, '../openapi.yaml');
const openapiDocument = YAML.load(openapiPath);

module.exports = { swaggerUi, openapiDocument };

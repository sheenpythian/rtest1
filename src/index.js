import express from 'express';
import bodyParser from 'body-parser';
import blogRoutes from './routes/blogRoutes.js';
import sequelize from './models/db.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';

const app = express();
app.use(bodyParser.json());

// Serve OpenAPI documentation
const openapiSpec = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiSpec));

app.use('/api', blogRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Blog API running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
  });
});

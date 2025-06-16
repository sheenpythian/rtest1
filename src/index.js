const express = require('express');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/apiRoutes');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yaml');

const app = express();
app.use(bodyParser.json());
app.use('/api/blogs', blogRoutes);

const openapiPath = path.join(__dirname, '../openapi.yaml');
const openapiDocument = YAML.parse(fs.readFileSync(openapiPath, 'utf8'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

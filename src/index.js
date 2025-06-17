const express = require('express');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/apiRoutes');
const { sequelize } = require('./models/apiModel');
const { swaggerUi, openapiDocument } = require('./swagger');

const app = express();
app.use(bodyParser.json());

app.use('/api/blogs', blogRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Ensures the table exists
    console.log('Database connected and synced.');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

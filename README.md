# Blog API

A Node.js RESTful API for managing blog posts, using Express, Sequelize ORM, PostgreSQL, and Liquibase for migrations. Includes OpenAPI documentation and Docker support.

## Application Structure

- `src/` - Main application source code
  - `index.js` - Entry point, Express app setup
  - `controllers/` - Route handler logic
  - `models/` - Sequelize models and DB connection
  - `routes/` - Express route definitions
- `tests/` - Jest/Supertest unit tests
- `liquibase/` - Liquibase changelog and migration files
- `openapi.yaml` - OpenAPI 3.0 spec for API documentation
- `Dockerfile` - Docker build instructions for the API
- `docker-compose.yml` - Compose file for running API and DB
- `docker-compose.test.yml` - Compose file for running unit tests in containers

## Folder Structure

```
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── tests/
├── liquibase/
│   └── changelog.xml
├── openapi.yaml
├── Dockerfile
├── docker-compose.yml
├── docker-compose.test.yml
├── package.json
```

## Technologies Used

- **Node.js** & **Express**: REST API server
- **Sequelize**: ORM for PostgreSQL
- **PostgreSQL**: Database
- **Liquibase**: Database migrations and seed data
- **Jest** & **Supertest**: Unit testing
- **Swagger UI**: API documentation (`/docs` endpoint)
- **Docker** & **Docker Compose**: Containerization and orchestration

## Common Commands

### Local Development

- Install dependencies:
  ```bash
  npm install
  ```
- Run the API locally:
  ```bash
  npm start
  ```
- Run unit tests locally:
  ```bash
  npm test
  ```

### Using Docker Compose

- **Run the API and database:**
  ```bash
  docker-compose up --build
  ```
  - API: http://localhost:3000
  - Swagger docs: http://localhost:3000/docs
  - PostgreSQL: localhost:5432 (user: postgres, password: password, db: blogdb)

- **Run unit tests in containers:**
  ```bash
  docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
  ```
  - Uses a separate test database (`blogdb_test`).

## API Documentation

- OpenAPI spec: [`openapi.yaml`](openapi.yaml)
- Swagger UI: [http://localhost:3000/docs](http://localhost:3000/docs)

## Database Migrations & Seed Data

- Managed by Liquibase (`liquibase/changelog.xml`).
- Automatically applied on container startup.

---

Feel free to customize this project for your needs!

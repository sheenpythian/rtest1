# Blog API Application

A simple Node.js REST API for managing blog posts, using Express, Sequelize ORM, PostgreSQL, and Liquibase for migrations. Includes Docker support for development, production, and unit testing.

## Application Structure

- **src/**: Application source code
  - **controllers/**: Route handler logic
  - **models/**: Sequelize models and database logic
  - **routes/**: Express route definitions
  - **index.js**: Main entry point
- **liquibase/**: Database migration and seed changelogs
- **tests/**: Jest unit tests
- **Dockerfile**: Container build instructions
- **docker-compose.yml**: Multi-container orchestration (API + DB + Liquibase)
- **docker-compose.test.yml**: Orchestration for running unit tests in containers
- **package.json**: Project metadata and dependencies

## Folder Structure

```
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── index.js
├── liquibase/
│   └── changelog.xml
├── tests/
│   └── blogApi.test.js
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
- **Docker** & **Docker Compose**: Containerization and orchestration

## Common Commands

### Run the Application (API + DB + Liquibase)

```
docker-compose up --build
```
- Starts the API, PostgreSQL, and runs Liquibase migrations/seed data.
- API available at `http://localhost:3000/api/blogs`

### Run Unit Tests in Containers

```
docker-compose -f docker-compose.test.yml up --build
```
- Spins up a test database, runs migrations, and executes Jest unit tests.

### Run Unit Tests Locally

```
npm install
npm test
```

---

For more details, see the code and comments in each file. PRs and issues welcome!

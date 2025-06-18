# Blog API

A Node.js RESTful API for managing blog posts, using Express, Sequelize ORM, PostgreSQL, and Liquibase for migrations. The application is fully containerized with Docker and supports automated unit testing.

## Application Structure

- **src/**: Main application source code
  - **controllers/**: Route handler logic (business logic)
  - **models/**: Sequelize models and database connection
  - **routes/**: Express route definitions
  - **index.js**: Application entry point
- **db/changelog/**: Liquibase changelogs for database schema and seed data
- **tests/**: Jest/Supertest unit tests
- **Dockerfile**: Docker build instructions for the app
- **docker-compose.yml**: Multi-container setup for app and database
- **docker-compose.test.yml**: Multi-container setup for running unit tests
- **package.json**: Node.js dependencies and scripts

## Folder Structure

```
├── db/
│   └── changelog/
│       ├── 001-create-blogs-table.xml
│       ├── 002-seed-blogs-table.xml
│       └── db.changelog-master.xml
├── src/
│   ├── controllers/
│   │   └── blogController.js
│   ├── models/
│   │   ├── blogModel.js
│   │   └── db.js
│   ├── routes/
│   │   └── blogRoutes.js
│   └── index.js
├── tests/
│   └── blogApi.test.js
├── Dockerfile
├── docker-compose.yml
├── docker-compose.test.yml
├── package.json
└── README.md
```

## Technologies Used

- **Node.js** & **Express**: REST API server
- **Sequelize**: ORM for PostgreSQL
- **PostgreSQL**: Database
- **Liquibase**: Database migrations and seed data
- **Jest** & **Supertest**: Unit testing
- **Docker** & **Docker Compose**: Containerization and orchestration

## Common Commands

### Run the Application (with Docker Compose)

```
docker-compose up --build
```
- Starts the API and PostgreSQL database, runs migrations and seeds data.
- Access the API at `http://localhost:3000/api/blogs`

### Run Unit Tests (with Docker Compose)

```
docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
```
- Runs the test database, applies migrations/seeds, and executes Jest unit tests.

### Run Locally (without Docker)

1. Install dependencies:
   ```
   npm install
   ```
2. Start PostgreSQL and ensure your `.env` or environment variables are set.
3. Run migrations with Liquibase (see `db/changelog/` for changelogs).
4. Start the app:
   ```
   npm start
   ```
5. Run tests:
   ```
   npm test
   ```

---

For more details, see the code and changelogs in each folder. PRs and issues welcome!

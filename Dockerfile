# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables for Sequelize/Postgres (override as needed)
ENV PGUSER=postgres \
    PGPASSWORD=password \
    PGHOST=host.docker.internal \
    PGDATABASE=blogdb \
    PGPORT=5432

# Start the application
CMD ["npm", "start"]

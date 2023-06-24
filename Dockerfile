# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies for the root directory
RUN npm install

# Copy all source code to the working directory
COPY . .

# Install dependencies for the client directory
WORKDIR /app/client
RUN npm install

# Install dependencies for the utils directory
WORKDIR /app/server/controllers/utils
RUN npm install

# Expose the port on which the server will run
EXPOSE 5000

# Define the command to run the server
CMD ["npx", "nodemon", "/app/server/server.js"]
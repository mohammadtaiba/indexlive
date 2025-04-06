# Use the official Node.js LTS image as the base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install additional dependencies
RUN npm install react-redux @reduxjs/toolkit react-router-dom @mui/material @emotion/react @emotion/styled @mui/x-data-grid
RUN npm install --save-dev @types/react-dom eslint eslint-config-react-app @types/node
RUN npm install recharts
RUN npm install @apollo/client graphql
RUN npm install
RUN npm install vite

# Copy the rest of the application code
COPY . .

# Expose the development server port
EXPOSE 10084

# Start the development server
CMD ["npm", "run", "dev"]

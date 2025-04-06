# Use the official Node.js LTS image as the base
FROM node:18

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install express body-parser cors dotenv helmet morgan mongoose mongoose-currency
RUN npm install --save-dev nodemon
RUN npm install swagger-jsdoc swagger-ui-express
RUN npm install apollo-server-express graphql
RUN npm install express

# Copy the rest of the application code
COPY . .

# Open port 10081 for the server
EXPOSE 10081

# Start the server
CMD ["npm", "run", "dev"]

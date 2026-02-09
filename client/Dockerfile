# Use Node.js 20 Alpine as base image (lightweight)
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build the React app for production
RUN npm run build

# Install a simple web server to serve the built files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the web server to serve the built React app
CMD ["serve", "-s", "dist", "-l", "3000"]

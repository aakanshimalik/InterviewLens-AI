# Use official Node.js image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy remaining project files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node","src/server.js"]
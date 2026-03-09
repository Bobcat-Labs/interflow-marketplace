FROM node:20-slim

WORKDIR /app

# Install system dependencies for node-canvas/sharp (common in Medusa)
RUN apt-get update && apt-get install -y python3 make g++

# Copy package files
COPY package.json yarn.lock* package-lock.json* ./

# Install all dependencies (including devDeps for TypeScript)
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the Medusa port
EXPOSE 9000

# The command to run the app (including the migration)
CMD ["sh", "-c", "npx medusa db:migrate && npx tsx ./node_modules/@medusajs/medusa/bin/medusa.js start"]

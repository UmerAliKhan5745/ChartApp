# Step 1: Build the frontend
FROM node:20 as frontend-build
WORKDIR /usr/src/frontend

# Install frontend dependencies and build
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/ ./
RUN npm run build

# Step 2: Set up the backend
FROM node:20 as backend-build
WORKDIR /usr/src/backend

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install --legacy-peer-deps

# Copy backend code
COPY backend/ ./

# Copy the frontend build to the appropriate directory
COPY --from=frontend-build /usr/src/frontend/build ./frontend/build

# Expose backend port
EXPOSE 5000

# Start the backend in production mode
CMD ["bash", "-c", "NODE_ENV=production npm start"]

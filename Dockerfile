# Build the frontend
FROM node:20 as frontend-build
WORKDIR /usr/src/frontend

# Copy frontend dependencies and install
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend code and build it
COPY frontend/ ./
RUN npm run build

# Build the backend
FROM node:20 as backend-build
WORKDIR /usr/src/backend

# Copy backend dependencies and install
COPY backend/package*.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the backend code
COPY backend/ ./

# Copy the frontend build to the backend (to serve static files)
COPY --from=frontend-build /usr/src/frontend/build ./public

# Expose the backend port
EXPOSE 5000

# Start the backend in production mode
CMD ["npm", "start"]

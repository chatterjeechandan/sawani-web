# Step 1: Build the React application
FROM node:14 AS build-step

# Set environment to production to avoid installing unnecessary development dependencies.
ENV NODE_ENV=production

WORKDIR /app

# First, copy the package.json and package-lock.json files.
# This step is done separately to utilize Docker caching.
# Only if these files change, npm install will run again.
COPY package*.json ./

# Use --only=production to install only production dependencies.
RUN npm ci --only=production

# Copy the rest of the application code.
COPY . .

# Build the React application.
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Step 2: Serve the React application from Nginx.
FROM nginx:alpine

# Copy only the built artifacts from the build stage.
COPY --from=build-step /app/build /usr/share/nginx/html

COPY nginx/default.conf  /etc/nginx/conf.d/default.conf
# Expose port 80 for Nginx.
EXPOSE 80

# Run Nginx.
CMD ["nginx", "-g", "daemon off;"]

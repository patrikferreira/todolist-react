# Base image for Node.js (to build the Vite project)
FROM node:22 as build

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code and build the Vite project
COPY . .
RUN npm run build

# Serve the static files using nginx
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 for nginx to serve the frontend
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

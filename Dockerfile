# Step 1: Build the React application
FROM node:20-alpine as build

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the React application using nginx
FROM nginx:1.25

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist /var/www/html/

# Expose port 80 for the application
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]

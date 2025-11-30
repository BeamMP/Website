# Step 1: Build stage
FROM node:22-alpine3.21 AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=development
RUN npm run build

# Step 2: Serve stage
FROM nginx:alpine

# Copy built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Add a custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

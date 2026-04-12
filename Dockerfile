# Step 1: Build stage
FROM node:lts-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Step 2: Serve stage
FROM nginx:stable

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy secure nginx configs
COPY nginx.main.conf /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Use non-root user for security
USER nginx

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

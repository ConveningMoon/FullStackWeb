# Use official Node.js image as base
FROM node:18-alpine

# Install curl for testing connectivity
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy frontend source code
COPY frontend/ ./

# Define environment variables for use at build time
ARG NEXT_PUBLIC_API_URL

# Build Next.js app with the environment variable
ENV NEXT_PUBLIC_ESLINT_NO_DEV_ERRORS=true
ENV DISABLE_ESLINT=true
RUN NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL npm run build --no-lint || NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL npm run build

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
# Base stage for both development and production
FROM node:20-alpine AS base
WORKDIR /app
# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Development stage
FROM base AS dev
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Expose port 3000 for Next.js development server
EXPOSE 3000
# Start development server
CMD ["npm", "run", "dev"]

# Builder stage for production
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Set environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
# Build the application
RUN npm run build

# Production stage
FROM base AS production
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose port 3000
EXPOSE 3000
# Start the application
CMD ["node", "server.js"]

# syntax=docker.io/docker/dockerfile:1
FROM node:18-alpine AS development

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy package.json and lock files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install dependencies based on the preferred package manager
RUN \
    if [ -f yarn.lock ]; then yarn; \
    elif [ -f package-lock.json ]; then npm install; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Copy the rest of the application
COPY . .

# This sets up the development environment
COPY .env.development .env.development

# Set development environment
ENV NODE_ENV=development
ENV PORT=3000

# Expose port
EXPOSE 3000

# We don't need to run build for development,
# as the development server will be started by docker-compose
CMD npm run db:migrate && npm run dev

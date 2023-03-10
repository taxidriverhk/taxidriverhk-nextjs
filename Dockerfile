FROM node:16 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder-and-runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# If using npm comment out above and use below instead
RUN npm run build

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
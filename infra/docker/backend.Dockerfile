FROM node:lts-bookworm-slim AS base

# Stage 1: Install ALL deps (including dev)
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Build
FROM deps AS build
WORKDIR /app
COPY . .
RUN node ace build --ignore-ts-errors

# Stage 3: Production
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/build ./
RUN npm install --omit=dev

EXPOSE 3333
CMD ["node", "bin/server.js"]
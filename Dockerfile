# Stage 1: install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json .
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN npm install -g pnpm
RUN pnpm install

# Stage 2: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm
RUN npm run build

# Stage 3: run
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json .
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 4173

CMD ["npm","run","serve"]
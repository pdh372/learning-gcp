# =======================
# Step 1: Build stage
# =======================
FROM node:22.1.0-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# =======================
# Step 2: Production stage
# =======================
FROM node:22.1.0-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app .

ENV PORT=8080
EXPOSE 8080

CMD ["pnpm", "start"]

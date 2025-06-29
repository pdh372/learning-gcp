# =====================
# Step 1: Build stage
# =====================
FROM node:22.1.0-alpine AS builder

# Cài pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy file lock + package
COPY pnpm-lock.yaml package.json ./

# Cài dependencies
RUN pnpm install --frozen-lockfile

# Copy toàn bộ source
COPY . .

# Build Next.js app
RUN pnpm build

# =====================
# Step 2: Production stage
# =====================
FROM node:22.1.0-alpine

WORKDIR /app

# Cài pnpm lại ở stage prod
RUN npm install -g pnpm

# Copy app từ builder stage
COPY --from=builder /app ./

ENV PORT=8080
EXPOSE 8080

# Start Next.js
CMD ["pnpm", "start"]

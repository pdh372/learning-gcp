FROM node:22.1.0-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/main"]
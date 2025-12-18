FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/api/package.json apps/api/
COPY apps/api/prisma apps/api/prisma/

RUN npm install --workspace=apps/api

COPY apps/api/src apps/api/src/
COPY apps/api/tsconfig.json apps/api/

WORKDIR /app/apps/api

RUN npx prisma generate

EXPOSE 3002

CMD ["npm", "run", "dev"]
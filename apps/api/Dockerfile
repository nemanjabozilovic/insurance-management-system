FROM node:20-alpine

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
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/web/package.json apps/web/

RUN npm install --workspace=apps/web

COPY apps/web/src apps/web/src/
COPY apps/web/index.html apps/web/
COPY apps/web/vite.config.ts apps/web/
COPY apps/web/tsconfig.json apps/web/
COPY apps/web/tsconfig.node.json apps/web/
COPY apps/web/tailwind.config.ts apps/web/
COPY apps/web/postcss.config.js apps/web/

WORKDIR /app/apps/web

EXPOSE 5174

CMD ["npm", "run", "dev", "--", "--host"]


# Insurance Management System

A monorepo application for managing users and insurance policies, built with Node.js, Express, Prisma, PostgreSQL, React, and TypeScript.

## Prerequisites

- Node.js 20.x or higher
- npm 9.x or higher
- Docker and Docker Compose

## Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/insurance_management
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=insurance_management
PORT=6318
NODE_ENV=development
VITE_API_URL=http://localhost:6318
```

3. Start the database and pgAdmin:

```bash
docker compose up -d db pgadmin
```

4. Generate Prisma client and run migrations (if running locally):

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Seed the database (if running locally):

```bash
npm run prisma:seed
```

**Note**: When running via Docker Compose (`docker compose up -d`), database migrations and seeding are automatically executed when the API container starts. You don't need to run them manually.

## Running the Application

### Development Mode

Start the API server:

```bash
npm run dev:api
```

The API will be available at `http://localhost:6318`
API documentation (Swagger) is available at `http://localhost:6318/api-docs`

Start the web application:

```bash
npm run dev:web
```

The web application will be available at `http://localhost:4886`

### Docker Compose

To run everything with Docker Compose:

```bash
docker compose up -d
```

**Automatic Setup**: When you run `docker compose up`, the following happens automatically:
- Database migrations are applied
- Database is seeded with initial data
- All services start in the correct order (database → API → Web)

## Features

- **User Management**: 
  - View all users in a table with profile images
  - Create new users with validation
  - Edit existing user information
  - View detailed user information with assigned policies
- **Policy Management**: 
  - Assign insurance policies to users using intuitive icons
  - Remove policies from users with confirmation dialogs
  - Visual indicators for assigned policies (disabled icons)
- **Policy Types**: Five insurance types (Car, Home, Life, Device, Travel) with distinct icons
- **Image Upload**: Upload and update user profile images (stored as base64 in database)
- **Data Validation**: Server-side validation using Zod schemas
- **Error Handling**: Complete error handling with proper HTTP status codes

## Useful Commands

- `npm run dev:api` - Start API development server
- `npm run dev:web` - Start web development server
- `npm run build:api` - Build API for production
- `npm run build:web` - Build web app for production
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database

## Access Points

- **Web Application**: http://localhost:4886
- **API Server**: http://localhost:6318
- **API Documentation**: http://localhost:6318/api-docs
- **pgAdmin**: http://localhost:5051 (admin@admin.com / admin)

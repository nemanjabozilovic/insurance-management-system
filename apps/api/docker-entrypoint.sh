#!/bin/sh
set -e

echo "Waiting for database to be ready..."
until pg_isready -h db -p 5432 -U postgres; do
  echo "Database is unavailable - sleeping"
  sleep 1
done
echo "Database is ready!"

echo "Generating Prisma Client..."
npx prisma generate

echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Seeding database..."
npx tsx prisma/seed.ts || echo "Seeding failed or already done, continuing..."

echo "Starting application..."
exec "$@"

#!/usr/bin/env bash
# Build and (re)deploy the Viralz production stack.
# Run from the repo root on the server: bash deploy/deploy.sh
set -euo pipefail

if [ ! -f .env.production ]; then
  echo "Missing .env.production - copy .env.production.example and fill in real values first."
  exit 1
fi

if [ ! -f secrets/postgres_password.txt ] || [ ! -f secrets/temporal_postgres_password.txt ]; then
  echo "Missing secrets/postgres_password.txt or secrets/temporal_postgres_password.txt"
  echo "(server-setup.sh generates these - run it first, or create them manually)"
  exit 1
fi

echo "== Syncing generated Postgres password into .env.production =="
PG_PASSWORD=$(cat secrets/postgres_password.txt)
if grep -q "REPLACE_WITH_POSTGRES_PASSWORD" .env.production; then
  sed -i "s#REPLACE_WITH_POSTGRES_PASSWORD#${PG_PASSWORD}#g" .env.production
fi

if grep -q "REPLACE_WITH_A_LONG_RANDOM_STRING" .env.production; then
  JWT_SECRET=$(openssl rand -hex 48)
  sed -i "s#REPLACE_WITH_A_LONG_RANDOM_STRING#${JWT_SECRET}#g" .env.production
  echo "Generated a random JWT_SECRET."
fi

export TEMPORAL_PG_PASSWORD
TEMPORAL_PG_PASSWORD=$(cat secrets/temporal_postgres_password.txt)

echo "== Building image from local source =="
docker compose -f docker-compose.production.yaml build viralz

# The app container pushes the Prisma schema on every start, so the backup has to
# happen before the new image is started, not after.
if docker ps --format '{{.Names}}' | grep -qx viralz-postgres; then
  echo "== Backing up database before deploying =="
  mkdir -p backups
  BACKUP_FILE="backups/viralz-db-$(date +%Y%m%d-%H%M%S).sql.gz"
  docker exec viralz-postgres pg_dump -U viralz-user -d viralz-db | gzip > "$BACKUP_FILE"
  echo "Saved $BACKUP_FILE"
else
  echo "== No running database yet (first deploy) - skipping backup =="
fi

echo "== Starting stack =="
docker compose -f docker-compose.production.yaml up -d

echo "== Waiting for Postgres to be healthy =="
until docker exec viralz-postgres pg_isready -U viralz-user -d viralz-db >/dev/null 2>&1; do
  sleep 2
done

# Without --accept-data-loss, Prisma refuses any schema change that would drop
# columns or tables instead of silently deleting customer data.
echo "== Pushing Prisma schema =="
if ! docker exec viralz sh -c 'cd /app && pnpm dlx prisma@6.5.0 db push --skip-generate --schema ./libraries/nestjs-libraries/src/database/prisma/schema.prisma'; then
  echo "!! Schema push was refused or failed. Nothing was deleted."
  echo "!! Read the Prisma message above. If it warns about data loss, plan a migration"
  echo "!! before deploying; the latest backup is in ./backups."
  exit 1
fi

echo "== Reloading Caddy (in case config changed) =="
systemctl reload caddy 2>/dev/null || systemctl restart caddy 2>/dev/null || true

echo "== Done. Check status with: docker compose -f docker-compose.production.yaml ps =="

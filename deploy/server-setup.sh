#!/usr/bin/env bash
# One-time bootstrap for a fresh Ubuntu 24.04 server that will host viralz.online.
# Run as root: bash server-setup.sh
set -euo pipefail

echo "== Updating system =="
apt-get update && apt-get upgrade -y

echo "== Installing Docker =="
if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

echo "== Installing Caddy =="
if ! command -v caddy >/dev/null 2>&1; then
  apt-get install -y debian-keyring debian-archive-keyring apt-transport-https curl
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
  apt-get update
  apt-get install -y caddy
fi

echo "== Configuring firewall (22, 80, 443 only) =="
apt-get install -y ufw
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "== Preparing app directory =="
mkdir -p /opt/viralz
cd /opt/viralz

if [ ! -d secrets ]; then
  mkdir -p secrets
  openssl rand -base64 32 > secrets/postgres_password.txt
  openssl rand -base64 32 > secrets/temporal_postgres_password.txt
  chmod 600 secrets/*.txt
  echo "Generated random Postgres passwords in /opt/viralz/secrets/"
fi

echo "== Installing Caddyfile =="
cp /opt/viralz/deploy/Caddyfile /etc/caddy/Caddyfile 2>/dev/null || echo "(copy deploy/Caddyfile to /etc/caddy/Caddyfile after cloning the repo)"
systemctl enable caddy 2>/dev/null || true

cat <<'EOF'

=== Next steps ===
1. Clone the Viralz repo into /opt/viralz (git clone <your-repo-url> /opt/viralz)
2. Copy .env.production.example to /opt/viralz/.env.production and fill in real values
   (JWT_SECRET, the generated Postgres password from secrets/postgres_password.txt,
    Cloudflare R2 keys, Resend key, Stripe keys, social platform OAuth credentials)
3. Copy deploy/Caddyfile to /etc/caddy/Caddyfile, then: systemctl restart caddy
4. Run deploy/deploy.sh to build and start the stack
EOF

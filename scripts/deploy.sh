#!/usr/bin/env bash
# deploy.sh — Build & deploy sii-f22 to Fly.io
# Usage: ./scripts/deploy.sh [--no-cache]

set -euo pipefail

APP="sii-f22"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT"

echo "==> Checking fly CLI..."
if ! command -v fly &>/dev/null; then
  echo "ERROR: fly CLI not found. Install from https://fly.io/docs/hands-on/install-flyctl/"
  exit 1
fi

echo "==> Checking auth..."
fly auth whoami

echo ""
echo "==> Deploying $APP..."
echo "    App:    $APP"
echo "    Region: gru (São Paulo)"
echo "    Commit: $(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')"
echo ""

# Pass --no-cache if requested
EXTRA_FLAGS=""
if [[ "${1:-}" == "--no-cache" ]]; then
  EXTRA_FLAGS="--no-cache"
  echo "    [no-cache build]"
fi

fly deploy \
  --app "$APP" \
  --config fly.toml \
  --dockerfile Dockerfile \
  $EXTRA_FLAGS

echo ""
echo "==> Deploy complete!"
echo "    URL: https://$APP.fly.dev"
echo ""

# Quick health check
echo "==> Health check..."
sleep 3
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$APP.fly.dev/health" || echo "000")
if [[ "$STATUS" == "200" ]]; then
  echo "    OK — /health returned 200"
else
  echo "    WARNING — /health returned $STATUS (app may still be starting)"
fi

#!/bin/bash
# Deploy P3R website to a remote server via SSH
# Usage: ./deploy.sh <host> <user> <password>
# Example: ./deploy.sh 192.168.1.100 root mypassword

set -e

HOST=${1:?Usage: ./deploy.sh <host> <user> <password>}
USER=${2:?Usage: ./deploy.sh <host> <user> <password>}
PASS=${3:?Usage: ./deploy.sh <host> <user> <password>}
REMOTE_DIR="/opt/p3r-website"

echo "=== Deploying P3R to $HOST ==="

# Helper to run remote commands
remote() {
    sshpass -p "$PASS" ssh -o StrictHostKeyChecking=no "$USER@$HOST" "$1"
}

# Check sshpass
if ! command -v sshpass &> /dev/null; then
    echo "Error: sshpass is required. Install it first:"
    echo "  apt install sshpass  # Debian/Ubuntu"
    echo "  brew install hudochenkov/sshpass/sshpass  # macOS"
    exit 1
fi

echo "[1/5] Syncing files..."
sshpass -p "$PASS" rsync -avz --delete \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='.claude' \
    --exclude='.env*' \
    --exclude='deploy*.py' \
    ./ "$USER@$HOST:$REMOTE_DIR/"

echo "[2/5] Installing Docker (if needed)..."
remote "command -v docker || (curl -fsSL https://get.docker.com | sh)"

echo "[3/5] Stopping existing container..."
remote "cd $REMOTE_DIR && docker compose down 2>/dev/null || true"

echo "[4/5] Building and starting..."
remote "cd $REMOTE_DIR && docker compose up -d --build"

echo "[5/5] Verifying..."
sleep 3
STATUS=$(remote "curl -s -o /dev/null -w '%{http_code}' http://localhost:3000")
if [ "$STATUS" = "200" ]; then
    echo ""
    echo "=== Deploy successful! ==="
    echo "Site is live at: http://$HOST:3000"
else
    echo ""
    echo "=== Deploy finished but site returned HTTP $STATUS ==="
    echo "Check logs: ssh $USER@$HOST 'cd $REMOTE_DIR && docker compose logs'"
fi

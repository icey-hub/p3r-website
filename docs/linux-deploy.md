# Linux deployment notes

This app stores posts in a JSON file database. Keep `DATA_DIR` on persistent disk and back it up.

## Environment

Copy `.env.example` to `.env.production` and set:

```bash
ADMIN_USERNAME=icey
ADMIN_PASSWORD_HASH=<sha256 hash>
SESSION_SECRET=<openssl rand -base64 32>
DATA_DIR=/var/lib/icey-blog
UPLOAD_DIR=/var/www/icey-blog/public/uploads
UPLOAD_PUBLIC_PATH=/uploads
```

Generate the password hash:

```bash
node -e "const crypto=require('crypto'); console.log(crypto.createHash('sha256').update('your-password').digest('hex'))"
```

Prepare the data directory:

```bash
sudo mkdir -p /var/lib/icey-blog
sudo chown -R $USER:$USER /var/lib/icey-blog
sudo mkdir -p /var/www/icey-blog/public/uploads
sudo chown -R $USER:$USER /var/www/icey-blog/public/uploads
```

## Build and run

```bash
npm ci
npm run build
npm run start
```

For a long-running server, put `npm run start` behind `pm2`, `systemd`, or Docker, then place nginx in front of it as a reverse proxy.

## Routes

- `/` public blog home
- `/posts/[slug]` public article detail
- `/admin/login` admin login
- `/admin` post editor
- `/api/posts` public JSON post list

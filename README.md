# P3R Website

icey's personal blog — a Next.js website with Docker deployment support.

## Tech Stack

- **Framework:** Next.js 16 (Turbopack)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Docker / Docker Compose

## Quick Start (Development)

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Docker Deployment

### Prerequisites

- Docker 20+
- Docker Compose v2

### One-Command Deploy

```bash
# Clone the repo
git clone https://github.com/icey-hub/p3r-website.git
cd p3r-website

# Build and start
docker compose up -d --build
```

The site will be available at http://your-server-ip:3000

### Common Commands

```bash
# View logs
docker compose logs -f

# Restart
docker compose restart

# Stop
docker compose down

# Rebuild from scratch
docker compose down
docker compose build --no-cache
docker compose up -d
```

### Remote Deploy Script

Deploy to any server with one command:

```bash
# Linux/macOS (requires sshpass)
chmod +x deploy.sh
./deploy.sh <server-ip> <username> <password>

# Example
./deploy.sh 192.168.1.100 root mypassword
```

### Change Port

Edit `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"  # Change 8080 to your desired port
```

Then restart: `docker compose up -d`

## Manual Deployment (Without Docker)

```bash
# Install dependencies
npm ci

# Build
npm run build

# Start production server
npm start
```

Use PM2 for process management:

```bash
npm install -g pm2
pm2 start npm --name "p3r" -- start
pm2 save
pm2 startup
```

## Project Structure

```
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Homepage
│   ├── blog/         # Blog pages
│   ├── admin/        # Admin panel
│   └── api/          # API routes
├── components/       # React components
├── lib/              # Utilities and data
├── public/           # Static assets
├── Dockerfile        # Multi-stage Docker build
├── docker-compose.yml
└── next.config.ts
```

## Environment Variables

Create `.env.local` for local development:

```env
# Add your environment variables here
```

## License

MIT

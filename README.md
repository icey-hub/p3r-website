# P3R Website

[中文](#中文) | [English](#english)

一个以《女神异闻录 3 Reload》为视觉灵感的个人网站与博客，基于 Next.js 构建，包含响应式首页、文章页面、管理后台和 Docker 部署支持。

A Persona 3 Reload-inspired personal website and blog built with Next.js, featuring a responsive homepage, post pages, an admin dashboard, and Docker deployment support.

## 中文

### 技术栈

- **框架：** Next.js 16、React 19
- **语言：** TypeScript
- **样式：** Tailwind CSS 4
- **界面与动效：** Base UI、shadcn、Lucide、GSAP
- **部署：** Docker、Docker Compose

### 本地开发

环境要求：Node.js 20+ 和 npm。

```bash
git clone https://github.com/icey-hub/p3r-website.git
cd p3r-website
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

### 环境变量

复制示例配置并按需修改：

```bash
cp .env.example .env.local
```

主要配置项：

| 变量 | 用途 |
| --- | --- |
| `ADMIN_USERNAME` | 管理后台用户名 |
| `ADMIN_PASSWORD` | 管理后台密码，适合本地开发 |
| `ADMIN_PASSWORD_HASH` | 生产环境优先使用的 SHA-256 密码哈希 |
| `SESSION_SECRET` | 管理员会话 Cookie 签名密钥 |
| `DATA_DIR` | 博客数据库持久化目录 |
| `UPLOAD_DIR` | 管理后台图片上传目录 |
| `UPLOAD_PUBLIC_PATH` | 上传文件对应的公开 URL 路径 |

管理后台位于 `/admin`。生产部署时请设置强随机 `SESSION_SECRET`，并优先使用 `ADMIN_PASSWORD_HASH`。

### Docker 部署

环境要求：Docker 20+ 和 Docker Compose v2。

```bash
docker compose up -d --build
```

服务默认运行在 [http://localhost:3000](http://localhost:3000)。生产环境所需变量应通过部署平台或 `docker-compose.yml` 的 `environment` / `env_file` 配置传入。

常用命令：

```bash
# 查看日志
docker compose logs -f

# 重启服务
docker compose restart

# 停止服务
docker compose down

# 重新构建并启动
docker compose up -d --build
```

如需修改端口，请编辑 `docker-compose.yml`：

```yaml
ports:
  - "8080:3000"
```

### 手动生产部署

```bash
npm ci
npm run build
npm start
```

### 项目结构

```text
├── src/
│   ├── app/              # 页面、管理后台与 API 路由
│   ├── components/       # React 组件
│   └── lib/              # 认证、内容、数据库与通用工具
├── public/               # 字体、图片、视频等静态资源
├── docs/                 # 设计参考与研究资料
├── scripts/              # 资源处理脚本
├── Dockerfile            # Next.js 多阶段生产镜像
├── docker-compose.yml    # 容器服务配置
└── next.config.ts        # Next.js 配置
```

### 可用脚本

```bash
npm run dev      # 启动开发服务器
npm run build    # 创建生产构建
npm start        # 启动生产服务器
npm run lint     # 运行 ESLint
```

---

## English

### Tech Stack

- **Framework:** Next.js 16 and React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI and animation:** Base UI, shadcn, Lucide, and GSAP
- **Deployment:** Docker and Docker Compose

### Local Development

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/icey-hub/p3r-website.git
cd p3r-website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy the example configuration and adjust it for your environment:

```bash
cp .env.example .env.local
```

Key variables:

| Variable | Purpose |
| --- | --- |
| `ADMIN_USERNAME` | Admin dashboard username |
| `ADMIN_PASSWORD` | Admin password for local development |
| `ADMIN_PASSWORD_HASH` | Preferred SHA-256 password hash for production |
| `SESSION_SECRET` | Signing secret for the admin session cookie |
| `DATA_DIR` | Persistent blog database directory |
| `UPLOAD_DIR` | Admin image upload directory |
| `UPLOAD_PUBLIC_PATH` | Public URL path for uploaded files |

The admin dashboard is available at `/admin`. Use a strong random `SESSION_SECRET` in production and prefer `ADMIN_PASSWORD_HASH` over a plain-text password.

### Docker Deployment

Requirements: Docker 20+ and Docker Compose v2.

```bash
docker compose up -d --build
```

The service is available at [http://localhost:3000](http://localhost:3000) by default. Supply production variables through your deployment platform or the `environment` / `env_file` settings in `docker-compose.yml`.

Common commands:

```bash
# View logs
docker compose logs -f

# Restart the service
docker compose restart

# Stop the service
docker compose down

# Rebuild and start
docker compose up -d --build
```

To change the exposed port, edit `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"
```

### Manual Production Deployment

```bash
npm ci
npm run build
npm start
```

### Project Structure

```text
├── src/
│   ├── app/              # Pages, admin dashboard, and API routes
│   ├── components/       # React components
│   └── lib/              # Auth, content, database, and shared utilities
├── public/               # Fonts, images, videos, and other static assets
├── docs/                 # Design references and research notes
├── scripts/              # Asset processing scripts
├── Dockerfile            # Multi-stage Next.js production image
├── docker-compose.yml    # Container service configuration
└── next.config.ts        # Next.js configuration
```

### Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm start        # Start the production server
npm run lint     # Run ESLint
```

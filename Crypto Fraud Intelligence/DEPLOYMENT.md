# 🚀 Deployment Guide

## Overview
This document covers deployment of the Crypto Fraud Intelligence (CFI) system to production environments.

## Backend Deployment (Render)

### Prerequisites
- Render account ([render.com](https://render.com))
- GitHub repository linked to Render
- Environment variables configured

### Environment Variables

Create a `.env` file (or configure in Render dashboard):

```bash
# API Configuration
ENV=production
DEBUG=false
LOG_LEVEL=info

# CORS Configuration
CORS_ORIGINS=https://your-frontend-domain.com,https://another-domain.com

# Database (if using PostgreSQL)
DATABASE_URL=postgresql://user:password@host:port/dbname

# Optional: API Keys for external services
API_KEY_SECRET=your-secret-key
```

### Deployment Steps

#### Option 1: Automatic Deployment (Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Go to Render Dashboard → New → Web Service
   - Connect your GitHub repository
   - Select `crypto/backend` as root directory

2. **Configure Service**
   - Name: `cfi-backend`
   - Region: Select closest to users
   - Environment: `Python 3.10`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port 8000`

3. **Set Environment Variables**
   - Click "Environment" tab
   - Add variables from `.env` file
   - DO NOT commit `.env` to Git

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - View logs in dashboard

#### Option 2: Manual Deployment (Docker)

1. **Create Dockerfile** (if not exists)
   ```dockerfile
   FROM python:3.10-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install --no-cache-dir -r requirements.txt
   COPY . .
   CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
   ```

2. **Build Image**
   ```bash
   docker build -t cfi-backend .
   ```

3. **Test Locally**
   ```bash
   docker run -p 8000:8000 cfi-backend
   ```

4. **Push to Registry**
   ```bash
   docker push your-registry/cfi-backend:latest
   ```

5. **Deploy to Render**
   - Create Web Service from Docker image
   - Specify image URI

### Monitoring & Logs

**View Logs in Render:**
```bash
# In Render Dashboard:
# Service → Logs → Real-time streaming
```

**Common Issues:**

| Issue | Solution |
|-------|----------|
| Port in use | Ensure Start Command uses `$PORT` env var |
| Import errors | Run `pip install -r requirements.txt` |
| CORS errors | Update `CORS_ORIGINS` in env variables |
| Memory issues | Upgrade plan or optimize code |

### Health Checks

Add health check endpoint in `app/main.py`:

```python
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "cfi-backend"}
```

Render will ping this endpoint periodically.

---

## Frontend Deployment (Netlify)

### Prerequisites
- Netlify account ([netlify.com](https://netlify.com))
- GitHub repository
- Environment variables

### Environment Variables

Create `.env.production` in `frontend/`:

```bash
# Backend API URL
NEXT_PUBLIC_API_URL=https://cfiback.onrender.com

# Optional: Analytics, tracking, etc.
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Deployment Steps

#### Option 1: Automatic Deployment (Recommended)

1. **Connect Repository**
   - Go to Netlify → New Site → Import Existing Project
   - Select GitHub repository
   - Authorize Netlify access

2. **Configure Build**
   - Base Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `.next`
   - (Netlify auto-detects Next.js)

3. **Set Environment Variables**
   - Site Settings → Build & Deploy → Environment
   - Add variables from `.env.production`

4. **Deploy**
   - Netlify automatically deploys on push to main
   - View deployment status in dashboard

#### Option 2: Deploy from CLI

```bash
npm install -g netlify-cli

# Login to Netlify
netlify login

# Configure site
netlify init

# Deploy
netlify deploy --prod
```

### Custom Domain

1. Go to Site Settings → Domain Management
2. Add Custom Domain
3. Update DNS records (provided by Netlify)
4. Wait for DNS propagation (up to 48 hours)

### SSL/HTTPS

Netlify automatically provides SSL certificate via Let's Encrypt.

---

## Database Setup (If Using PostgreSQL)

### Create PostgreSQL Instance

#### Option 1: Render PostgreSQL

1. Render Dashboard → New → PostgreSQL
2. Name: `cfi-database`
3. PostgreSQL Version: 14+
4. Region: Same as backend service
5. Create

#### Option 2: External Provider (AWS RDS, Heroku, etc.)

1. Create database instance
2. Get connection string: `postgresql://user:pass@host:port/dbname`
3. Add to backend environment variables as `DATABASE_URL`

### Initialize Schema

```bash
# Connect to database
psql $DATABASE_URL

# Create tables
\i schema.sql
```

### Backup & Recovery

```bash
# Backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

---

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy CFI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: '3.10'
      - run: pip install -r backend/requirements.txt
      - run: pytest backend/tests/

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd frontend && npm install
      - run: npm run lint
      - run: npm run build

  deploy:
    needs: [test, test-frontend]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - run: echo "Deploying to production..."
      - run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
          curl -X POST ${{ secrets.NETLIFY_DEPLOY_HOOK }}
```

---

## Performance Optimization

### Backend

```python
# Enable caching
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from redis import asyncio as aioredis

@app.get("/graph", response_class=JSONResponse)
@cached(namespace="graph", expire=3600)
async def get_graph():
    # Cached for 1 hour
    pass
```

### Frontend

```typescript
// Enable ISR (Incremental Static Regeneration)
export const revalidate = 60; // Revalidate every 60 seconds
```

### CDN Configuration

1. **Netlify**: Automatic global CDN
2. **Render**: Enable CDN caching in environment variables
3. **Cloudflare**: (Optional) Add as proxy for additional performance

---

## Monitoring & Alerts

### Render Monitoring

- Real-time logs
- CPU/Memory usage
- Error tracking
- Set up alerts for service issues

### Netlify Analytics

- Deploy analytics
- Site performance metrics
- Error tracking
- Form submissions

### External Monitoring (Optional)

- **New Relic**: Application performance monitoring
- **Sentry**: Error tracking and reporting
- **Datadog**: Full observability platform

---

## Troubleshooting

### Backend Issues

**Service keeps restarting:**
- Check logs for errors
- Verify Start Command syntax
- Check memory usage (upgrade if needed)

**API returns 502 Bad Gateway:**
- Ensure health check passes
- Check database connectivity
- Review error logs

**CORS errors:**
- Verify frontend URL in `CORS_ORIGINS`
- Check API is returning proper headers

### Frontend Issues

**Blank page on load:**
- Check browser console for errors
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check network requests in DevTools

**Slow performance:**
- Enable caching headers
- Optimize images
- Check JavaScript bundle size

**Deployment fails:**
- Check build logs for errors
- Verify all dependencies in `package.json`
- Check environment variables are set

---

## Rollback Procedure

### Render Backend

1. Dashboard → Deployments
2. Find previous successful deployment
3. Click → Redeploy
4. Verify health check passes

### Netlify Frontend

1. Dashboard → Deploys
2. Find previous successful deploy
3. Click → Publish Deploy
4. Verify site loads correctly

---

## Security Best Practices

✅ **DO:**
- Use environment variables for secrets
- Enable HTTPS/SSL
- Regular dependency updates (`npm audit`, `pip audit`)
- Input validation on all endpoints
- Rate limiting
- CORS restrictions
- Database SSL connections
- Regular backups

❌ **DON'T:**
- Commit secrets or API keys
- Run with `DEBUG=true` in production
- Use default/weak database passwords
- Allow unlimited CORS origins
- Skip security headers
- Ignore dependency vulnerabilities

### Security Headers

Add to backend (`main.py`):

```python
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware

app.add_middleware(TrustedHostMiddleware, allowed_hosts=["yourdomain.com"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Disaster Recovery

### Backup Strategy

```bash
# Weekly database backups
0 0 * * 0 pg_dump $DATABASE_URL > /backups/backup_$(date +%Y%m%d).sql

# Weekly code backups
0 0 * * 0 git clone --mirror <repo> /backups/repo_$(date +%Y%m%d).git
```

### Recovery Checklist

- [ ] Restore database from backup
- [ ] Rollback code to previous version
- [ ] Verify health checks pass
- [ ] Run data integrity checks
- [ ] Notify users of recovery
- [ ] Post-mortem analysis

---

## Cost Optimization

- Use free tier for development/staging
- Scale resources based on traffic
- Use CDN for static content
- Archive old logs
- Review unused services monthly

---

## Support & Resources

- [Render Docs](https://render.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Last Updated**: 2026-05-28
**Maintainer**: Crypto Fraud Intelligence Team

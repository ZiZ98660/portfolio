# Free Deployment Guide

This guide covers free hosting options for the portfolio backend.

## 🆓 Free PostgreSQL Hosting Options

### 1. **Supabase** (Recommended - Best Free Tier)
- **Free Tier:** 500MB database, unlimited API requests
- **PostgreSQL:** Full PostgreSQL 15
- **Setup:**
  1. Sign up at https://supabase.com
  2. Create a new project
  3. Go to Settings → Database
  4. Copy the connection string
  5. Use in `.env`: `DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres`

### 2. **Neon** (Serverless PostgreSQL)
- **Free Tier:** 3GB storage, unlimited projects
- **PostgreSQL:** Latest version
- **Setup:**
  1. Sign up at https://neon.tech
  2. Create a new project
  3. Copy the connection string
  4. Use in `.env`: `DATABASE_URL=postgresql://[USER]:[PASSWORD]@[HOST]/[DATABASE]`

### 3. **Railway**
- **Free Tier:** $5 credit/month (enough for small projects)
- **PostgreSQL:** One-click setup
- **Setup:**
  1. Sign up at https://railway.app
  2. Create new project → Add PostgreSQL
  3. Copy connection string from Variables tab

### 4. **Render**
- **Free Tier:** PostgreSQL with automatic sleep (wakes on request)
- **PostgreSQL:** Full PostgreSQL
- **Setup:**
  1. Sign up at https://render.com
  2. Create new PostgreSQL database
  3. Copy internal connection string

### 5. **ElephantSQL**
- **Free Tier:** 20MB database (tiny but works for portfolios)
- **PostgreSQL:** PostgreSQL 15
- **Setup:**
  1. Sign up at https://www.elephantsql.com
  2. Create free instance
  3. Copy connection URL

## 💾 SQLite for Free Deployments

SQLite works great for small portfolios and is **completely free** with no hosting costs.

### When to Use SQLite:
- ✅ Small to medium portfolios (< 100 projects)
- ✅ Low traffic (< 1000 visitors/day)
- ✅ Single server deployment
- ✅ Budget: $0

### When NOT to Use SQLite:
- ❌ High traffic (> 1000 concurrent users)
- ❌ Multiple servers (can't share SQLite file)
- ❌ Need advanced PostgreSQL features

### Using SQLite in Production:

The backend is already configured to use SQLite if `DATABASE_URL` is not set. For free deployments:

```env
# .env for free deployment
DATABASE_URL=sqlite:///portfolio.db
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
```

**Note:** SQLite files are stored in the server's filesystem. Make sure your hosting provider supports persistent storage.

## 🚀 Free Hosting Platforms

### Backend Hosting (Flask)

1. **Render** (Recommended)
   - Free tier: 750 hours/month
   - Automatic deployments from GitHub
   - Supports SQLite and PostgreSQL
   - **Setup:** Connect GitHub repo → Deploy

2. **Railway**
   - Free tier: $5 credit/month
   - Easy PostgreSQL integration
   - **Setup:** Connect GitHub → Add PostgreSQL → Deploy

3. **Fly.io**
   - Free tier: 3 shared VMs
   - Supports SQLite
   - **Setup:** `fly launch` → Deploy

4. **PythonAnywhere**
   - Free tier: Limited but works
   - Supports SQLite
   - **Setup:** Upload files → Configure

5. **Heroku** (No longer free, but alternatives above are)

## 📝 Recommended Free Stack

### Option 1: Supabase + Render (Best)
```
Backend: Render (Free)
Database: Supabase PostgreSQL (Free)
Storage: Supabase Storage (Free) or Render filesystem
```

### Option 2: SQLite + Render (Simplest)
```
Backend: Render (Free)
Database: SQLite (Free, included)
Storage: Render filesystem
```

### Option 3: Neon + Railway
```
Backend: Railway (Free tier)
Database: Neon PostgreSQL (Free)
Storage: Railway filesystem
```

## 🔧 Configuration Examples

### Supabase Setup
```env
DATABASE_URL=postgresql://postgres.xxxxx:[PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
ALLOWED_ORIGINS=https://yourdomain.com
```

### Neon Setup
```env
DATABASE_URL=postgresql://[user]:[password]@[host]/[dbname]?sslmode=require
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
```

### SQLite Setup (Free)
```env
DATABASE_URL=sqlite:///portfolio.db
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret
```

## ⚠️ Important Notes

1. **File Storage:** Free tiers usually have limited storage. Consider:
   - Using external storage (Cloudinary, ImgBB) for images
   - Or use Supabase Storage (free tier: 1GB)

2. **Database Limits:**
   - Supabase: 500MB (plenty for portfolios)
   - Neon: 3GB (more than enough)
   - ElephantSQL: 20MB (very limited)

3. **Backup:** Always backup your database regularly, especially with free tiers.

4. **Cold Starts:** Some free tiers have cold starts (Render free PostgreSQL sleeps after inactivity).

## 🎯 Quick Start: Free Deployment

1. **Choose database:**
   - Small portfolio → SQLite
   - Need PostgreSQL → Supabase or Neon

2. **Deploy backend:**
   - Push to GitHub
   - Connect to Render/Railway
   - Set environment variables
   - Deploy!

3. **Test:**
   - Check health endpoint
   - Test admin login
   - Verify database connection

## 📚 Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [Neon Docs](https://neon.tech/docs)
- [Render Docs](https://render.com/docs)
- [Railway Docs](https://docs.railway.app)


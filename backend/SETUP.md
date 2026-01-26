# Quick Setup Guide

## PostgreSQL Setup (Recommended)

### 1. Install PostgreSQL

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from: https://www.postgresql.org/download/windows/

### 2. Create Database

```bash
# Login to PostgreSQL
psql postgres

# In PostgreSQL prompt:
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
\q
```

### 3. Configure Environment

Create a `.env` file in the `backend/` directory:

```env
# Database
DATABASE_URL=postgresql://portfolio_user:your_secure_password@localhost:5432/portfolio_db

# Security
SECRET_KEY=your-very-secret-key-here-change-in-production
JWT_SECRET_KEY=your-jwt-secret-key-here-change-in-production

# Admin
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=your-secure-admin-password

# CORS (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Server
PORT=5000
FLASK_ENV=development
```

### 4. Install Dependencies

```bash
# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# or
venv\Scripts\activate     # Windows

# Install packages
pip install -r requirements.txt
```

### 5. Initialize Database

```bash
# Initialize Flask-Migrate
flask db init

# Create initial migration
flask db migrate -m "Initial migration with all models"

# Apply migration
flask db upgrade

# Create default admin
flask init-db
```

### 6. Run the Server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## SQLite Setup (Development Only)

If you want to use SQLite for quick local development:

1. **Skip PostgreSQL installation**
2. **Create `.env` file:**
   ```env
   DATABASE_URL=sqlite:///portfolio.db
   SECRET_KEY=dev-secret-key
   JWT_SECRET_KEY=dev-jwt-secret
   ```
3. **Run setup:**
   ```bash
   python setup_db.py
   ```
4. **Start server:**
   ```bash
   python app.py
   ```

## Verify Setup

1. **Check API health:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Test admin login:**
   ```bash
   curl -X POST http://localhost:5000/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'
   ```

3. **Access admin panel:**
   - Navigate to `http://localhost:3001` (admin frontend)
   - Login with default credentials

## Troubleshooting

### PostgreSQL Connection Issues

**Error: "could not connect to server"**
- Check if PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in `.env`
- Check PostgreSQL logs

**Error: "database does not exist"**
- Create database: `createdb portfolio_db`
- Or use psql: `CREATE DATABASE portfolio_db;`

**Error: "password authentication failed"**
- Verify username and password in DATABASE_URL
- Reset password: `ALTER USER portfolio_user WITH PASSWORD 'new_password';`

### Migration Issues

**Error: "Target database is not up to date"**
```bash
flask db upgrade
```

**Error: "Can't locate revision identified by"**
```bash
# Reset migrations (⚠️ This will delete migration history)
rm -rf migrations/
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

## Next Steps

1. ✅ Database is set up
2. ✅ Admin user created
3. ✅ API is running
4. 📝 Start adding data via admin panel
5. 🔗 Connect frontend to API


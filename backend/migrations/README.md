# Database Migrations

This directory contains database migration files managed by Flask-Migrate.

## Initial Setup

If this is the first time setting up the database:

```bash
# Initialize migrations (only needed once)
flask db init

# Create initial migration
flask db migrate -m "Initial migration"

# Apply migration to create tables
flask db upgrade
```

## Creating New Migrations

After making changes to models:

```bash
# Generate migration
flask db migrate -m "Description of changes"

# Review the generated migration file in migrations/versions/

# Apply migration
flask db upgrade
```

## Rolling Back

To rollback the last migration:

```bash
flask db downgrade
```

## Migration Commands

- `flask db init` - Initialize migrations directory (first time only)
- `flask db migrate -m "message"` - Create a new migration
- `flask db upgrade` - Apply pending migrations
- `flask db downgrade` - Rollback last migration
- `flask db current` - Show current revision
- `flask db history` - Show migration history
- `flask db show` - Show migration details

## PostgreSQL Setup

1. Install PostgreSQL:
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   sudo systemctl start postgresql
   ```

2. Create database:
   ```bash
   createdb portfolio_db
   ```

3. Update `.env`:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/portfolio_db
   ```

4. Run migrations:
   ```bash
   flask db upgrade
   ```


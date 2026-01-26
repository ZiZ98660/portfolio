# Portfolio Backend - Flask API

Backend API for the portfolio website built with Flask, featuring admin panel, file uploads, and project management.

## 🚀 Features

- ✅ **Project Management** - Full CRUD operations for portfolio projects
- ✅ **File Uploads** - Images, screenshots, and videos
- ✅ **Admin Authentication** - JWT-based secure authentication
- ✅ **Public API** - RESTful endpoints for frontend
- ✅ **Database** - SQLAlchemy ORM with SQLite (PostgreSQL ready)
- ✅ **File Management** - Automatic image optimization and secure storage

## 📋 Quick Start

### 1. Setup Virtual Environment

```bash
# Activate virtual environment
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate  # On Windows
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
DATABASE_URL=sqlite:///portfolio.db
```

### 4. Setup Database

**For PostgreSQL:**
```bash
# Initialize migrations
flask db init

# Create initial migration
flask db migrate -m "Initial migration"

# Apply migration
flask db upgrade

# Create default admin
flask init-db
```

**For SQLite (Development):**
```bash
# Database will be created automatically on first run
# Or use the setup script:
python setup_db.py
```

### 5. Run the Server

```bash
python app.py
```

The API will be available at `http://localhost:5000`

**Default Admin Credentials:**
- Username: `admin`
- Password: `admin123` (⚠️ Change this in production!)

### 6. Available CLI Commands

```bash
# Initialize database and create default admin
flask init-db

# Create a new admin user
flask create-admin

# Database migrations
flask db init          # Initialize migrations (first time)
flask db migrate       # Create migration
flask db upgrade       # Apply migrations
flask db downgrade     # Rollback migration
```

## 📁 Project Structure

```
backend/
├── app.py                 # Main Flask application
├── models/                # Database models
│   ├── __init__.py
│   ├── project.py        # Project model
│   └── admin.py          # Admin user model
├── routes/                # API routes
│   ├── __init__.py
│   ├── admin_routes.py   # Admin endpoints
│   └── public_routes.py  # Public endpoints
├── utils/                 # Utility functions
│   ├── __init__.py
│   └── file_upload.py    # File upload handling
├── uploads/               # Uploaded files
│   ├── projects/         # Project thumbnails
│   ├── screenshots/      # Project screenshots
│   └── videos/           # Project videos
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

## 🔌 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/projects` | Get all published projects |
| GET | `/api/projects/<id>` | Get single project |
| GET | `/api/projects/featured` | Get featured projects |
| GET | `/api/uploads/<path>` | Serve uploaded files |

**Query Parameters:**
- `?featured=true` - Filter featured projects
- `?category=web` - Filter by category
- `?limit=10` - Limit results

### Admin Endpoints (Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/me` | Get current admin |
| GET | `/api/admin/projects` | Get all projects (including drafts) |
| POST | `/api/admin/projects` | Create new project |
| GET | `/api/admin/projects/<id>` | Get project |
| PUT | `/api/admin/projects/<id>` | Update project |
| DELETE | `/api/admin/projects/<id>` | Delete project |
| DELETE | `/api/admin/projects/<id>/screenshots/<index>` | Delete screenshot |

## 📤 File Upload

### Supported Formats

**Images:**
- PNG, JPG, JPEG, GIF, WEBP, SVG
- Auto-optimized if > 1920px width

**Videos:**
- MP4, WEBM, OGG, MOV
- Max size: 100MB

### Upload Example

```bash
POST /api/admin/projects
Authorization: Bearer <token>
Content-Type: multipart/form-data

Form fields:
- title: "Project Title"
- description: "Project description"
- thumbnail: <image file>
- screenshots: <file1>, <file2>, ...
- video: <video file> (optional)
- live_link: "https://example.com"
- github_link: "https://github.com/..."
- technologies: ["React", "Node.js"]
- category: "web"
- featured: true/false
- status: "draft" | "published" | "archived"
```

## 🔐 Authentication

### Login

```bash
POST /api/admin/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "admin": {
    "id": 1,
    "username": "admin",
    "email": "admin@portfolio.com"
  }
}
```

### Using Token

Include the token in the Authorization header:

```bash
Authorization: Bearer <access_token>
```

## 💾 Database

### Database Options

The backend supports multiple databases:

1. **PostgreSQL** (Recommended for production) - Best for scalability
2. **SQLite** (Perfect for free deployments) - Zero cost, works great for portfolios

**For free deployments, SQLite is recommended** - it's included, requires no setup, and works perfectly for portfolio websites.

#### Setup PostgreSQL

1. **Install PostgreSQL:**
   ```bash
   # macOS
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib
   sudo systemctl start postgresql
   
   # Windows
   # Download from https://www.postgresql.org/download/windows/
   ```

2. **Create Database:**
   ```bash
   # Login to PostgreSQL
   psql postgres
   
   # Create database and user
   CREATE DATABASE portfolio_db;
   CREATE USER portfolio_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
   \q
   ```

3. **Configure Environment:**
   
   Create a `.env` file in the `backend/` directory:
   ```env
   DATABASE_URL=postgresql://portfolio_user:your_password@localhost:5432/portfolio_db
   SECRET_KEY=your-secret-key-here
   JWT_SECRET_KEY=your-jwt-secret-key-here
   ADMIN_EMAIL=admin@portfolio.com
   ADMIN_PASSWORD=admin123
   ```

4. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Initialize Database:**
   ```bash
   # Option 1: Using Flask-Migrate (Recommended)
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   
   # Option 2: Using setup script
   python setup_db.py
   ```

### SQLite (Free Deployment Option)

SQLite is perfect for free deployments and small to medium portfolios:

**Advantages:**
- ✅ Completely free (no database hosting needed)
- ✅ Zero configuration
- ✅ Perfect for portfolios (< 100 projects, < 1000 visitors/day)
- ✅ Works on all hosting platforms
- ✅ Fast for read-heavy workloads

**Configuration:**
```env
# Simply don't set DATABASE_URL, or explicitly use:
DATABASE_URL=sqlite:///portfolio.db
```

**When to use SQLite:**
- Small to medium portfolios
- Free deployments
- Single server setup
- Low to medium traffic

**When to use PostgreSQL:**
- Large portfolios (> 100 projects)
- High traffic (> 1000 concurrent users)
- Multiple servers
- Need advanced features

See [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md) for free PostgreSQL hosting options if you need PostgreSQL.

## 🛠️ Development

### Database Migrations

Flask-Migrate is configured for database migrations. This is essential when using PostgreSQL.

```bash
# Initialize migrations (first time only)
flask db init

# Create migration after model changes
flask db migrate -m "Description of changes"

# Apply migration
flask db upgrade

# Rollback last migration
flask db downgrade

# Check current migration version
flask db current

# View migration history
flask db history
```

**Important:** Always create migrations when you modify models. The migrations ensure your database schema stays in sync with your code.

### Testing

```bash
# Run with debug mode
FLASK_ENV=development python app.py
```

## 📚 Additional Features

See [BACKEND_FEATURES.md](./BACKEND_FEATURES.md) for a complete list of:
- ✅ Implemented features
- 📋 Recommended additional features
- 🔒 Security best practices
- 📝 API usage examples

## 🚢 Deployment

### Environment Variables for Production

```env
SECRET_KEY=<strong-random-key>
JWT_SECRET_KEY=<strong-random-key>
FLASK_ENV=production
DATABASE_URL=postgresql://...
ALLOWED_ORIGINS=https://yourdomain.com
ADMIN_PASSWORD=<strong-password>
```

### Recommended Platforms

- **Render** - Easy Flask deployment
- **Railway** - Simple setup with PostgreSQL
- **Heroku** - Classic option
- **DigitalOcean** - Full control

## 📄 License

This project is open source and available under the MIT License.

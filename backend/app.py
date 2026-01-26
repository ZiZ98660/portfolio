from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # Set to timedelta(hours=24) for 24-hour expiry

# Database configuration - Supports PostgreSQL, SQLite, and other databases
# Priority: DATABASE_URL env var > SQLite default
database_url = os.environ.get('DATABASE_URL')
if not database_url:
    # Default to SQLite for local development and free deployments
    # SQLite works great for small to medium portfolios and is completely free
    database_url = 'sqlite:///portfolio.db'
    print("ℹ️  Using SQLite database (portfolio.db)")
    print("💡 For PostgreSQL, set DATABASE_URL in .env")
elif database_url.startswith('postgres://'):
    # Heroku and some providers use 'postgres://' which needs to be 'postgresql://'
    database_url = database_url.replace('postgres://', 'postgresql://', 1)
    print("✅ Using PostgreSQL database")
elif database_url.startswith('postgresql://'):
    print("✅ Using PostgreSQL database")
elif database_url.startswith('sqlite'):
    print("ℹ️  Using SQLite database")

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Connection pooling (only for PostgreSQL, not needed for SQLite)
if database_url.startswith('postgresql://'):
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_pre_ping': True,  # Verify connections before using
        'pool_recycle': 300,    # Recycle connections after 5 minutes
    }

# File upload configuration
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
MAX_CONTENT_LENGTH = 100 * 1024 * 1024  # 100MB max file size
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Create upload directories
os.makedirs(os.path.join(UPLOAD_FOLDER, 'projects'), exist_ok=True)
os.makedirs(os.path.join(UPLOAD_FOLDER, 'screenshots'), exist_ok=True)
os.makedirs(os.path.join(UPLOAD_FOLDER, 'videos'), exist_ok=True)
os.makedirs(os.path.join(UPLOAD_FOLDER, 'profile'), exist_ok=True)

# Enable CORS
CORS(app, resources={
    r"/api/*": {
        "origins": os.environ.get('ALLOWED_ORIGINS', '*').split(','),
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Email configuration (Flask-Mail)
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USE_SSL'] = os.environ.get('MAIL_USE_SSL', 'False').lower() == 'true'
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER', app.config['MAIL_USERNAME'])
app.config['PORTFOLIO_OWNER_EMAIL'] = os.environ.get('PORTFOLIO_OWNER_EMAIL', app.config['MAIL_USERNAME'])
app.config['PORTFOLIO_OWNER_NAME'] = os.environ.get('PORTFOLIO_OWNER_NAME', 'Portfolio Owner')

# Initialize extensions
from models import db
from models.admin import bcrypt
from flask_jwt_extended import JWTManager
from flask_mail import Mail

db.init_app(app)
bcrypt.init_app(app)
jwt = JWTManager(app)
mail = Mail(app)

# JWT Error Handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({'error': 'Token has expired'}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({'error': f'Invalid token: {str(error)}'}), 422

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({'error': 'Authorization header is missing or invalid'}), 401

# Initialize Flask-Migrate for database migrations
migrate = Migrate(app, db)

# Register blueprints
from routes import admin_bp, public_bp
app.register_blueprint(admin_bp)
app.register_blueprint(public_bp)

# Import CLI commands
import cli

# Initialize database and create default admin
with app.app_context():
    # Create tables (only if using SQLite, otherwise use migrations)
    if database_url.startswith('sqlite'):
        db.create_all()
    
    # Create default admin if it doesn't exist
    from models.admin import Admin
    try:
        admin_username = os.environ.get('ADMIN_USERNAME', 'admin')
        admin_email = os.environ.get('ADMIN_EMAIL', 'admin@portfolio.com')
        admin_password = os.environ.get('ADMIN_PASSWORD')
        
        if not Admin.query.filter_by(username=admin_username).first():
            if not admin_password:
                print("⚠️  ADMIN_PASSWORD not set in .env file")
                print("💡 Please set ADMIN_USERNAME, ADMIN_EMAIL, and ADMIN_PASSWORD in .env file")
                print("💡 Example:")
                print("   ADMIN_USERNAME=your_username")
                print("   ADMIN_EMAIL=your_email@example.com")
                print("   ADMIN_PASSWORD=your_secure_password")
            else:
                admin = Admin(
                    username=admin_username,
                    email=admin_email
                )
                admin.set_password(admin_password)
                db.session.add(admin)
                db.session.commit()
                print(f"✅ Admin user created: username='{admin_username}', email='{admin_email}'")
                print("⚠️  Please keep your credentials secure!")
    except Exception as e:
        print(f"⚠️  Could not create admin user: {e}")
        print("💡 Run database migrations first: flask db upgrade")

@app.route('/')
def index():
    """Root endpoint"""
    return jsonify({
        'message': 'Portfolio API',
        'version': '1.0.0',
        'endpoints': {
            'health': '/api/health',
            'projects': '/api/projects',
            'admin_login': '/api/admin/login'
        }
    })

@app.route('/health')
def root_health():
    """Root health check for Render"""
    return jsonify({"status": "healthy", "message": "Flask backend is running"}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_ENV') == 'development'
    print(f"🚀 Starting server on port {port}")
    app.run(debug=debug, host='0.0.0.0', port=port)

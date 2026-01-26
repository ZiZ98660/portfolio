#!/usr/bin/env python3
"""
Database setup script for Portfolio Backend
Run this script to initialize the database and create default admin user
"""

import os
from dotenv import load_dotenv
from app import app, db
from models.admin import Admin

load_dotenv()

def setup_database():
    """Initialize database and create default admin"""
    with app.app_context():
        print("🔄 Setting up database...")
        
        # Create all tables
        try:
            db.create_all()
            print("✅ Database tables created successfully")
        except Exception as e:
            print(f"⚠️  Error creating tables: {e}")
            print("💡 If using PostgreSQL, make sure:")
            print("   1. PostgreSQL is running")
            print("   2. Database exists: createdb portfolio_db")
            print("   3. DATABASE_URL is set correctly in .env")
            return False
        
        # Create default admin
        try:
            if not Admin.query.filter_by(username='admin').first():
                admin = Admin(
                    username='admin',
                    email=os.environ.get('ADMIN_EMAIL', 'admin@portfolio.com')
                )
                admin.set_password(os.environ.get('ADMIN_PASSWORD', 'admin123'))
                db.session.add(admin)
                db.session.commit()
                print("✅ Default admin created:")
                print(f"   Username: admin")
                print(f"   Password: admin123")
                print("⚠️  Please change the default password in production!")
            else:
                print("ℹ️  Admin user already exists")
        except Exception as e:
            print(f"⚠️  Error creating admin: {e}")
            return False
        
        print("\n🎉 Database setup complete!")
        return True

if __name__ == '__main__':
    setup_database()


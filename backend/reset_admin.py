#!/usr/bin/env python3
"""
Script to reset admin user from .env file
This will delete any existing admin users and create a new one from .env
"""
import os
from dotenv import load_dotenv
from app import app
from models.admin import Admin
from models import db

# Load environment variables
load_dotenv()

with app.app_context():
    admin_username = os.environ.get('ADMIN_USERNAME')
    admin_email = os.environ.get('ADMIN_EMAIL')
    admin_password = os.environ.get('ADMIN_PASSWORD')
    
    if not admin_username or not admin_email or not admin_password:
        print("❌ Error: ADMIN_USERNAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be set in .env file")
        exit(1)
    
    # Delete all existing admin users
    existing_admins = Admin.query.all()
    if existing_admins:
        print(f"🗑️  Deleting {len(existing_admins)} existing admin user(s)...")
        for admin in existing_admins:
            db.session.delete(admin)
        db.session.commit()
        print("✅ Existing admin users deleted")
    
    # Create new admin user from .env
    new_admin = Admin(
        username=admin_username,
        email=admin_email
    )
    new_admin.set_password(admin_password)
    db.session.add(new_admin)
    db.session.commit()
    
    print(f"✅ Admin user created successfully!")
    print(f"   Username: {admin_username}")
    print(f"   Email: {admin_email}")
    print("⚠️  Please keep your credentials secure!")


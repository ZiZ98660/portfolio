"""
Flask CLI commands for database management
"""
import click
from flask.cli import with_appcontext
from app import app, db
from models.admin import Admin
import os

@app.cli.command()
@with_appcontext
def init_db():
    """Initialize the database and create default admin"""
    click.echo('🔄 Creating database tables...')
    db.create_all()
    click.echo('✅ Database tables created')
    
    # Create default admin
    if not Admin.query.filter_by(username='admin').first():
        admin = Admin(
            username='admin',
            email=os.environ.get('ADMIN_EMAIL', 'admin@portfolio.com')
        )
        admin.set_password(os.environ.get('ADMIN_PASSWORD', 'admin123'))
        db.session.add(admin)
        db.session.commit()
        click.echo('✅ Default admin created:')
        click.echo('   Username: admin')
        click.echo('   Password: admin123')
        click.echo('⚠️  Please change the default password in production!')
    else:
        click.echo('ℹ️  Admin user already exists')

@app.cli.command()
@with_appcontext
def create_admin():
    """Create a new admin user"""
    username = click.prompt('Username', default='admin')
    email = click.prompt('Email', default='admin@portfolio.com')
    password = click.prompt('Password', hide_input=True, confirmation_prompt=True)
    
    if Admin.query.filter_by(username=username).first():
        click.echo(f'❌ User {username} already exists')
        return
    
    admin = Admin(username=username, email=email)
    admin.set_password(password)
    db.session.add(admin)
    db.session.commit()
    click.echo(f'✅ Admin user {username} created successfully')


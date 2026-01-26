#!/usr/bin/env python3
"""
Test Flask-Mail configuration
"""
import os
from dotenv import load_dotenv
from flask import Flask
from flask_mail import Mail, Message

# Load environment variables
load_dotenv()

# Create Flask app
app = Flask(__name__)

# Email configuration
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.environ.get('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USE_SSL'] = os.environ.get('MAIL_USE_SSL', 'False').lower() == 'true'
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_DEFAULT_SENDER', app.config['MAIL_USERNAME'])
app.config['PORTFOLIO_OWNER_EMAIL'] = os.environ.get('PORTFOLIO_OWNER_EMAIL', app.config['MAIL_USERNAME'])
app.config['PORTFOLIO_OWNER_NAME'] = os.environ.get('PORTFOLIO_OWNER_NAME', 'Portfolio Owner')

# Initialize Mail
mail = Mail(app)

def test_email_config():
    """Test email configuration"""
    print("=" * 50)
    print("Testing Flask-Mail Configuration")
    print("=" * 50)
    print()
    
    # Check configuration
    print("📧 Email Configuration:")
    print(f"  MAIL_SERVER: {app.config['MAIL_SERVER']}")
    print(f"  MAIL_PORT: {app.config['MAIL_PORT']}")
    print(f"  MAIL_USE_TLS: {app.config['MAIL_USE_TLS']}")
    print(f"  MAIL_USE_SSL: {app.config['MAIL_USE_SSL']}")
    print(f"  MAIL_USERNAME: {app.config['MAIL_USERNAME'] or '❌ NOT SET'}")
    print(f"  MAIL_PASSWORD: {'✅ SET' if app.config['MAIL_PASSWORD'] else '❌ NOT SET'}")
    print(f"  MAIL_DEFAULT_SENDER: {app.config['MAIL_DEFAULT_SENDER'] or '❌ NOT SET'}")
    print(f"  PORTFOLIO_OWNER_EMAIL: {app.config['PORTFOLIO_OWNER_EMAIL'] or '❌ NOT SET'}")
    print(f"  PORTFOLIO_OWNER_NAME: {app.config['PORTFOLIO_OWNER_NAME']}")
    print()
    
    # Check if required fields are set
    if not app.config['MAIL_USERNAME']:
        print("❌ ERROR: MAIL_USERNAME is not set in .env file")
        return False
    
    if not app.config['MAIL_PASSWORD']:
        print("❌ ERROR: MAIL_PASSWORD is not set in .env file")
        return False
    
    if not app.config['PORTFOLIO_OWNER_EMAIL']:
        print("❌ ERROR: PORTFOLIO_OWNER_EMAIL is not set in .env file")
        return False
    
    print("✅ All required email configuration fields are set")
    print()
    
    # Test sending email
    print("📤 Testing email send...")
    try:
        with app.app_context():
            test_email = app.config['PORTFOLIO_OWNER_EMAIL']
            msg = Message(
                subject='🧪 Test Email - Portfolio API',
                recipients=[test_email],
                html='''
                <html>
                <body>
                    <h2>Test Email from Portfolio API</h2>
                    <p>This is a test email to verify Flask-Mail configuration.</p>
                    <p>If you received this email, your email configuration is working correctly! ✅</p>
                    <hr>
                    <p><small>Sent from Portfolio API Test Script</small></p>
                </body>
                </html>
                ''',
                body='Test Email from Portfolio API\n\nThis is a test email to verify Flask-Mail configuration.\n\nIf you received this email, your email configuration is working correctly!'
            )
            mail.send(msg)
            print(f"✅ Test email sent successfully to {test_email}")
            print("   Please check your inbox to confirm receipt.")
            return True
    except Exception as e:
        print(f"❌ ERROR sending test email: {str(e)}")
        print()
        print("Common issues:")
        print("  1. Gmail: Use App Password instead of regular password")
        print("  2. Check firewall/network settings")
        print("  3. Verify SMTP server and port settings")
        print("  4. Check if 2FA is enabled (required for Gmail App Passwords)")
        return False

if __name__ == '__main__':
    success = test_email_config()
    print()
    print("=" * 50)
    if success:
        print("✅ Email configuration test completed successfully!")
    else:
        print("❌ Email configuration test failed. Please check your .env file.")
    print("=" * 50)


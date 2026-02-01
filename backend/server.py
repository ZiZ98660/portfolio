from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
import re
import json
from datetime import datetime
 
load_dotenv()
 
app = Flask(__name__)
 
# Basic config
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'simple-portfolio-key')
 
# Email config
app.config['MAIL_SERVER'] = os.environ.get('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.environ.get('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_USERNAME')
app.config['PORTFOLIO_OWNER_EMAIL'] = os.environ.get('PORTFOLIO_OWNER_EMAIL')
 
# Enable CORS
# 
 
# Initialize emailCORS(app, resources={
#     r"/*": {
#         "origins": [
#             "http://localhost:3000",
#             "https://ziz-dev-portfolio.vercel.app",
#             "https://*.vercel.app"
#         ],
#         "methods": ["GET", "POST", "OPTIONS"],
#         "allow_headers": ["Content-Type"],
#         "supports_credentials": False
#     }
# })
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

mail = Mail(app)
 
# Simple JSON file storage (persistent across restarts)
SUBSCRIBERS_FILE = os.path.join(os.environ.get('DATA_DIR', '.'), 'subscribers.json')
 
def load_subscribers():
    """Load subscribers from JSON file"""
    try:
        with open(SUBSCRIBERS_FILE, 'r') as f:
            return set(json.load(f))
    except FileNotFoundError:
        return set()
 
def save_subscribers():
    """Save subscribers to JSON file"""
    with open(SUBSCRIBERS_FILE, 'w') as f:
        json.dump(list(subscribers), f, indent=2)
 
subscribers = load_subscribers()
 
def is_valid_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None
 
@app.route('/health', methods=['GET'])
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "healthy", "message": "Simple backend running"}), 200
 
@app.route('/api/subscribe', methods=['POST'])
def subscribe():
    """Subscription endpoint"""
    try:
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        name = data.get('name', '').strip()
        source = data.get('source', 'website')
        
        # Validate email
        if not email or not is_valid_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Check if already subscribed
        if email in subscribers:
            return jsonify({
                'message': 'You are already subscribed!',
                'subscribed': True
            }), 200
        
        # Add to subscriber list
        subscribers.add(email)
        save_subscribers()
        
        # Send welcome email to subscriber
        try:
            msg = Message(
                subject='Welcome to My Portfolio Newsletter! 🎉',
                recipients=[email],
                body=f"""
Hi {name or 'there'}!
 
Thank you for subscribing to my portfolio newsletter.
 
You'll receive updates about:
• New healthcare & EMR projects
• Technical articles and insights
• Latest developments in my work
 
Best regards,
Your Name
 
---
To unsubscribe, reply to this email with "unsubscribe" in the subject.
                """,
                html=f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f0f9ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Welcome! 🎉</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 40px 30px;">
            <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi <strong>{name or 'there'}</strong>,
            </p>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                Thank you for subscribing to my portfolio newsletter! I'm excited to share my journey with you.
            </p>
            
            <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="color: #1e293b; font-size: 15px; font-weight: 600; margin: 0 0 12px 0;">
                    📬 You'll receive updates about:
                </p>
                <ul style="color: #475569; font-size: 15px; line-height: 1.8; margin: 0; padding-left: 20px;">
                    <li>New healthcare & EMR projects</li>
                    <li>Technical articles and insights</li>
                    <li>Latest developments in my work</li>
                </ul>
            </div>
            
            <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                Best regards,<br>
                <strong style="color: #0ea5e9;">Your Name</strong>
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                To unsubscribe, reply to this email with "unsubscribe" in the subject.
            </p>
        </div>
    </div>
</body>
</html>
                """
            )
            mail.send(msg)
        except Exception as e:
            print(f"⚠️  Warning: Failed to send welcome email: {e}")
        
        # Notify you about new subscriber
        try:
            owner_msg = Message(
                subject=f'🎉 New Newsletter Subscriber: {email}',
                recipients=[app.config['PORTFOLIO_OWNER_EMAIL']],
                body=f"""
New subscriber details:
 
Email: {email}
Name: {name or 'Not provided'}
Source: {source}
Time: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC
 
Total subscribers: {len(subscribers)}
                """
            )
            mail.send(owner_msg)
        except Exception as e:
            print(f"⚠️  Warning: Failed to send notification: {e}")
        
        return jsonify({
            'message': 'Successfully subscribed! Check your email for a welcome message.',
            'subscribed': True
        }), 201
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({'error': 'Subscription failed. Please try again later.'}), 500
 
@app.route('/api/unsubscribe', methods=['POST'])
def unsubscribe():
    """Unsubscribe endpoint"""
    try:
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        if email not in subscribers:
            return jsonify({'message': 'Email not found in our records'}), 404
        
        subscribers.remove(email)
        save_subscribers()
        
        return jsonify({'message': 'Successfully unsubscribed'}), 200
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({'error': 'Failed to unsubscribe'}), 500

@app.route('/api/contact', methods=['POST'])
def contact():
    """Contact form endpoint"""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        message = data.get('message', '').strip()
        subject = data.get('subject', '').strip()
        
        # Validate inputs
        if not name or not email or not message:
            return jsonify({'error': 'Name, email, and message are required'}), 400
        
        if not is_valid_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Send email to portfolio owner
        try:
            owner_msg = Message(
                subject=f'📧 New Contact Form Message from {name}',
                recipients=[app.config['PORTFOLIO_OWNER_EMAIL']],
                reply_to=email,
                body=f"""
New contact form submission:
 
From: {name}
Email: {email}
Subject: {subject or 'No subject'}
 
Message:
{message}
 
---
Sent from your portfolio contact form
Time: {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC
                """,
                html=f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">📧 New Contact Message</h1>
        </div>
        
        <div style="padding: 30px;">
            <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin-bottom: 20px; border-radius: 4px;">
                <p style="margin: 0 0 10px 0; color: #1e293b; font-size: 14px;"><strong>From:</strong> {name}</p>
                <p style="margin: 0 0 10px 0; color: #1e293b; font-size: 14px;"><strong>Email:</strong> <a href="mailto:{email}" style="color: #0ea5e9;">{email}</a></p>
                <p style="margin: 0; color: #1e293b; font-size: 14px;"><strong>Subject:</strong> {subject or 'No subject'}</p>
            </div>
            
            <div style="margin-top: 20px;">
                <p style="margin: 0 0 10px 0; color: #1e293b; font-size: 14px; font-weight: 600;">Message:</p>
                <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; border: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #475569; font-size: 14px; white-space: pre-wrap;">{message}</p>
                </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                    Sent from your portfolio contact form<br/>
                    {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC
                </p>
            </div>
        </div>
    </div>
</body>
</html>
                """
            )
            mail.send(owner_msg)
        except Exception as e:
            print(f"❌ Error sending contact email: {e}")
            return jsonify({'error': 'Failed to send message. Please try again later.'}), 500
        
        # Send confirmation email to sender
        try:
            confirmation_msg = Message(
                subject='Thank you for contacting me! 🙏',
                recipients=[email],
                body=f"""
Hi {name},
 
Thank you for reaching out! I've received your message and will get back to you as soon as possible.
 
Your message:
{message}
 
Best regards,
Your Name
                """,
                html=f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; background-color: #f0f9ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); padding: 40px 30px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Thank You! 🙏</h1>
        </div>
        
        <div style="padding: 40px 30px;">
            <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi <strong>{name}</strong>,
            </p>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                Thank you for reaching out! I've received your message and will get back to you as soon as possible.
            </p>
            
            <div style="background-color: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 30px 0; border-radius: 4px;">
                <p style="color: #1e293b; font-size: 14px; font-weight: 600; margin: 0 0 10px 0;">Your message:</p>
                <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">{message}</p>
            </div>
            
            <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                Best regards,<br/>
                <strong style="color: #0ea5e9;">Your Name</strong>
            </p>
        </div>
        
        <div style="background-color: #f8fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                This is an automated confirmation. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html>
                """
            )
            mail.send(confirmation_msg)
        except Exception as e:
            print(f"⚠️  Warning: Failed to send confirmation email: {e}")
        
        return jsonify({
            'message': 'Message sent successfully! I will get back to you soon.',
            'success': True
        }), 200
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({'error': 'Failed to send message. Please try again later.'}), 500
 
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    debug = os.environ.get('FLASK_ENV') == 'development'
    print(f"🚀 Simple backend starting on port {port}")
    print(f"📧 Email notifications: {'enabled' if app.config['MAIL_USERNAME'] else 'disabled'}")
    print(f"👥 Current subscribers: {len(subscribers)}")
    app.run(debug=debug, host='0.0.0.0', port=port)

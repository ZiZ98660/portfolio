"""
Email service for sending subscription emails
"""
from flask import current_app
from flask_mail import Message
from datetime import datetime
from utils.email_templates import (
    get_welcome_email_html,
    get_welcome_email_text,
    get_new_subscriber_notification_html,
    get_contact_message_email_html,
    get_contact_confirmation_email_html
)


def send_welcome_email(subscriber_email: str, subscriber_name: str = None):
    """
    Send a welcome email to a new subscriber
    """
    try:
        mail = current_app.extensions.get('mail')
        if not mail:
            print("⚠️  Flask-Mail not configured. Skipping email send.")
            return False
        
        portfolio_owner_name = current_app.config.get('PORTFOLIO_OWNER_NAME', 'Ademola Adesina')
        
        # Create message
        msg = Message(
            subject='🎉 Welcome to My Portfolio Updates!',
            recipients=[subscriber_email],
            html=get_welcome_email_html(subscriber_name or 'there', portfolio_owner_name),
            body=get_welcome_email_text(subscriber_name or 'there', portfolio_owner_name)
        )
        
        # Send email
        mail.send(msg)
        print(f"✅ Welcome email sent to {subscriber_email}")
        return True
    except Exception as e:
        print(f"❌ Error sending welcome email to {subscriber_email}: {str(e)}")
        return False


def send_new_subscriber_notification(subscriber_email: str, subscriber_name: str = None, source: str = None):
    """
    Send a notification email to the portfolio owner when someone subscribes
    """
    try:
        mail = current_app.extensions.get('mail')
        if not mail:
            print("⚠️  Flask-Mail not configured. Skipping notification email.")
            return False
        
        owner_email = current_app.config.get('PORTFOLIO_OWNER_EMAIL')
        if not owner_email:
            print("⚠️  PORTFOLIO_OWNER_EMAIL not configured. Skipping notification.")
            return False
        
        # Replace placeholder with actual time
        html_content = get_new_subscriber_notification_html(
            subscriber_email, 
            subscriber_name, 
            source
        ).replace('{{ current_time }}', datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC'))
        
        # Create message
        msg = Message(
            subject=f'🎉 New Subscriber: {subscriber_email}',
            recipients=[owner_email],
            html=html_content
        )
        
        # Send email
        mail.send(msg)
        print(f"✅ New subscriber notification sent to {owner_email}")
        return True
    except Exception as e:
        print(f"❌ Error sending notification email: {str(e)}")
        return False


def send_contact_message_email(sender_name: str, sender_email: str, subject: str, message: str):
    """
    Send contact form message to portfolio owner
    """
    try:
        mail = current_app.extensions.get('mail')
        if not mail:
            print("⚠️  Flask-Mail not configured. Skipping email send.")
            return False
        
        owner_email = current_app.config.get('PORTFOLIO_OWNER_EMAIL')
        if not owner_email:
            print("⚠️  PORTFOLIO_OWNER_EMAIL not configured. Skipping email.")
            return False
        
        portfolio_owner_name = current_app.config.get('PORTFOLIO_OWNER_NAME', 'Ademola Adesina')
        
        # Create message for portfolio owner
        msg = Message(
            subject=f'📧 New Contact: {subject}',
            recipients=[owner_email],
            reply_to=sender_email,
            html=get_contact_message_email_html(sender_name, sender_email, subject, message, portfolio_owner_name)
        )
        
        mail.send(msg)
        print(f"✅ Contact message email sent to {owner_email}")
        return True
    except Exception as e:
        print(f"❌ Error sending contact message email: {str(e)}")
        return False


def send_contact_confirmation_email(sender_name: str, sender_email: str, subject: str):
    """
    Send confirmation email to the person who submitted the contact form
    """
    try:
        mail = current_app.extensions.get('mail')
        if not mail:
            print("⚠️  Flask-Mail not configured. Skipping confirmation email.")
            return False
        
        portfolio_owner_name = current_app.config.get('PORTFOLIO_OWNER_NAME', 'Ademola Adesina')
        
        # Create confirmation message
        msg = Message(
            subject='✅ Message Received - Thank You!',
            recipients=[sender_email],
            html=get_contact_confirmation_email_html(sender_name, subject, portfolio_owner_name)
        )
        
        mail.send(msg)
        print(f"✅ Contact confirmation email sent to {sender_email}")
        return True
    except Exception as e:
        print(f"❌ Error sending contact confirmation email: {str(e)}")
        return False


from models import db
from datetime import datetime

class ContactMessage(db.Model):
    """Model for contact form messages"""
    __tablename__ = 'contact_messages'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False, index=True)
    subject = db.Column(db.String(300), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    is_read = db.Column(db.Boolean, default=False, nullable=False)
    replied_at = db.Column(db.DateTime, nullable=True)
    
    def to_dict(self):
        """Convert contact message to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'subject': self.subject,
            'message': self.message,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'is_read': self.is_read,
            'replied_at': self.replied_at.isoformat() if self.replied_at else None
        }
    
    def __repr__(self):
        return f'<ContactMessage {self.email} - {self.subject}>'


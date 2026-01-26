from models import db
from datetime import datetime

class Subscription(db.Model):
    """Model for newsletter subscriptions"""
    __tablename__ = 'subscriptions'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200), unique=True, nullable=False, index=True)
    name = db.Column(db.String(200), nullable=True)  # Optional name field
    subscribed_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    unsubscribed_at = db.Column(db.DateTime, nullable=True)
    source = db.Column(db.String(100), nullable=True)  # Track where subscription came from (footer, projects, etc.)
    
    def to_dict(self):
        """Convert subscription to dictionary"""
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'subscribed_at': self.subscribed_at.isoformat() if self.subscribed_at else None,
            'is_active': self.is_active,
            'unsubscribed_at': self.unsubscribed_at.isoformat() if self.unsubscribed_at else None,
            'source': self.source
        }
    
    def __repr__(self):
        return f'<Subscription {self.email}>'


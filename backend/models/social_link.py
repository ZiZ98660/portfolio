from . import db
from datetime import datetime

class SocialLink(db.Model):
    """Social links model"""
    __tablename__ = 'social_links'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)  # GitHub, LinkedIn, etc.
    url = db.Column(db.String(500), nullable=False)
    icon = db.Column(db.String(100), nullable=False)  # FontAwesome icon name
    order = db.Column(db.Integer, default=0)  # For ordering
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'url': self.url,
            'icon': self.icon,
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


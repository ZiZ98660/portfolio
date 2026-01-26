from . import db
from datetime import datetime

class PersonalInfo(db.Model):
    """Personal information model (single record)"""
    __tablename__ = 'personal_info'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    title = db.Column(db.String(500), nullable=False)
    tagline = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    profile_image = db.Column(db.String(500))  # Profile picture URL
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'title': self.title,
            'tagline': self.tagline,
            'email': self.email,
            'phone': self.phone,
            'location': self.location,
            'profile_image': self.profile_image,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


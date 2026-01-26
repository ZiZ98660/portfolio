from . import db
from datetime import datetime

class Experience(db.Model):
    """Work experience model"""
    __tablename__ = 'experiences'
    
    id = db.Column(db.Integer, primary_key=True)
    company = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(200), nullable=False)
    period = db.Column(db.String(100), nullable=False)  # e.g., "2025–Present"
    achievements = db.Column(db.JSON)  # Array of achievement strings
    order = db.Column(db.Integer, default=0)  # For ordering
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'company': self.company,
            'location': self.location,
            'role': self.role,
            'period': self.period,
            'achievements': self.achievements or [],
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


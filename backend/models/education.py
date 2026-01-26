from . import db
from datetime import datetime

class Education(db.Model):
    """Education model"""
    __tablename__ = 'educations'
    
    id = db.Column(db.Integer, primary_key=True)
    degree = db.Column(db.String(200), nullable=False)
    institution = db.Column(db.String(200), nullable=False)
    period = db.Column(db.String(100), nullable=False)  # e.g., "2025-2026"
    type = db.Column(db.String(50), nullable=False)  # degree, diploma, certificate
    order = db.Column(db.Integer, default=0)  # For ordering
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'degree': self.degree,
            'institution': self.institution,
            'period': self.period,
            'type': self.type,
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


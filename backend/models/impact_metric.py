from . import db
from datetime import datetime

class ImpactMetric(db.Model):
    """Impact metrics model"""
    __tablename__ = 'impact_metrics'
    
    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.Integer, nullable=False)
    suffix = db.Column(db.String(10), default='%')  # %, +, etc.
    label = db.Column(db.String(500), nullable=False)
    color = db.Column(db.String(100))  # Tailwind gradient classes
    order = db.Column(db.Integer, default=0)  # For ordering
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            'id': self.id,
            'value': self.value,
            'suffix': self.suffix,
            'label': self.label,
            'color': self.color,
            'order': self.order,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


from . import db
from datetime import datetime

class Project(db.Model):
    """Project model for portfolio projects"""
    __tablename__ = 'projects'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    short_description = db.Column(db.String(500))
    
    # Media URLs
    thumbnail_image = db.Column(db.String(500))  # Main project image
    screenshots = db.Column(db.JSON)  # Array of screenshot URLs
    video_url = db.Column(db.String(500))  # Video URL (can be YouTube, Vimeo, or uploaded)
    video_file = db.Column(db.String(500))  # Uploaded video file path
    
    # Links
    live_link = db.Column(db.String(500))
    github_link = db.Column(db.String(500))
    demo_link = db.Column(db.String(500))
    
    # Project details
    technologies = db.Column(db.JSON)  # Array of tech stack
    category = db.Column(db.String(100))  # e.g., 'web', 'mobile', 'desktop'
    featured = db.Column(db.Boolean, default=False)
    
    # Status
    status = db.Column(db.String(50), default='published')  # draft, published, archived
    
    # Timestamps
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert project to dictionary"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'short_description': self.short_description,
            'thumbnail_image': self.thumbnail_image,
            'screenshots': self.screenshots or [],
            'video_url': self.video_url,
            'video_file': self.video_file,
            'live_link': self.live_link,
            'github_link': self.github_link,
            'demo_link': self.demo_link,
            'technologies': self.technologies or [],
            'category': self.category,
            'featured': self.featured,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }


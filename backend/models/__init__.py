from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .project import Project
from .admin import Admin
from .personal_info import PersonalInfo
from .impact_metric import ImpactMetric
from .technical_skill import TechnicalSkill
from .experience import Experience
from .education import Education
from .certification import Certification
from .social_link import SocialLink
from .subscription import Subscription
from .contact_message import ContactMessage


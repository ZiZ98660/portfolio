from flask import Blueprint

# Create blueprints
admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')
public_bp = Blueprint('public', __name__, url_prefix='/api')

from .admin_routes import *
from .public_routes import *


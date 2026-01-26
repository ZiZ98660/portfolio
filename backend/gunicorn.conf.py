"""Gunicorn configuration file"""
import os

# Get PORT from environment variable
port = os.environ.get('PORT', '5001')
print(f"🔍 Gunicorn config: PORT environment variable = {port}")
print(f"🔍 Gunicorn config: Binding to 0.0.0.0:{port}")

# Bind to the port specified by Render (or default to 5001 for local)
bind = f"0.0.0.0:{port}"

# Worker configuration
workers = 2
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2

# Logging
accesslog = "-"  # Log to stdout
errorlog = "-"  # Log to stderr
loglevel = "info"

# Process naming
proc_name = "portfolio_backend"

# Server mechanics
daemon = False
pidfile = None
umask = 0
user = None
group = None
tmp_upload_dir = None

# SSL (if needed in future)
# keyfile = None
# certfile = None


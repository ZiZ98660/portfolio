import os
from werkzeug.utils import secure_filename
from PIL import Image
from flask import current_app
import uuid
from datetime import datetime

# Cloudinary import (optional)
try:
    import cloudinary
    import cloudinary.uploader
    import cloudinary.api
    CLOUDINARY_AVAILABLE = True
except ImportError:
    CLOUDINARY_AVAILABLE = False

ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'}
ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'webm', 'ogg', 'mov'}

def allowed_file(filename, file_type='image'):
    """Check if file extension is allowed"""
    if file_type == 'image':
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS
    elif file_type == 'video':
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_VIDEO_EXTENSIONS
    return False

def _init_cloudinary():
    """Initialize Cloudinary if configured"""
    if not CLOUDINARY_AVAILABLE:
        return False
    
    use_cloudinary = os.environ.get('USE_CLOUDINARY', 'false').lower() == 'true'
    if not use_cloudinary:
        return False
    
    cloud_name = os.environ.get('CLOUDINARY_CLOUD_NAME')
    api_key = os.environ.get('CLOUDINARY_API_KEY')
    api_secret = os.environ.get('CLOUDINARY_API_SECRET')
    
    if not all([cloud_name, api_key, api_secret]):
        return False
    
    cloudinary.config(
        cloud_name=cloud_name,
        api_key=api_key,
        api_secret=api_secret
    )
    return True

def save_image(file, folder='projects'):
    """Save uploaded image and return the file path or Cloudinary URL"""
    if not file or not allowed_file(file.filename, 'image'):
        return None
    
    # Try Cloudinary first if configured
    if _init_cloudinary():
        try:
            # Read file content
            file.seek(0)
            file_content = file.read()
            file.seek(0)  # Reset for local save if needed
            
            # Upload to Cloudinary
            result = cloudinary.uploader.upload(
                file_content,
                folder=f"portfolio/{folder}",
                resource_type="image",
                transformation=[
                    {'width': 1920, 'height': 1080, 'crop': 'limit', 'quality': 'auto:good'}
                ]
            )
            return result['secure_url']
        except Exception as e:
            print(f"Cloudinary upload failed, falling back to local: {e}")
    
    # Fallback to local storage
    filename = secure_filename(file.filename)
    ext = filename.rsplit('.', 1)[1].lower()
    unique_filename = f"{uuid.uuid4()}.{ext}"
    
    # Create directory if it doesn't exist
    upload_folder = os.path.join(current_app.config['UPLOAD_FOLDER'], folder)
    os.makedirs(upload_folder, exist_ok=True)
    
    # Save file
    filepath = os.path.join(upload_folder, unique_filename)
    file.save(filepath)
    
    # Optimize image if it's too large
    try:
        img = Image.open(filepath)
        # Resize if width > 1920px
        if img.width > 1920:
            img.thumbnail((1920, 1080), Image.Resampling.LANCZOS)
            img.save(filepath, optimize=True, quality=85)
    except Exception as e:
        print(f"Error optimizing image: {e}")
    
    # Return relative path for URL
    return f"uploads/{folder}/{unique_filename}"

def save_video(file, folder='videos'):
    """Save uploaded video and return the file path or Cloudinary URL"""
    if not file or not allowed_file(file.filename, 'video'):
        return None
    
    # Try Cloudinary first if configured
    if _init_cloudinary():
        try:
            # Read file content
            file.seek(0)
            file_content = file.read()
            file.seek(0)  # Reset for local save if needed
            
            # Upload to Cloudinary
            result = cloudinary.uploader.upload(
                file_content,
                folder=f"portfolio/{folder}",
                resource_type="video",
                chunk_size=6000000  # 6MB chunks for large videos
            )
            return result['secure_url']
        except Exception as e:
            print(f"Cloudinary upload failed, falling back to local: {e}")
    
    # Fallback to local storage
    filename = secure_filename(file.filename)
    ext = filename.rsplit('.', 1)[1].lower()
    unique_filename = f"{uuid.uuid4()}.{ext}"
    
    # Create directory if it doesn't exist
    upload_folder = os.path.join(current_app.config['UPLOAD_FOLDER'], folder)
    os.makedirs(upload_folder, exist_ok=True)
    
    # Save file
    filepath = os.path.join(upload_folder, unique_filename)
    file.save(filepath)
    
    # Return relative path for URL
    return f"uploads/{folder}/{unique_filename}"

def delete_file(filepath):
    """Delete a file from uploads folder or Cloudinary"""
    # Check if it's a Cloudinary URL
    if filepath and ('cloudinary.com' in filepath or 'res.cloudinary.com' in filepath):
        if _init_cloudinary():
            try:
                # Extract public_id from Cloudinary URL
                # Format: https://res.cloudinary.com/cloud_name/image/upload/v1234567/folder/filename.jpg
                parts = filepath.split('/')
                if 'upload' in parts:
                    upload_index = parts.index('upload')
                    if upload_index + 1 < len(parts):
                        # Get everything after 'upload' (skip version if present)
                        public_id_parts = parts[upload_index + 1:]
                        if public_id_parts[0].startswith('v'):
                            public_id_parts = public_id_parts[1:]  # Skip version
                        public_id = '/'.join(public_id_parts).rsplit('.', 1)[0]  # Remove extension
                        
                        # Determine resource type
                        resource_type = 'image' if any(ext in filepath for ext in ['.jpg', '.png', '.gif', '.webp']) else 'video'
                        
                        cloudinary.uploader.destroy(public_id, resource_type=resource_type)
                        return True
            except Exception as e:
                print(f"Error deleting from Cloudinary: {e}")
        return False
    
    # Local file deletion
    try:
        full_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filepath.replace('uploads/', ''))
        if os.path.exists(full_path):
            os.remove(full_path)
            return True
    except Exception as e:
        print(f"Error deleting file: {e}")
    return False


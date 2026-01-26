from flask import request, jsonify, send_from_directory
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.exceptions import BadRequest
import os
from datetime import datetime, timedelta

from routes import admin_bp
from models import (
    db, Project, Admin, PersonalInfo, ImpactMetric, TechnicalSkill,
    Experience, Education, Certification, SocialLink
)
from models.admin import bcrypt
from utils.file_upload import save_image, save_video, delete_file

# Admin Authentication
@admin_bp.route('/login', methods=['POST'])
def admin_login():
    """Admin login endpoint"""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400
    
    admin = Admin.query.filter_by(username=username).first()
    
    if not admin or not admin.check_password(password) or not admin.is_active:
        return jsonify({'error': 'Invalid credentials'}), 401
    
    # Update last login
    admin.last_login = datetime.utcnow()
    db.session.commit()
    
    # Create access token (expires in 24 hours)
    access_token = create_access_token(
        identity=admin.id,
        expires_delta=timedelta(hours=24)
    )
    
    return jsonify({
        'access_token': access_token,
        'admin': admin.to_dict()
    }), 200

@admin_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_admin():
    """Get current admin info"""
    admin_id = get_jwt_identity()
    admin = Admin.query.get(admin_id)
    
    if not admin:
        return jsonify({'error': 'Admin not found'}), 404
    
    return jsonify(admin.to_dict()), 200

# Project Management
@admin_bp.route('/projects', methods=['GET'])
@jwt_required()
def get_all_projects():
    """Get all projects (admin view - includes drafts)"""
    projects = Project.query.order_by(Project.created_at.desc()).all()
    return jsonify([project.to_dict() for project in projects]), 200

@admin_bp.route('/projects', methods=['POST'])
@jwt_required()
def create_project():
    """Create a new project"""
    try:
        data = request.form.to_dict()
        
        # Handle JSON data if sent as JSON
        if request.is_json:
            data = request.get_json()
        
        # Create project
        project = Project(
            title=data.get('title'),
            description=data.get('description'),
            short_description=data.get('short_description', ''),
            live_link=data.get('live_link'),
            github_link=data.get('github_link'),
            demo_link=data.get('demo_link'),
            video_url=data.get('video_url'),
            technologies=data.get('technologies', []),
            category=data.get('category', 'web'),
            featured=data.get('featured', False),
            status=data.get('status', 'draft')
        )
        
        # Handle file uploads
        if 'thumbnail' in request.files:
            thumbnail_file = request.files['thumbnail']
            if thumbnail_file and thumbnail_file.filename:
                project.thumbnail_image = save_image(thumbnail_file, 'projects')
        
        if 'video' in request.files:
            video_file = request.files['video']
            if video_file and video_file.filename:
                project.video_file = save_video(video_file, 'videos')
        
        # Handle screenshots (multiple files)
        if 'screenshots' in request.files:
            screenshots = request.files.getlist('screenshots')
            screenshot_paths = []
            for screenshot in screenshots:
                if screenshot and screenshot.filename:
                    path = save_image(screenshot, 'screenshots')
                    if path:
                        screenshot_paths.append(path)
            project.screenshots = screenshot_paths
        
        db.session.add(project)
        db.session.commit()
        
        return jsonify(project.to_dict()), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/projects/<int:project_id>', methods=['GET'])
@jwt_required()
def get_project(project_id):
    """Get a specific project"""
    project = Project.query.get_or_404(project_id)
    return jsonify(project.to_dict()), 200

@admin_bp.route('/projects/<int:project_id>', methods=['PUT'])
@jwt_required()
def update_project(project_id):
    """Update a project"""
    project = Project.query.get_or_404(project_id)
    
    try:
        data = request.form.to_dict()
        
        if request.is_json:
            data = request.get_json()
        
        # Update fields
        if 'title' in data:
            project.title = data['title']
        if 'description' in data:
            project.description = data['description']
        if 'short_description' in data:
            project.short_description = data.get('short_description', '')
        if 'live_link' in data:
            project.live_link = data['live_link']
        if 'github_link' in data:
            project.github_link = data['github_link']
        if 'demo_link' in data:
            project.demo_link = data['demo_link']
        if 'video_url' in data:
            project.video_url = data['video_url']
        if 'technologies' in data:
            project.technologies = data['technologies']
        if 'category' in data:
            project.category = data['category']
        if 'featured' in data:
            project.featured = data['featured']
        if 'status' in data:
            project.status = data['status']
        
        # Handle file uploads
        if 'thumbnail' in request.files:
            thumbnail_file = request.files['thumbnail']
            if thumbnail_file and thumbnail_file.filename:
                # Delete old thumbnail if exists
                if project.thumbnail_image:
                    delete_file(project.thumbnail_image)
                project.thumbnail_image = save_image(thumbnail_file, 'projects')
        
        if 'video' in request.files:
            video_file = request.files['video']
            if video_file and video_file.filename:
                # Delete old video if exists
                if project.video_file:
                    delete_file(project.video_file)
                project.video_file = save_video(video_file, 'videos')
        
        # Handle screenshots
        if 'screenshots' in request.files:
            screenshots = request.files.getlist('screenshots')
            screenshot_paths = project.screenshots or []
            for screenshot in screenshots:
                if screenshot and screenshot.filename:
                    path = save_image(screenshot, 'screenshots')
                    if path:
                        screenshot_paths.append(path)
            project.screenshots = screenshot_paths
        
        project.updated_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify(project.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/projects/<int:project_id>', methods=['DELETE'])
@jwt_required()
def delete_project(project_id):
    """Delete a project"""
    project = Project.query.get_or_404(project_id)
    
    try:
        # Delete associated files
        if project.thumbnail_image:
            delete_file(project.thumbnail_image)
        if project.video_file:
            delete_file(project.video_file)
        if project.screenshots:
            for screenshot in project.screenshots:
                delete_file(screenshot)
        
        db.session.delete(project)
        db.session.commit()
        
        return jsonify({'message': 'Project deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/projects/<int:project_id>/screenshots/<int:screenshot_index>', methods=['DELETE'])
@jwt_required()
def delete_screenshot(project_id, screenshot_index):
    """Delete a specific screenshot from a project"""
    project = Project.query.get_or_404(project_id)
    
    if not project.screenshots or screenshot_index >= len(project.screenshots):
        return jsonify({'error': 'Screenshot not found'}), 404
    
    screenshot_path = project.screenshots[screenshot_index]
    delete_file(screenshot_path)
    
    project.screenshots.pop(screenshot_index)
    db.session.commit()
    
    return jsonify(project.to_dict()), 200

# ==================== Personal Info Management ====================
@admin_bp.route('/personal-info', methods=['GET'])
@jwt_required()
def get_personal_info():
    """Get personal information (should be single record)"""
    info = PersonalInfo.query.first()
    if not info:
        return jsonify({'error': 'Personal info not found'}), 404
    return jsonify(info.to_dict()), 200

@admin_bp.route('/personal-info', methods=['POST', 'PUT'])
@jwt_required()
def update_personal_info():
    """Create or update personal information"""
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    info = PersonalInfo.query.first()
    
    if not info:
        # Create new
        info = PersonalInfo(
            name=data.get('name'),
            title=data.get('title'),
            tagline=data.get('tagline'),
            email=data.get('email'),
            phone=data.get('phone'),
            location=data.get('location'),
        )
        db.session.add(info)
    else:
        # Update existing
        if 'name' in data:
            info.name = data['name']
        if 'title' in data:
            info.title = data['title']
        if 'tagline' in data:
            info.tagline = data['tagline']
        if 'email' in data:
            info.email = data['email']
        if 'phone' in data:
            info.phone = data['phone']
        if 'location' in data:
            info.location = data['location']
    
    # Handle profile image upload
    if 'profile_image' in request.files:
        image_file = request.files['profile_image']
        if image_file and image_file.filename:
            if info.profile_image:
                delete_file(info.profile_image)
            saved_path = save_image(image_file, 'profile')
            if saved_path:
                info.profile_image = saved_path
    
    if 'profile_image' in data and not request.files:
        info.profile_image = data.get('profile_image')
    
    try:
        db.session.commit()
        return jsonify(info.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# ==================== Impact Metrics Management ====================
@admin_bp.route('/impact-metrics', methods=['GET'])
@jwt_required()
def get_impact_metrics():
    """Get all impact metrics"""
    metrics = ImpactMetric.query.order_by(ImpactMetric.order.asc()).all()
    return jsonify([m.to_dict() for m in metrics]), 200

@admin_bp.route('/impact-metrics', methods=['POST'])
@jwt_required()
def create_impact_metric():
    """Create a new impact metric"""
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    metric = ImpactMetric(
        value=data.get('value'),
        suffix=data.get('suffix', '%'),
        label=data.get('label'),
        color=data.get('color'),
        order=data.get('order', 0)
    )
    
    try:
        db.session.add(metric)
        db.session.commit()
        return jsonify(metric.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/impact-metrics/<int:metric_id>', methods=['PUT'])
@jwt_required()
def update_impact_metric(metric_id):
    """Update an impact metric"""
    metric = ImpactMetric.query.get_or_404(metric_id)
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    if 'value' in data:
        metric.value = data['value']
    if 'suffix' in data:
        metric.suffix = data['suffix']
    if 'label' in data:
        metric.label = data['label']
    if 'color' in data:
        metric.color = data['color']
    if 'order' in data:
        metric.order = data['order']
    
    try:
        db.session.commit()
        return jsonify(metric.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/impact-metrics/<int:metric_id>', methods=['DELETE'])
@jwt_required()
def delete_impact_metric(metric_id):
    """Delete an impact metric"""
    metric = ImpactMetric.query.get_or_404(metric_id)
    
    try:
        db.session.delete(metric)
        db.session.commit()
        return jsonify({'message': 'Metric deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# ==================== Technical Skills Management ====================
@admin_bp.route('/technical-skills', methods=['GET'])
@jwt_required()
def get_technical_skills():
    """Get all technical skills"""
    skills = TechnicalSkill.query.order_by(TechnicalSkill.category.asc(), TechnicalSkill.order.asc()).all()
    return jsonify([s.to_dict() for s in skills]), 200

@admin_bp.route('/technical-skills', methods=['POST'])
@jwt_required()
def create_technical_skill():
    """Create a new technical skill"""
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    skill = TechnicalSkill(
        name=data.get('name'),
        category=data.get('category'),
        order=data.get('order', 0)
    )
    
    try:
        db.session.add(skill)
        db.session.commit()
        return jsonify(skill.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/technical-skills/<int:skill_id>', methods=['PUT'])
@jwt_required()
def update_technical_skill(skill_id):
    """Update a technical skill"""
    skill = TechnicalSkill.query.get_or_404(skill_id)
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    if 'name' in data:
        skill.name = data['name']
    if 'category' in data:
        skill.category = data['category']
    if 'order' in data:
        skill.order = data['order']
    
    try:
        db.session.commit()
        return jsonify(skill.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/technical-skills/<int:skill_id>', methods=['DELETE'])
@jwt_required()
def delete_technical_skill(skill_id):
    """Delete a technical skill"""
    skill = TechnicalSkill.query.get_or_404(skill_id)
    
    try:
        db.session.delete(skill)
        db.session.commit()
        return jsonify({'message': 'Skill deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# ==================== Experience Management ====================
@admin_bp.route('/experiences', methods=['GET'])
@jwt_required()
def get_experiences():
    """Get all experiences"""
    experiences = Experience.query.order_by(Experience.order.asc()).all()
    return jsonify([e.to_dict() for e in experiences]), 200

@admin_bp.route('/experiences', methods=['POST'])
@jwt_required()
def create_experience():
    """Create a new experience"""
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    experience = Experience(
        company=data.get('company'),
        location=data.get('location'),
        role=data.get('role'),
        period=data.get('period'),
        achievements=data.get('achievements', []),
        order=data.get('order', 0)
    )
    
    try:
        db.session.add(experience)
        db.session.commit()
        return jsonify(experience.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/experiences/<int:exp_id>', methods=['PUT'])
@jwt_required()
def update_experience(exp_id):
    """Update an experience"""
    experience = Experience.query.get_or_404(exp_id)
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    if 'company' in data:
        experience.company = data['company']
    if 'location' in data:
        experience.location = data['location']
    if 'role' in data:
        experience.role = data['role']
    if 'period' in data:
        experience.period = data['period']
    if 'achievements' in data:
        experience.achievements = data['achievements']
    if 'order' in data:
        experience.order = data['order']
    
    try:
        db.session.commit()
        return jsonify(experience.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/experiences/<int:exp_id>', methods=['DELETE'])
@jwt_required()
def delete_experience(exp_id):
    """Delete an experience"""
    experience = Experience.query.get_or_404(exp_id)
    
    try:
        db.session.delete(experience)
        db.session.commit()
        return jsonify({'message': 'Experience deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# ==================== Education Management ====================
@admin_bp.route('/educations', methods=['GET'])
@jwt_required()
def get_educations():
    """Get all educations"""
    educations = Education.query.order_by(Education.order.asc()).all()
    return jsonify([e.to_dict() for e in educations]), 200

@admin_bp.route('/educations', methods=['POST'])
@jwt_required()
def create_education():
    """Create a new education"""
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    education = Education(
        degree=data.get('degree'),
        institution=data.get('institution'),
        period=data.get('period'),
        type=data.get('type'),
        order=data.get('order', 0)
    )
    
    try:
        db.session.add(education)
        db.session.commit()
        return jsonify(education.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/educations/<int:edu_id>', methods=['PUT'])
@jwt_required()
def update_education(edu_id):
    """Update an education"""
    education = Education.query.get_or_404(edu_id)
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    if 'degree' in data:
        education.degree = data['degree']
    if 'institution' in data:
        education.institution = data['institution']
    if 'period' in data:
        education.period = data['period']
    if 'type' in data:
        education.type = data['type']
    if 'order' in data:
        education.order = data['order']
    
    try:
        db.session.commit()
        return jsonify(education.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/educations/<int:edu_id>', methods=['DELETE'])
@jwt_required()
def delete_education(edu_id):
    """Delete an education"""
    education = Education.query.get_or_404(edu_id)
    
    try:
        db.session.delete(education)
        db.session.commit()
        return jsonify({'message': 'Education deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# ==================== Certification Management ====================
@admin_bp.route('/certifications', methods=['GET'])
@jwt_required()
def get_certifications():
    """Get all certifications"""
    certifications = Certification.query.order_by(Certification.order.asc()).all()
    return jsonify([c.to_dict() for c in certifications]), 200

@admin_bp.route('/certifications', methods=['POST'])
@jwt_required()
def create_certification():
    """Create a new certification"""
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    certification = Certification(
        name=data.get('name'),
        issuer=data.get('issuer'),
        order=data.get('order', 0)
    )
    
    try:
        db.session.add(certification)
        db.session.commit()
        return jsonify(certification.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/certifications/<int:cert_id>', methods=['PUT'])
@jwt_required()
def update_certification(cert_id):
    """Update a certification"""
    certification = Certification.query.get_or_404(cert_id)
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    if 'name' in data:
        certification.name = data['name']
    if 'issuer' in data:
        certification.issuer = data['issuer']
    if 'order' in data:
        certification.order = data['order']
    
    try:
        db.session.commit()
        return jsonify(certification.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/certifications/<int:cert_id>', methods=['DELETE'])
@jwt_required()
def delete_certification(cert_id):
    """Delete a certification"""
    certification = Certification.query.get_or_404(cert_id)
    
    try:
        db.session.delete(certification)
        db.session.commit()
        return jsonify({'message': 'Certification deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# ==================== Social Links Management ====================
def is_placeholder_url(url):
    """Check if URL is a placeholder"""
    if not url or not isinstance(url, str):
        return True
    
    url_lower = url.strip().lower()
    
    # Common placeholder patterns
    placeholder_patterns = [
        '#',
        'http://',
        'https://',
        'http://#',
        'https://#',
        'example.com',
        'placeholder.com',
        'your-url',
        'your-url-here',
        'add-your-url',
        'insert-url-here',
        'url-here',
        'link-here',
        'https://example.com',
        'https://placeholder.com',
        'https://your-url.com',
        'mailto:example.com',
        'mailto:your-email',
    ]
    
    # Check for exact matches or if URL is just a placeholder pattern
    for pattern in placeholder_patterns:
        if url_lower == pattern or url_lower.endswith(pattern):
            return True
    
    # Check if URL is just a single character (like '#')
    if len(url_lower) <= 2 and url_lower in ['#', '##']:
        return True
    
    # Check if it's a mailto with placeholder email
    if url_lower.startswith('mailto:'):
        email_part = url_lower.replace('mailto:', '')
        if any(placeholder in email_part for placeholder in ['example', 'placeholder', 'your-email', 'your@email']):
            return True
    
    return False

@admin_bp.route('/social-links', methods=['GET'])
@jwt_required()
def get_social_links():
    """Get all social links"""
    links = SocialLink.query.order_by(SocialLink.order.asc()).all()
    return jsonify([l.to_dict() for l in links]), 200

@admin_bp.route('/social-links', methods=['POST'])
@jwt_required()
def create_social_link():
    """Create a new social link"""
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    # Validate URL is not a placeholder
    url = data.get('url', '').strip()
    if is_placeholder_url(url):
        return jsonify({
            'error': 'Please provide a valid URL. Placeholder URLs like "#", "example.com", or "your-url-here" are not allowed.'
        }), 400
    
    link = SocialLink(
        name=data.get('name'),
        url=url,
        icon=data.get('icon'),
        order=data.get('order', 0)
    )
    
    try:
        db.session.add(link)
        db.session.commit()
        return jsonify(link.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/social-links/<int:link_id>', methods=['PUT'])
@jwt_required()
def update_social_link(link_id):
    """Update a social link"""
    link = SocialLink.query.get_or_404(link_id)
    data = request.get_json() if request.is_json else request.form.to_dict()
    
    if 'name' in data:
        link.name = data['name']
    if 'url' in data:
        url = data['url'].strip()
        # Validate URL is not a placeholder
        if is_placeholder_url(url):
            return jsonify({
                'error': 'Please provide a valid URL. Placeholder URLs like "#", "example.com", or "your-url-here" are not allowed.'
            }), 400
        link.url = url
    if 'icon' in data:
        link.icon = data['icon']
    if 'order' in data:
        link.order = data['order']
    
    try:
        db.session.commit()
        return jsonify(link.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@admin_bp.route('/social-links/<int:link_id>', methods=['DELETE'])
@jwt_required()
def delete_social_link(link_id):
    """Delete a social link"""
    link = SocialLink.query.get_or_404(link_id)
    
    try:
        db.session.delete(link)
        db.session.commit()
        return jsonify({'message': 'Social link deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400


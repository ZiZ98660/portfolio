from flask import jsonify, send_from_directory, request
import os

from routes import public_bp
from models import (
    Project, PersonalInfo, ImpactMetric, TechnicalSkill,
    Experience, Education, Certification, SocialLink, Subscription, ContactMessage
)
from models import db
from utils.email_service import (
    send_welcome_email, 
    send_new_subscriber_notification,
    send_contact_message_email,
    send_contact_confirmation_email
)

@public_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "Flask backend is running"})

@public_bp.route('/projects', methods=['GET'])
def get_projects():
    """Get all published projects (public endpoint)"""
    # Query parameters
    featured = request.args.get('featured', type=bool)
    category = request.args.get('category')
    limit = request.args.get('limit', type=int, default=50)
    
    query = Project.query.filter_by(status='published')
    
    if featured:
        query = query.filter_by(featured=True)
    
    if category:
        query = query.filter_by(category=category)
    
    projects = query.order_by(Project.created_at.desc()).limit(limit).all()
    
    return jsonify({
        'count': len(projects),
        'projects': [project.to_dict() for project in projects]
    }), 200

@public_bp.route('/projects/<int:project_id>', methods=['GET'])
def get_project(project_id):
    """Get a specific published project"""
    project = Project.query.filter_by(id=project_id, status='published').first_or_404()
    return jsonify(project.to_dict()), 200

@public_bp.route('/projects/featured', methods=['GET'])
def get_featured_projects():
    """Get featured projects"""
    projects = Project.query.filter_by(
        status='published',
        featured=True
    ).order_by(Project.created_at.desc()).limit(6).all()
    
    return jsonify({
        'count': len(projects),
        'projects': [project.to_dict() for project in projects]
    }), 200

@public_bp.route('/uploads/<path:filename>')
def uploaded_file(filename):
    """Serve uploaded files"""
    upload_folder = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'uploads')
    return send_from_directory(upload_folder, filename)

# ==================== Public Portfolio Data Endpoints ====================
@public_bp.route('/personal-info', methods=['GET'])
def get_personal_info():
    """Get personal information"""
    info = PersonalInfo.query.first()
    if not info:
        return jsonify({'error': 'Personal info not found'}), 404
    return jsonify(info.to_dict()), 200

@public_bp.route('/impact-metrics', methods=['GET'])
def get_impact_metrics():
    """Get all impact metrics"""
    metrics = ImpactMetric.query.order_by(ImpactMetric.order.asc()).all()
    return jsonify([m.to_dict() for m in metrics]), 200

@public_bp.route('/technical-skills', methods=['GET'])
def get_technical_skills():
    """Get all technical skills grouped by category"""
    skills = TechnicalSkill.query.order_by(TechnicalSkill.category.asc(), TechnicalSkill.order.asc()).all()
    
    # Group by category
    grouped = {}
    for skill in skills:
        if skill.category not in grouped:
            grouped[skill.category] = []
        grouped[skill.category].append(skill.name)
    
    return jsonify(grouped), 200

@public_bp.route('/experiences', methods=['GET'])
def get_experiences():
    """Get all experiences"""
    experiences = Experience.query.order_by(Experience.order.asc()).all()
    return jsonify([e.to_dict() for e in experiences]), 200

@public_bp.route('/educations', methods=['GET'])
def get_educations():
    """Get all educations"""
    educations = Education.query.order_by(Education.order.asc()).all()
    return jsonify([e.to_dict() for e in educations]), 200

@public_bp.route('/certifications', methods=['GET'])
def get_certifications():
    """Get all certifications"""
    certifications = Certification.query.order_by(Certification.order.asc()).all()
    return jsonify([c.to_dict() for c in certifications]), 200

@public_bp.route('/social-links', methods=['GET'])
def get_social_links():
    """Get all social links"""
    links = SocialLink.query.order_by(SocialLink.order.asc()).all()
    return jsonify([l.to_dict() for l in links]), 200

@public_bp.route('/portfolio', methods=['GET'])
def get_full_portfolio():
    """Get complete portfolio data in one request"""
    return jsonify({
        'personalInfo': PersonalInfo.query.first().to_dict() if PersonalInfo.query.first() else None,
        'impactMetrics': [m.to_dict() for m in ImpactMetric.query.order_by(ImpactMetric.order.asc()).all()],
        'technicalSkills': {
            category: [s.name for s in TechnicalSkill.query.filter_by(category=category).order_by(TechnicalSkill.order.asc()).all()]
            for category in ['core', 'frontend', 'backend', 'database', 'devops']
        },
        'experiences': [e.to_dict() for e in Experience.query.order_by(Experience.order.asc()).all()],
        'educations': [e.to_dict() for e in Education.query.order_by(Education.order.asc()).all()],
        'certifications': [c.to_dict() for c in Certification.query.order_by(Certification.order.asc()).all()],
        'socialLinks': [l.to_dict() for l in SocialLink.query.order_by(SocialLink.order.asc()).all()],
        'featuredProjects': [p.to_dict() for p in Project.query.filter_by(status='published', featured=True).order_by(Project.created_at.desc()).limit(6).all()],
    }), 200

# ==================== Subscription Endpoints ====================
@public_bp.route('/subscribe', methods=['POST'])
def subscribe():
    """Subscribe to newsletter"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        email = data.get('email', '').strip().lower()
        name = data.get('name', '').strip() if data.get('name') else None
        source = data.get('source', 'website')  # Track where subscription came from
        
        # Validate email
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        # Basic email validation
        if '@' not in email or '.' not in email.split('@')[1]:
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Check if already subscribed
        existing = Subscription.query.filter_by(email=email).first()
        
        if existing:
            if existing.is_active:
                return jsonify({
                    'message': 'You are already subscribed!',
                    'subscribed': True
                }), 200
            else:
                # Reactivate subscription
                existing.is_active = True
                existing.unsubscribed_at = None
                existing.source = source
                if name:
                    existing.name = name
                db.session.commit()
                
                # Send welcome email (non-blocking)
                try:
                    send_welcome_email(email, name)
                except Exception as email_error:
                    print(f"⚠️  Warning: Failed to send welcome email: {str(email_error)}")
                
                # Send notification (non-blocking)
                try:
                    send_new_subscriber_notification(email, name, source)
                except Exception as email_error:
                    print(f"⚠️  Warning: Failed to send notification email: {str(email_error)}")
                
                return jsonify({
                    'message': 'Welcome back! Your subscription has been reactivated.',
                    'subscribed': True
                }), 200
        
        # Create new subscription
        subscription = Subscription(
            email=email,
            name=name,
            source=source,
            is_active=True
        )
        
        db.session.add(subscription)
        db.session.commit()
        
        # Send welcome email to subscriber (non-blocking - don't fail subscription if email fails)
        try:
            send_welcome_email(email, name)
        except Exception as email_error:
            print(f"⚠️  Warning: Failed to send welcome email, but subscription succeeded: {str(email_error)}")
        
        # Send notification to portfolio owner (non-blocking)
        try:
            send_new_subscriber_notification(email, name, source)
        except Exception as email_error:
            print(f"⚠️  Warning: Failed to send notification email: {str(email_error)}")
        
        return jsonify({
            'message': 'Successfully subscribed! Check your email for a welcome message.',
            'subscribed': True
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error subscribing: {str(e)}")
        return jsonify({'error': 'Failed to subscribe. Please try again later.'}), 500

@public_bp.route('/unsubscribe', methods=['POST'])
def unsubscribe():
    """Unsubscribe from newsletter"""
    try:
        data = request.get_json()
        email = data.get('email', '').strip().lower()
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        subscription = Subscription.query.filter_by(email=email).first()
        
        if not subscription:
            return jsonify({'error': 'Email not found in our records'}), 404
        
        if not subscription.is_active:
            return jsonify({'message': 'You are already unsubscribed'}), 200
        
        subscription.is_active = False
        from datetime import datetime
        subscription.unsubscribed_at = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'message': 'Successfully unsubscribed. Sorry to see you go!'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error unsubscribing: {str(e)}")
        return jsonify({'error': 'Failed to unsubscribe. Please try again later.'}), 500

# ==================== Contact Form Endpoints ====================
@public_bp.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submission"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()
        subscribe_to_newsletter = data.get('subscribe_to_newsletter', False)
        
        # Validate required fields
        if not name:
            return jsonify({'error': 'Name is required'}), 400
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        if not subject:
            return jsonify({'error': 'Subject is required'}), 400
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        
        # Basic email validation
        if '@' not in email or '.' not in email.split('@')[1]:
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Save contact message to database
        contact_message = ContactMessage(
            name=name,
            email=email,
            subject=subject,
            message=message,
            is_read=False
        )
        
        db.session.add(contact_message)
        
        # If user wants to subscribe, add them to newsletter
        if subscribe_to_newsletter:
            existing_subscription = Subscription.query.filter_by(email=email).first()
            if not existing_subscription:
                subscription = Subscription(
                    email=email,
                    name=name,
                    source='contact-form',
                    is_active=True
                )
                db.session.add(subscription)
                # Send welcome email
                send_welcome_email(email, name)
                send_new_subscriber_notification(email, name, 'contact-form')
            elif not existing_subscription.is_active:
                # Reactivate subscription
                existing_subscription.is_active = True
                existing_subscription.unsubscribed_at = None
                existing_subscription.source = 'contact-form'
                if name:
                    existing_subscription.name = name
                send_welcome_email(email, name)
                send_new_subscriber_notification(email, name, 'contact-form')
        
        db.session.commit()
        
        # Send email to portfolio owner
        send_contact_message_email(name, email, subject, message)
        
        # Send confirmation email to sender
        send_contact_confirmation_email(name, email, subject)
        
        return jsonify({
            'message': 'Thank you for your message! I\'ll get back to you soon.',
            'success': True
        }), 201
        
    except Exception as e:
        db.session.rollback()
        print(f"❌ Error processing contact form: {str(e)}")
        return jsonify({'error': 'Failed to send message. Please try again later.'}), 500


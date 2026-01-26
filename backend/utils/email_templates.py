"""
Modern, fashionable email templates for subscription notifications
Designed to make recipients say "WOW!" ✨
"""

def get_welcome_email_html(name: str, portfolio_owner_name: str = "Ademola Adesina") -> str:
    """
    Generate a stunning, modern HTML welcome email for new subscribers
    """
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Welcome to My Portfolio Updates!</title>
        <!--[if mso]>
        <style type="text/css">
            body, table, td {{font-family: Arial, sans-serif !important;}}
        </style>
        <![endif]-->
        <style>
            /* Reset */
            body, table, td, p, a, li, blockquote {{
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }}
            table, td {{
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }}
            img {{
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }}
            
            /* Main Styles */
            body {{
                margin: 0 !important;
                padding: 0 !important;
                background-color: #0f172a;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            }}
            
            .email-wrapper {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                background-color: #0f172a;
                padding: 40px 20px;
            }}
            
            .email-container {{
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }}
            
            /* Animated Header */
            .email-header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                padding: 60px 40px;
                text-align: center;
                position: relative;
                overflow: hidden;
            }}
            
            .email-header::before {{
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                animation: pulse 3s ease-in-out infinite;
            }}
            
            @keyframes pulse {{
                0%, 100% {{ opacity: 0.3; }}
                50% {{ opacity: 0.6; }}
            }}
            
            .header-content {{
                position: relative;
                z-index: 1;
            }}
            
            .welcome-icon {{
                font-size: 64px;
                margin-bottom: 20px;
                display: block;
                animation: bounce 2s ease-in-out infinite;
            }}
            
            @keyframes bounce {{
                0%, 100% {{ transform: translateY(0); }}
                50% {{ transform: translateY(-10px); }}
            }}
            
            .email-header h1 {{
                font-size: 36px;
                font-weight: 800;
                margin: 0 0 15px 0;
                color: #ffffff;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
                letter-spacing: -0.5px;
            }}
            
            .email-header p {{
                font-size: 18px;
                color: rgba(255, 255, 255, 0.95);
                margin: 0;
                font-weight: 300;
            }}
            
            /* Body */
            .email-body {{
                padding: 50px 40px;
                background: #ffffff;
            }}
            
            .greeting {{
                font-size: 24px;
                font-weight: 700;
                color: #1e293b;
                margin-bottom: 25px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }}
            
            .content {{
                font-size: 16px;
                color: #475569;
                line-height: 1.8;
                margin-bottom: 35px;
            }}
            
            /* Feature Cards */
            .features-grid {{
                display: grid;
                grid-template-columns: 1fr;
                gap: 15px;
                margin: 35px 0;
            }}
            
            .feature-card {{
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                border-left: 4px solid;
                padding: 20px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                gap: 15px;
                transition: transform 0.2s;
            }}
            
            .feature-card:nth-child(1) {{ border-left-color: #667eea; }}
            .feature-card:nth-child(2) {{ border-left-color: #764ba2; }}
            .feature-card:nth-child(3) {{ border-left-color: #f093fb; }}
            .feature-card:nth-child(4) {{ border-left-color: #4facfe; }}
            
            .feature-icon {{
                font-size: 32px;
                flex-shrink: 0;
            }}
            
            .feature-text {{
                font-size: 15px;
                font-weight: 600;
                color: #334155;
                margin: 0;
            }}
            
            /* Highlight Box */
            .highlight-box {{
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                border: 2px solid #0ea5e9;
                border-radius: 16px;
                padding: 25px;
                margin: 35px 0;
                position: relative;
                overflow: hidden;
            }}
            
            .highlight-box::before {{
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
            }}
            
            .highlight-box p {{
                margin: 0;
                font-size: 15px;
                color: #0c4a6e;
                line-height: 1.7;
            }}
            
            .highlight-box strong {{
                color: #0369a1;
                font-weight: 700;
            }}
            
            /* CTA Button */
            .cta-container {{
                text-align: center;
                margin: 40px 0;
            }}
            
            .cta-button {{
                display: inline-block;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                color: #ffffff !important;
                padding: 18px 40px;
                text-decoration: none;
                border-radius: 12px;
                font-weight: 700;
                font-size: 16px;
                letter-spacing: 0.5px;
                box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
                transition: all 0.3s;
                position: relative;
                overflow: hidden;
            }}
            
            .cta-button::before {{
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                transition: left 0.5s;
            }}
            
            .cta-button:hover::before {{
                left: 100%;
            }}
            
            /* Footer */
            .email-footer {{
                background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                padding: 40px;
                text-align: center;
                color: #ffffff;
            }}
            
            .footer-name {{
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 10px;
                background: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }}
            
            .footer-title {{
                font-size: 14px;
                color: #cbd5e1;
                margin-bottom: 20px;
            }}
            
            .footer-location {{
                font-size: 14px;
                color: #94a3b8;
                margin-bottom: 25px;
            }}
            
            .social-links {{
                margin: 25px 0;
            }}
            
            .social-links a {{
                display: inline-block;
                margin: 0 12px;
                color: #cbd5e1;
                text-decoration: none;
                font-size: 14px;
                font-weight: 500;
                transition: color 0.3s;
            }}
            
            .social-links a:hover {{
                color: #667eea;
            }}
            
            .footer-divider {{
                height: 1px;
                background: linear-gradient(90deg, transparent, #334155, transparent);
                margin: 30px 0;
            }}
            
            .unsubscribe {{
                font-size: 12px;
                color: #64748b;
                margin-top: 20px;
            }}
            
            .unsubscribe a {{
                color: #667eea;
                text-decoration: none;
            }}
            
            /* Mobile Responsive */
            @media only screen and (max-width: 600px) {{
                .email-wrapper {{
                    padding: 20px 10px;
                }}
                
                .email-header {{
                    padding: 40px 30px;
                }}
                
                .email-header h1 {{
                    font-size: 28px;
                }}
                
                .email-body {{
                    padding: 35px 25px;
                }}
                
                .greeting {{
                    font-size: 20px;
                }}
                
                .cta-button {{
                    padding: 16px 32px;
                    font-size: 15px;
                }}
            }}
        </style>
    </head>
    <body>
        <div class="email-wrapper">
            <div class="email-container">
                <!-- Header -->
                <div class="email-header">
                    <div class="header-content">
                        <span class="welcome-icon">🎉</span>
                        <h1>Welcome Aboard!</h1>
                        <p>You're now part of something special</p>
                    </div>
                </div>
                
                <!-- Body -->
                <div class="email-body">
                    <div class="greeting">
                        Hello {name if name else 'there'}! 👋
                    </div>
                    
                    <div class="content">
                        <p>Thank you for subscribing to my portfolio newsletter! I'm absolutely thrilled to have you join my community of developers, designers, and tech enthusiasts.</p>
                        
                        <p>You're now part of an exclusive group that gets <strong>first access</strong> to everything I create!</p>
                    </div>
                    
                    <!-- Features Grid -->
                    <div class="features-grid">
                        <div class="feature-card">
                            <span class="feature-icon">🚀</span>
                            <p class="feature-text">New projects & portfolio updates</p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">💡</span>
                            <p class="feature-text">Latest tech insights & tutorials</p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">🎨</span>
                            <p class="feature-text">Design tips & best practices</p>
                        </div>
                        <div class="feature-card">
                            <span class="feature-icon">📚</span>
                            <p class="feature-text">Learning resources & career advice</p>
                        </div>
                    </div>
                    
                    <!-- Highlight Box -->
                    <div class="highlight-box">
                        <p><strong>💼 About Me:</strong> I'm a Software Engineer with a vision to specialize in blockchain technology. I build scalable backend systems and AI-driven solutions, currently pursuing a Master's in Software Engineering at Quantic School of Business and Technology.</p>
                    </div>
                    
                    <!-- CTA Button -->
                    <div class="cta-container">
                        <a href="https://your-portfolio-url.com" class="cta-button" style="color: #ffffff !important; text-decoration: none;">Visit My Portfolio →</a>
                    </div>
                    
                    <div class="content">
                        <p>I'm always open to connecting with fellow developers and discussing exciting projects. Feel free to reach out if you'd like to collaborate!</p>
                    </div>
                </div>
                
                <!-- Footer -->
                <div class="email-footer">
                    <div class="footer-name">{portfolio_owner_name}</div>
                    <div class="footer-title">Software Engineer | Blockchain Enthusiast</div>
                    <div class="footer-location">📍 Ibadan, Nigeria</div>
                    
                    <div class="social-links">
                        <a href="https://github.com/semiuAdesina">GitHub</a> •
                        <a href="https://www.linkedin.com/in/semiu-ademola-adesina-585141319/">LinkedIn</a> •
                        <a href="https://x.com/Damozpixie1">Twitter</a>
                    </div>
                    
                    <div class="footer-divider"></div>
                    
                    <div class="unsubscribe">
                        <p>You're receiving this email because you subscribed to my portfolio updates.</p>
                        <p><a href="{{unsubscribe_url}}">Unsubscribe</a> • <a href="mailto:ademolaadesinadev@gmail.com">Contact Me</a></p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """


def get_welcome_email_text(name: str, portfolio_owner_name: str = "Ademola Adesina") -> str:
    """
    Generate a plain text version of the welcome email
    """
    return f"""
🎉 Welcome to My Portfolio Updates!

Hello {name if name else 'there'}!

Thank you for subscribing to my portfolio newsletter! I'm thrilled to have you join my community.

You'll now be the first to know about:
🚀 New projects and portfolio updates
💡 Latest tech insights and tutorials
🎨 Design tips and development best practices
📚 Learning resources and career advice

About Me:
I'm a Software Engineer with a vision to specialize in blockchain technology. I build scalable backend systems and AI-driven solutions, currently pursuing a Master's in Software Engineering.

Visit my portfolio: https://your-portfolio-url.com

I'm always open to connecting with fellow developers and discussing exciting projects. Feel free to reach out if you'd like to collaborate!

Best regards,
{portfolio_owner_name}
Software Engineer | Blockchain Enthusiast
📍 Ibadan, Nigeria

---
You're receiving this email because you subscribed to my portfolio updates.
Unsubscribe: {{unsubscribe_url}}
Contact: ademolaadesinadev@gmail.com
    """


def get_contact_message_email_html(name: str, email: str, subject: str, message: str, portfolio_owner_name: str = "Ademola Adesina") -> str:
    """
    Generate a stunning HTML email for contact form messages
    """
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Message: {subject}</title>
        <style>
            body {{
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                padding: 30px 20px;
            }}
            .container {{
                max-width: 650px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }}
            .header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                color: white;
                padding: 40px 35px;
                text-align: center;
            }}
            .header-icon {{
                font-size: 56px;
                margin-bottom: 15px;
                display: block;
            }}
            .header h2 {{
                margin: 0;
                font-size: 28px;
                font-weight: 800;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }}
            .body-content {{
                padding: 40px 35px;
            }}
            .info-grid {{
                display: grid;
                gap: 15px;
                margin-bottom: 30px;
            }}
            .info-card {{
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                border-left: 4px solid #667eea;
                padding: 20px;
                border-radius: 12px;
            }}
            .info-label {{
                font-weight: 700;
                color: #475569;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 8px;
            }}
            .info-value {{
                font-size: 16px;
                color: #1e293b;
                font-weight: 600;
            }}
            .info-value a {{
                color: #667eea;
                text-decoration: none;
            }}
            .message-section {{
                margin-top: 30px;
            }}
            .message-label {{
                font-weight: 700;
                color: #1e293b;
                font-size: 18px;
                margin-bottom: 15px;
            }}
            .message-box {{
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 25px;
                white-space: pre-wrap;
                font-size: 15px;
                line-height: 1.8;
                color: #334155;
                font-family: 'Monaco', 'Courier New', monospace;
            }}
            .footer {{
                background: #1e293b;
                padding: 30px;
                text-align: center;
                color: #cbd5e1;
                font-size: 13px;
            }}
            .footer a {{
                color: #667eea;
                text-decoration: none;
                font-weight: 600;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <span class="header-icon">📧</span>
                <h2>New Contact Message</h2>
            </div>
            
            <div class="body-content">
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-label">From</div>
                        <div class="info-value">{name}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Email</div>
                        <div class="info-value"><a href="mailto:{email}">{email}</a></div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Subject</div>
                        <div class="info-value">{subject}</div>
                    </div>
                </div>
                
                <div class="message-section">
                    <div class="message-label">Message:</div>
                    <div class="message-box">{message}</div>
                </div>
            </div>
            
            <div class="footer">
                <p>This message was sent through your portfolio contact form.</p>
                <p>Reply directly to: <a href="mailto:{email}">{email}</a></p>
            </div>
        </div>
    </body>
    </html>
    """


def get_contact_confirmation_email_html(name: str, subject: str, portfolio_owner_name: str = "Ademola Adesina") -> str:
    """
    Generate a stunning confirmation email to the sender
    """
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Received</title>
        <style>
            body {{
                margin: 0;
                padding: 0;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                padding: 40px 20px;
            }}
            .email-container {{
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            }}
            .email-header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                padding: 60px 40px;
                text-align: center;
                color: #ffffff;
            }}
            .success-icon {{
                font-size: 72px;
                margin-bottom: 20px;
                display: block;
                animation: scale 2s ease-in-out infinite;
            }}
            @keyframes scale {{
                0%, 100% {{ transform: scale(1); }}
                50% {{ transform: scale(1.1); }}
            }}
            .email-header h1 {{
                font-size: 36px;
                font-weight: 800;
                margin: 0;
                text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            }}
            .email-body {{
                padding: 50px 40px;
            }}
            .content {{
                font-size: 16px;
                color: #475569;
                line-height: 1.8;
            }}
            .highlight-box {{
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                border: 2px solid #0ea5e9;
                border-radius: 16px;
                padding: 25px;
                margin: 30px 0;
            }}
            .highlight-box p {{
                margin: 0;
                color: #0c4a6e;
                font-size: 15px;
                line-height: 1.7;
            }}
            .signature {{
                margin-top: 30px;
                padding-top: 30px;
                border-top: 2px solid #e2e8f0;
            }}
            .signature-name {{
                font-weight: 700;
                font-size: 18px;
                color: #1e293b;
                margin-bottom: 5px;
            }}
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <span class="success-icon">✅</span>
                <h1>Message Received!</h1>
            </div>
            <div class="email-body">
                <div class="content">
                    <p>Hello <strong>{name}</strong>,</p>
                    
                    <p>Thank you for reaching out! I've received your message regarding <strong style="color: #667eea;">"{subject}"</strong>.</p>
                    
                    <div class="highlight-box">
                        <p>✨ I'll review your message and get back to you as soon as possible, typically within <strong>24-48 hours</strong>.</p>
                    </div>
                    
                    <p>I appreciate your interest and look forward to connecting with you!</p>
                    
                    <div class="signature">
                        <div class="signature-name">{portfolio_owner_name}</div>
                        <div style="color: #64748b; font-size: 14px;">Software Engineer | Blockchain Enthusiast</div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    """


def get_new_subscriber_notification_html(subscriber_email: str, subscriber_name: str = None, source: str = None) -> str:
    """
    Generate a modern HTML email notification for the portfolio owner when someone subscribes
    """
    source_display = {
        'footer': 'Footer',
        'projects-bento': 'Featured Projects',
        'projects-page': 'Projects Page',
        'contact-form': 'Contact Form',
        'test-script': 'Test'
    }.get(source, source or 'Website')
    
    return f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Subscriber Notification</title>
        <style>
            body {{
                margin: 0;
                padding: 0;
                background: #f5f5f5;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                padding: 30px 20px;
            }}
            .container {{
                max-width: 600px;
                margin: 0 auto;
                background: #ffffff;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            }}
            .header {{
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 16px;
                text-align: center;
                margin-bottom: 30px;
            }}
            .header h2 {{
                margin: 0;
                font-size: 28px;
                font-weight: 800;
            }}
            .header-icon {{
                font-size: 48px;
                margin-bottom: 10px;
            }}
            .info-grid {{
                display: grid;
                gap: 15px;
                margin: 25px 0;
            }}
            .info-card {{
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                border-left: 4px solid #667eea;
                padding: 20px;
                border-radius: 12px;
            }}
            .info-label {{
                font-weight: 700;
                color: #475569;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 8px;
            }}
            .info-value {{
                font-size: 16px;
                color: #1e293b;
                font-weight: 600;
            }}
            .info-value a {{
                color: #667eea;
                text-decoration: none;
            }}
            .footer {{
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e2e8f0;
                font-size: 13px;
                color: #64748b;
                text-align: center;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="header-icon">🎉</div>
                <h2>New Subscriber!</h2>
            </div>
            
            <p style="color: #475569; font-size: 16px; margin-bottom: 25px;">Someone just subscribed to your portfolio newsletter.</p>
            
            <div class="info-grid">
                <div class="info-card">
                    <div class="info-label">Email</div>
                    <div class="info-value"><a href="mailto:{subscriber_email}">{subscriber_email}</a></div>
                </div>
                {f'<div class="info-card"><div class="info-label">Name</div><div class="info-value">{subscriber_name}</div></div>' if subscriber_name else ''}
                <div class="info-card">
                    <div class="info-label">Source</div>
                    <div class="info-value">{source_display}</div>
                </div>
                <div class="info-card">
                    <div class="info-label">Time</div>
                    <div class="info-value">{{{{ current_time }}}}</div>
                </div>
            </div>
            
            <div class="footer">
                <p>This is an automated notification from your portfolio backend.</p>
            </div>
        </div>
    </body>
    </html>
    """

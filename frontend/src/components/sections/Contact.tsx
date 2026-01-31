'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faMapMarkerAlt, 
  faPhone,
  faUser,
  faPaperPlane,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { 
  faGithub, 
  faLinkedin, 
  faTwitter 
} from '@fortawesome/free-brands-svg-icons';
import { personalInfo, socialLinks } from '@/data/portfolio';
import SuccessAnimation from '../ui/SuccessAnimation';
import { contactAPI } from '@/lib/api/contact';

const getSocialIcon = (iconName: string) => {
  const iconMap: { [key: string]: any } = {
    github: faGithub,
    linkedin: faLinkedin,
    twitter: faTwitter,
    email: faEnvelope,
  };
  return iconMap[iconName.toLowerCase()] || faEnvelope;
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('loading');
    setErrorMessage('');
    
    try {
      await contactAPI.sendMessage({
        ...formData,
        subscribe_to_newsletter: subscribeToNewsletter
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubscribeToNewsletter(false);
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="contact" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-bold mb-4 bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto"></div>
          <p className="font-body text-slate-600 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-md rounded-lg border border-sky-200/60 shadow-lg shadow-slate-900/5 p-8"
          >
            <AnimatePresence mode="wait">
              {submitStatus !== 'success' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
              <div>
                <label htmlFor="name" className="block text-sm sm:text-base font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} className="text-sky-500 text-xs sm:text-sm" />
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-sky-200/60 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-body block text-sm sm:text-base font-medium text-slate-700 mb-2 flex items-center gap-2">
                  <FontAwesomeIcon icon={faEnvelope} className="text-sky-500 text-xs sm:text-sm" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-sky-200/60 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="font-body block text-sm sm:text-base font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-sky-200/60 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="font-body block text-sm sm:text-base font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={6}
                  className="w-full px-4 py-3 text-sm sm:text-base bg-white border border-sky-200/60 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="subscribe"
                  checked={subscribeToNewsletter}
                  onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
                  className="w-4 h-4 rounded border-sky-200/60 bg-white text-sky-600 focus:ring-sky-400"
                />
                <label htmlFor="subscribe" className="font-body text-sm sm:text-base text-slate-700 cursor-pointer">
                  Also subscribe to newsletter updates
                </label>
              </div>
              {submitStatus === 'error' && errorMessage && (
                <p className="text-red-400 text-sm">{errorMessage}</p>
              )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-accent w-full px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-sky-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sm sm:text-base" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} className="text-sm sm:text-base" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <SuccessAnimation
                  isVisible={submitStatus === 'success'}
                  onClose={handleReset}
                  message="Message sent!"
                  showBackButton={true}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-white/70 backdrop-blur-md rounded-lg border border-sky-200/60 shadow-lg shadow-slate-900/5 p-8">
              <h3 className="font-heading text-lg sm:text-xl md:text-[1.25rem] font-bold mb-6 text-slate-900">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-lg sm:text-xl" />
                  </div>
                  <div>
                    <p className="font-body text-sm sm:text-base font-semibold text-slate-900">Location</p>
                    <p className="font-body text-sm sm:text-base text-slate-600">{personalInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg">
                    <FontAwesomeIcon icon={faEnvelope} className="text-white text-lg sm:text-xl" />
                  </div>
                  <div>
                    <p className="font-body text-sm sm:text-base font-semibold text-slate-900">Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="text-sm sm:text-base text-slate-600 hover:text-sky-600 transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg">
                    <FontAwesomeIcon icon={faPhone} className="text-white text-lg sm:text-xl" />
                  </div>
                  <div>
                    <p className="font-body text-sm sm:text-base font-semibold text-slate-900">Phone</p>
                    <a href={`tel:${personalInfo.phone}`} className="text-sm sm:text-base text-slate-600 hover:text-sky-600 transition-colors">
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-md rounded-lg border border-sky-200/60 shadow-lg shadow-slate-900/5 p-8">
              <h3 className="font-heading text-lg sm:text-xl md:text-[1.25rem] font-bold mb-6 text-slate-900">Follow Me</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link: { name: string; url: string; icon: string }) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-lg border border-sky-200/60 hover:bg-sky-50 hover:border-sky-400/60 transition-all group"
                  >
                    <FontAwesomeIcon 
                      icon={getSocialIcon(link.icon)} 
                      className="text-slate-500 group-hover:text-sky-600 transition-colors text-sm sm:text-base" 
                    />
                    <span className="text-sm sm:text-base text-slate-800">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


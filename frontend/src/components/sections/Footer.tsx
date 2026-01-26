'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGithub, 
  faLinkedin, 
  faTwitter, 
  faXing,
  faDribbble,
  faBehance,
  faMedium,
  faDev,
  faStackOverflow
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faMapMarkerAlt, 
  faPhone,
  faArrowUp,
  faCode,
  faGraduationCap,
  faBriefcase,
  faSpinner,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { personalInfo, socialLinks } from '@/data/portfolio';
import SuccessAnimation from '../ui/SuccessAnimation';
import { subscriptionsAPI } from '@/lib/api/subscriptions';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionStatus('loading');
    setErrorMessage('');
    
    try {
      await subscriptionsAPI.subscribe({
        email: subscriptionEmail,
        source: 'footer'
      });
      setSubscriptionStatus('success');
      setSubscriptionEmail('');
    } catch (error: any) {
      setSubscriptionStatus('error');
      setErrorMessage(error.response?.data?.error || 'Failed to subscribe. Please try again.');
    }
  };

  const handleReset = () => {
    setSubscriptionStatus('idle');
    setErrorMessage('');
  };

  const getSocialIcon = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      github: faGithub,
      linkedin: faLinkedin,
      twitter: faTwitter,
      email: faEnvelope,
      medium: faMedium,
      dev: faDev,
      stackoverflow: faStackOverflow,
      dribbble: faDribbble,
      behance: faBehance,
    };
    return iconMap[iconName.toLowerCase()] || faEnvelope;
  };

  const quickLinks = [
    { href: '#impact', label: 'Impact Metrics' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  const services = [
    'Backend Development',
    'AI Solutions',
    'Full-Stack Development',
    'Mobile Apps',
    'API Design',
    'System Architecture',
  ];

  const technologies = [
    'TypeScript',
    'Python',
    'React',
    'Node.js',
    'Flask',
    'MongoDB',
  ];

  return (
    <footer className="w-full bg-[#131921] text-white rounded-t-[60px] px-4 sm:px-6 lg:px-12 xl:px-16 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-12 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 pb-8 md:pb-0 border-b border-white/10 md:border-b-0 mb-8 md:mb-0"
          >
            <div className="mb-6 text-center md:text-left">
              <h3 className="font-heading text-lg sm:text-xl md:text-[1.25rem] font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {personalInfo.name.split(' ')[0]} {personalInfo.name.split(' ')[1]}
              </h3>
              <p className="font-body text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                {personalInfo.tagline}
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6 text-center md:text-left">
              <div className="font-body flex items-center justify-center md:justify-start gap-3 text-gray-400 text-sm sm:text-base">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-purple-400 text-xs sm:text-sm" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="font-body flex items-center justify-center md:justify-start gap-3 text-gray-400 text-sm sm:text-base">
                <FontAwesomeIcon icon={faEnvelope} className="text-purple-400 text-xs sm:text-sm" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-white transition-colors">
                  {personalInfo.email}
                </a>
              </div>
              <div className="font-body flex items-center justify-center md:justify-start gap-3 text-gray-400 text-sm sm:text-base">
                <FontAwesomeIcon icon={faPhone} className="text-purple-400 text-xs sm:text-sm" />
                <a href={`tel:${personalInfo.phone}`} className="hover:text-white transition-colors">
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 justify-center md:justify-start">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:border-purple-500/50 transition-all group"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <FontAwesomeIcon 
                    icon={getSocialIcon(link.icon)} 
                    className="text-gray-400 group-hover:text-purple-400 transition-colors text-sm sm:text-base" 
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="pb-8 md:pb-0 border-b border-white/10 md:border-b-0 mb-8 md:mb-0"
          >
            <h4 className="font-heading text-base sm:text-base md:text-[1.125rem] font-semibold mb-6 text-white flex items-center gap-2">
              <FontAwesomeIcon icon={faCode} className="text-purple-400 text-sm sm:text-base" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-gray-400 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pb-8 md:pb-0 border-b border-white/10 md:border-b-0 mb-8 md:mb-0"
          >
            <h4 className="font-heading text-base sm:text-base md:text-[1.125rem] font-semibold mb-6 text-white flex items-center gap-2">
              <FontAwesomeIcon icon={faBriefcase} className="text-purple-400 text-sm sm:text-base" />
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2 group cursor-default">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-400 transition-all"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-heading text-base sm:text-base md:text-[1.125rem] font-semibold mb-6 text-white flex items-center gap-2">
              <FontAwesomeIcon icon={faGraduationCap} className="text-purple-400 text-sm sm:text-base" />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/5 rounded-lg text-sm sm:text-base text-gray-400 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:text-white transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Newsletter Subscription */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <AnimatePresence mode="wait">
                {subscriptionStatus !== 'success' ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full"
                  >
                    <h5 className="font-heading text-sm sm:text-base font-semibold text-white mb-2">Stay Updated with New Projects</h5>
                    <p className="font-body text-sm sm:text-base text-gray-400 mb-3">Subscribe to get notified when I publish new projects and updates</p>
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        value={subscriptionEmail}
                        onChange={(e) => setSubscriptionEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        disabled={subscriptionStatus === 'loading'}
                        className="flex-1 min-w-0 px-3 py-2 bg-white/5 border border-white/10 rounded text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={subscriptionStatus === 'loading'}
                        className="font-accent px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all whitespace-nowrap flex-shrink-0 disabled:opacity-70 flex items-center justify-center gap-2 min-w-[100px]"
                      >
                        {subscriptionStatus === 'loading' ? (
                          <>
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xs sm:text-sm" />
                            <span className="hidden sm:inline">...</span>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faPaperPlane} className="text-xs sm:text-sm" />
                            <span>Subscribe</span>
                          </>
                        )}
                      </button>
                    </form>
                    {subscriptionStatus === 'error' && errorMessage && (
                      <p className="text-red-400 text-sm mt-2 text-center">{errorMessage}</p>
                    )}
                  </motion.div>
                ) : (
                  <SuccessAnimation
                    isVisible={subscriptionStatus === 'success'}
                    onClose={handleReset}
                    message="You're subscribed!"
                    showBackButton={true}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-body text-gray-400 text-sm sm:text-base">
              <p>
                © {currentYear} <span className="text-white font-semibold">{personalInfo.name}</span>. All rights reserved.
              </p>
              <p className="mt-1 text-sm sm:text-base">
                Built with <span className="text-purple-400">Next.js</span>, <span className="text-purple-400">Flask</span>, and <span className="text-purple-400">TypeScript</span>
              </p>
            </div>
            
            <div className="font-body flex items-center gap-6 text-sm sm:text-base text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-purple-500/50 transition-all z-50"
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <FontAwesomeIcon icon={faArrowUp} className="text-sm sm:text-base" />
      </motion.button>
    </footer>
  );
}

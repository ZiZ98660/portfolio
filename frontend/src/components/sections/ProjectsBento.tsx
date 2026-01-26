'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExternalLinkAlt, 
  faCode,
  faStar,
  faSpinner,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { faGithub as faGithubBrand } from '@fortawesome/free-brands-svg-icons';
import { featuredProjects } from '@/data/portfolio';
import { getTechIcon } from '@/lib/techIcons';
import ImageCarousel from '@/components/projects/ImageCarousel';
import SuccessAnimation from '../ui/SuccessAnimation';
import { subscriptionsAPI } from '@/lib/api/subscriptions';

export default function ProjectsBento() {
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionStatus('loading');
    setErrorMessage('');
    
    try {
      await subscriptionsAPI.subscribe({
        email: subscriptionEmail,
        source: 'projects-bento'
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
  };


  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden">
      {/* Section-specific glowing background - Purple/Pink theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 left-0 w-[900px] h-[900px] bg-gradient-to-br from-purple-500/30 via-pink-500/25 to-transparent rounded-full blur-[160px] animate-glow-pulse"></div>
        <div className="absolute bottom-1/3 right-0 w-[700px] h-[700px] bg-gradient-to-br from-pink-500/25 via-rose-500/20 to-transparent rounded-full blur-[140px] animate-glow-pulse-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[120px] animate-float-slow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
              <h2 className="font-heading text-2xl sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">Innovative solutions that make a difference</p>
        </motion.div>

        {/* Bento Grid - Only projects with images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredProjects
            .filter((project) => {
              // STRICT FILTER: Only show projects that have screenshots array with at least one image
              if (!project) return false;
              
              // Check if project has screenshots property
              if (!('screenshots' in project)) return false;
              
              // Check if screenshots is an array
              if (!Array.isArray(project.screenshots)) return false;
              
              // Check if screenshots array has at least one item
              if (project.screenshots.length === 0) return false;
              
              return true;
            })
            .map((project, index) => {
            const hasScreenshots = 'screenshots' in project && project.screenshots && project.screenshots.length > 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* AWS-style glowing shadow underneath - appears on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-indigo-500/0 group-hover:from-blue-500/50 group-hover:via-cyan-500/40 group-hover:to-indigo-500/30 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="bg-gradient-to-br from-blue-900/30 via-cyan-900/20 to-indigo-900/30 backdrop-blur-md rounded-lg border border-white/10 hover:border-blue-400/30 overflow-hidden transition-all duration-300 relative z-10"
                >
                <div className="p-6 h-full flex flex-col">
                  {/* Image Carousel */}
                  {hasScreenshots && (
                    <div className="mb-6 -mx-6 -mt-6">
                      <ImageCarousel 
                        images={project.screenshots as string[]} 
                        projectTitle={project.title}
                      />
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">
                          <FontAwesomeIcon icon={faCode} className="text-white text-base sm:text-lg" />
                        </div>
                        <h3 className="font-heading font-extrabold text-white text-base sm:text-lg md:text-[1.125rem]">
                          {project.title}
                        </h3>
                      </div>
                      {project.inProgress && (
                        <div className="flex items-center gap-2 mb-2">
                          <FontAwesomeIcon icon={faSpinner} className="text-yellow-400 animate-spin text-xs sm:text-sm" />
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                            In Progress
                          </span>
                        </div>
                      )}
                      {project.featured && !project.inProgress && (
                        <div className="flex items-center gap-2 mb-2">
                          <FontAwesomeIcon icon={faStar} className="text-cyan-400 text-xs sm:text-sm" />
                          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-sm">
                            Featured
                          </span>
                        </div>
                      )}
                      <p className="font-body text-gray-300 leading-relaxed text-sm sm:text-base line-clamp-4">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => {
                        const TechIcon = getTechIcon(tech);
                        return (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-white/10 rounded-full text-xs sm:text-sm text-gray-200 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all flex items-center gap-1.5 backdrop-blur-sm"
                          >
                            <FontAwesomeIcon 
                              icon={TechIcon} 
                              className="text-cyan-400 text-xs sm:text-sm" 
                            />
                            <span className="whitespace-nowrap">{tech}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer with Links */}
                  <div className="flex gap-4 pt-6 border-t border-white/10 mt-auto">
                    {project.liveLink && project.liveLink !== '#' && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-accent flex items-center gap-2 sm:gap-3 px-4 py-2.5 sm:px-6 sm:py-3.5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-xl text-sm sm:text-base font-bold hover:shadow-xl hover:shadow-purple-500/50 transition-all flex-1 justify-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faExternalLinkAlt} className="text-sm sm:text-base" />
                        <span>Live Demo</span>
                      </motion.a>
                    )}
                    {project.githubLink && project.githubLink !== '#' && (
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3.5 bg-white/10 text-white rounded-xl text-sm sm:text-base font-semibold hover:bg-white/20 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faGithubBrand} className="text-base sm:text-lg" />
                      </motion.a>
                    )}
                  </div>
                </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Subscription Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-lg border border-purple-500/30 p-8"
        >
          <div className="max-w-2xl mx-auto text-center">
            <AnimatePresence mode="wait">
              {subscriptionStatus !== 'success' ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full"
                >
                  <h3 className="font-heading text-lg sm:text-xl md:text-[1.25rem] font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Stay Updated with New Projects
                  </h3>
                  <p className="font-body text-sm sm:text-base text-gray-300 mb-6">
                    Subscribe to get notified when I publish new projects and updates
                  </p>
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      value={subscriptionEmail}
                      onChange={(e) => setSubscriptionEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      disabled={subscriptionStatus === 'loading'}
                      className="flex-1 px-4 py-3 text-sm sm:text-base bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={subscriptionStatus === 'loading'}
                      className="font-accent px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-70 flex items-center justify-center gap-2 min-w-[120px]"
                    >
                      {subscriptionStatus === 'loading' ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sm sm:text-base" />
                          <span className="hidden sm:inline">Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} className="text-sm sm:text-base" />
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
    </section>
  );
}

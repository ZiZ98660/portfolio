'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { projectsAPI, Project } from '@/lib/api/projects';
import SuccessAnimation from '../ui/SuccessAnimation';
import { subscriptionsAPI } from '@/lib/api/subscriptions';
import { API_BASE_URL } from '@/lib/api/client';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionEmail, setSubscriptionEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const categories = ['all', 'web', 'mobile', 'desktop', 'other'];

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll({});
      setProjects(response.projects);
      setFilteredProjects(response.projects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscriptionStatus('loading');
    setErrorMessage('');
    
    try {
      await subscriptionsAPI.subscribe({
        email: subscriptionEmail,
        source: 'projects-page'
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

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-bold mb-4 bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto mb-8"></div>
          <p className="font-body text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            Explore my latest work and creative solutions
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 sm:px-6 sm:py-2 rounded-full text-sm sm:text-base font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30'
                  : 'bg-white/70 backdrop-blur-md text-slate-700 border border-sky-200/60 hover:bg-white hover:border-sky-400/60 shadow-sm shadow-slate-900/5'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="font-body text-sm sm:text-base">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white/70 backdrop-blur-md rounded-lg overflow-hidden border border-sky-200/60 hover:border-sky-400/70 shadow-lg shadow-slate-900/5 transition-all"
              >
                {project.thumbnail_image && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={`${API_BASE_URL}/${project.thumbnail_image}`}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full text-xs sm:text-sm font-semibold">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-heading text-base sm:text-lg md:text-[1.125rem] font-bold mb-2 text-slate-900">{project.title}</h3>
                  <p className="font-body text-slate-600 text-sm sm:text-base mb-4 line-clamp-2">
                    {project.short_description || project.description}
                  </p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="font-body px-2 py-1 bg-sky-50 rounded text-xs sm:text-sm text-slate-700 border border-sky-200/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-3">
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-accent px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-sky-500/30 transition-all"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body px-3 py-1.5 sm:px-4 sm:py-2 bg-white rounded-lg text-sm sm:text-base font-semibold border border-sky-200/60 text-slate-700 hover:border-sky-400/60 hover:bg-sky-50 transition-all"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Subscription Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-sky-600/15 to-blue-600/15 backdrop-blur-md rounded-lg border border-sky-400/30 p-8"
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
                  <h3 className="font-heading text-lg sm:text-xl md:text-[1.25rem] font-bold mb-4 bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                    Stay Updated with New Projects
                  </h3>
                  <p className="font-body text-sm sm:text-base text-slate-600 mb-6">
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
                      className="flex-1 px-4 py-3 text-sm sm:text-base bg-white/80 backdrop-blur-md border border-sky-200/60 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={subscriptionStatus === 'loading'}
                      className="font-accent px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-sky-500/30 transition-all disabled:opacity-70 flex items-center justify-center gap-2 min-w-[120px]"
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


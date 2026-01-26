'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { personalInfo } from '@/data/portfolio';
import dynamic from 'next/dynamic';
import TypingText from '../ui/TypingText';

// Lazy load 3D scene for better performance
const Hero3DScene = dynamic(() => import('../3d/Hero3DScene'), {
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
  ssr: false, // 3D components don't need SSR
});

interface HeroProps {
  show3D?: boolean;
}

export default function Hero({ show3D = true }: HeroProps) {
  return (
    <section className="relative pt-20 pb-8 sm:pt-24 sm:pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20 flex items-center justify-center overflow-hidden">
      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Profile Picture */}
              <div className="mb-4 sm:mb-6 flex justify-center lg:justify-start">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0">
                  {/* Animated rotating ring with SVG */}
                  <motion.div
                    className="absolute -inset-2 rounded-full pointer-events-none z-0"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg 
                      className="w-full h-full" 
                      viewBox="0 0 100 100" 
                      preserveAspectRatio="xMidYMid meet"
                      style={{ width: '100%', height: '100%' }}
                    >
                      <defs>
                        <linearGradient id={`ringGradient-${personalInfo.name.replace(/\s+/g, '-')}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a855f7" />
                          <stop offset="50%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke={`url(#ringGradient-${personalInfo.name.replace(/\s+/g, '-')})`}
                        strokeWidth="2"
                      />
                    </svg>
                  </motion.div>
                  
                  {/* Pulsing outer ring */}
                  <motion.div
                    className="absolute -inset-3 rounded-full border-2 border-purple-400/50 pointer-events-none z-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  {/* Profile image container - perfectly circular */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-800 shadow-xl bg-gray-900 z-10" style={{ aspectRatio: '1/1' }}>
                    <img
                      src="/assets/pro.jpg"
                      alt={personalInfo.name}
                      className="w-full h-full object-cover rounded-full"
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        borderRadius: '50%',
                        display: 'block'
                      }}
                      loading="eager"
                    />
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none rounded-full"></div>
                  </div>
                </div>
              </div>
              
              <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {personalInfo.name}
              </h1>
              <h2 className="font-heading text-lg sm:text-xl md:text-[1.375rem] lg:text-[1.5rem] font-semibold text-gray-300 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 justify-center lg:justify-start min-h-[1.5em]">
                <FontAwesomeIcon icon={faCode} className="text-purple-400 text-sm sm:text-base md:text-lg" />
                <TypingText 
                  text={personalInfo.title} 
                  speed={50}
                  className="inline-block font-heading"
                />
              </h2>
              <p className="font-body text-sm sm:text-base md:text-base text-gray-400 max-w-2xl mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
                {personalInfo.tagline}
              </p>
            </motion.div>
            
            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.a
                href="#projects"
                className="font-accent px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-full text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="font-accent px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-3.5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-full text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 border border-purple-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: 3D GLB Model */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center mt-8 lg:mt-0"
          >
            <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-white/5 backdrop-blur-md rounded-lg border border-white/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
              <div className="w-full h-full relative z-0">
                <Hero3DScene />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

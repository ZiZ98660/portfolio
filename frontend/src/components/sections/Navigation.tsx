'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faCode,
  faChartLine,
  faLaptopCode,
  faBriefcase,
  faFolderOpen,
  faGraduationCap,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when scrolling (only if menu is open)
  useEffect(() => {
    if (isMobileMenuOpen) {
      let scrollTimeout: NodeJS.Timeout;
      const handleScroll = () => {
        // Debounce scroll to prevent rapid toggling
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          setIsMobileMenuOpen(false);
        }, 100);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        clearTimeout(scrollTimeout);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: '#impact', label: 'Impact', icon: faChartLine },
    { href: '#skills', label: 'Skills', icon: faLaptopCode },
    { href: '#experience', label: 'Experience', icon: faBriefcase },
    { href: '#projects', label: 'Projects', icon: faFolderOpen },
    { href: '#education', label: 'Education', icon: faGraduationCap },
    { href: '#contact', label: 'Contact', icon: faEnvelope },
  ];

  return (
    <nav
      className={`w-full z-[9999] transition-all duration-300 ${
        // On mobile: relative to push content down, on desktop: fixed
        isMobileMenuOpen ? 'relative md:fixed' : 'fixed top-0 left-0 right-0'
      } ${
        isScrolled || isMobileMenuOpen
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16 relative z-[10000]">
          <motion.a
            href="#"
            className="font-heading text-lg sm:text-xl md:text-[1.25rem] font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2 relative z-[10001]"
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faCode} className="text-purple-400" />
            <span className="hidden sm:inline">Portfolio</span>
            <span className="sm:hidden">PF</span>
          </motion.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-sm sm:text-base md:text-base text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2 group"
              >
                <FontAwesomeIcon icon={item.icon} className="text-xs sm:text-sm text-purple-400 group-hover:text-purple-300 transition-colors" />
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors relative z-[10001] cursor-pointer touch-manipulation pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const willOpen = !isMobileMenuOpen;
              
              // If opening the menu, instantly scroll to top first, then open menu
              if (willOpen) {
                // Instant scroll to top
                window.scrollTo({ top: 0, behavior: 'auto' });
                // Use requestAnimationFrame to ensure scroll completes before opening menu
                requestAnimationFrame(() => {
                  setIsMobileMenuOpen(true);
                });
              } else {
                setIsMobileMenuOpen(false);
              }
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
            aria-label="Toggle menu"
            type="button"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="text-lg sm:text-xl" />
            </motion.div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 pt-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.05,
                      ease: 'easeOut'
                    }}
                  >
                    <a
                      href={item.href}
                      className="block px-4 py-3 text-sm sm:text-base md:text-base text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-3 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FontAwesomeIcon 
                        icon={item.icon} 
                        className="text-xs sm:text-sm text-purple-400 group-hover:text-purple-300 transition-colors" 
                      />
                      <span className="font-medium">{item.label}</span>
                    </a>
                    {/* Faint divider line - don't show after last item */}
                    {index < navItems.length - 1 && (
                      <div className="mx-4 border-t border-white/10"></div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}


'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faBriefcase,
  faUser,
  faChartBar,
  faCode,
  faBriefcase as faWork,
  faGraduationCap,
  faAward,
  faLink,
  faSignOutAlt,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

export function Layout({ children }: { children: React.ReactNode }) {
  const { admin, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on window resize (if becomes desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: faChartLine },
    { href: '/projects', label: 'Projects', icon: faBriefcase },
    { href: '/personal-info', label: 'Personal Info', icon: faUser },
    { href: '/impact-metrics', label: 'Impact Metrics', icon: faChartBar },
    { href: '/technical-skills', label: 'Technical Skills', icon: faCode },
    { href: '/experiences', label: 'Experience', icon: faWork },
    { href: '/educations', label: 'Education', icon: faGraduationCap },
    { href: '/certifications', label: 'Certifications', icon: faAward },
    { href: '/social-links', label: 'Social Links', icon: faLink },
  ];

  return (
    <div className="min-h-screen relative z-10">
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 text-white backdrop-blur-sm border-b border-purple-500/20 z-50 h-16">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex-1 min-w-0">
            <h1 className="font-heading text-base font-bold truncate">Portfolio Admin</h1>
            <p className="font-body text-xs text-gray-400 truncate">{admin?.username}</p>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-purple-900/30 rounded-lg transition-colors flex-shrink-0 ml-2"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 text-white backdrop-blur-sm border-r border-purple-500/20 z-50 transition-transform duration-300 flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-purple-500/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="font-heading text-xl md:text-2xl font-bold">Portfolio Admin</h1>
              <p className="font-body text-xs md:text-sm text-gray-400 mt-1">Welcome, {admin?.username}</p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-2 hover:bg-purple-900/30 rounded-lg transition-colors flex-shrink-0 ml-2"
              aria-label="Close menu"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 mx-2 rounded-lg hover:bg-purple-900/30 transition-colors ${
                pathname === item.href ? 'bg-purple-900/40 border-l-4 border-purple-400' : ''
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span className="font-body text-sm md:text-base">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer - Logout */}
        <div className="p-6 border-t border-purple-500/20 flex-shrink-0">
          <button
            onClick={handleLogout}
            className="font-button w-full px-4 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pt-16 md:pt-0 p-4 md:p-6 lg:p-8 relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}


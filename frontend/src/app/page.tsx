'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import ImpactMetrics from '@/components/sections/ImpactMetrics';
import SkillsMarquee from '@/components/sections/SkillsMarquee';
import ExperienceTimeline from '@/components/sections/ExperienceTimeline';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

// Lazy load heavy components for better performance
const ProjectsBento = dynamic(() => import('@/components/sections/ProjectsBento'), {
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><div className="text-gray-400">Loading projects...</div></div>,
  ssr: true,
});

const VideoSection = dynamic(() => import('@/components/sections/VideoSection'), {
  loading: () => <div className="min-h-[300px]"></div>,
  ssr: true,
});

const Education = dynamic(() => import('@/components/sections/Education'), {
  loading: () => <div className="min-h-[300px]"></div>,
  ssr: true,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white relative overflow-hidden">
        {/* Base Animated Glowing Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Subtle base grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px] opacity-30"></div>
        </div>
        
        <div className="relative z-10">
          <Navigation />
          
          <main>
            <Hero show3D={true} />
            <div className="border-t border-white/10"></div>
            <ImpactMetrics />
            <div className="border-t border-white/10"></div>
            <SkillsMarquee />
            <div className="border-t border-white/10"></div>
            <ExperienceTimeline />
            <div className="border-t border-white/10"></div>
            <ProjectsBento />
            <div className="border-t border-white/10"></div>
            <VideoSection />
            <div className="border-t border-white/10"></div>
            <Education />
            <div className="border-t border-white/10"></div>
            <Contact />
          </main>

          <Footer />
        </div>
      </div>
  );
}

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
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-50 text-slate-800 relative overflow-hidden">
      {/* Base Animated Glowing Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Subtle base grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:100px_100px] opacity-50"></div>
      </div>

      <div className="relative z-10">
        <Navigation />

        <main>
          <Hero show3D={false} />
          <div className="border-t border-slate-200"></div>
          <ImpactMetrics />
          <div className="border-t border-slate-200"></div>
          <SkillsMarquee />
          <div className="border-t border-slate-200"></div>
          <ExperienceTimeline />
          <div className="border-t border-slate-200"></div>
          <ProjectsBento />
          <div className="border-t border-slate-200"></div>
          <Education />
          <div className="border-t border-slate-200"></div>
          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
}

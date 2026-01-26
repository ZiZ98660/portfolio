'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        // Auto-play may be blocked by browser, but video will play when user interacts
        console.log('Auto-play prevented:', error);
      });
    }
  }, []);

  return (
    <section id="showcase" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
              <h2 className="font-heading text-2xl sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Technologies & Languages
              </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
              <p className="font-body text-gray-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto">
                A visual journey through the technologies and programming languages I work with
              </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/50 via-blue-900/30 to-gray-900/50"
        >
          <video
            ref={videoRef}
            src="/image/video_019aaaed-8d1c-7225-8741-61aab2f4a4e0.mp4"
            className="w-full h-auto"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            style={{
              opacity: 0.85,
            }}
          />
          {/* Subtle gradient overlay to blend with background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/20 pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
}


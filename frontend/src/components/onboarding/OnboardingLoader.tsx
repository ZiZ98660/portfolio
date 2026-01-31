'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingText from '../ui/TypingText';

interface OnboardingSlide {
  text: string;
  emoji?: string;
  delay?: number;
}

const slides: OnboardingSlide[] = [
  {
    text: 'Building modern health-tech software',
    emoji: '🩺',
    delay: 0,
  },
  {
    text: 'Reliable systems. Safer workflows. Better outcomes.',
    emoji: '🧬',
    delay: 2000,
  },
  {
    text: 'Automation + data quality + patient-focused UX',
    emoji: '📈',
    delay: 4000,
  },
  {
    text: 'Let’s ship clean, compliant, and scalable products',
    emoji: '✅',
    delay: 6000,
  },
];

export default function OnboardingLoader({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Initialize on mount only once
  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
    }
  }, [hasStarted]);

  // Reset states when slide changes
  useEffect(() => {
    if (hasStarted) {
      setIsTypingComplete(false);
    }
  }, [currentSlide, hasStarted]);

  // Handle slide progression
  useEffect(() => {
    if (isTypingComplete && currentSlide < slides.length - 1) {
      // Wait a bit after typing completes, then move to next slide
      const nextSlideTimer = setTimeout(() => {
        setCurrentSlide((prev) => prev + 1);
      }, 1500);

      return () => clearTimeout(nextSlideTimer);
    } else if (isTypingComplete && currentSlide === slides.length - 1) {
      // Last slide - wait then mark as complete
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
        // Small delay before calling onComplete to ensure smooth exit
        setTimeout(() => {
          onComplete();
        }, 500);
      }, 2000);

      return () => clearTimeout(completeTimer);
    }
  }, [isTypingComplete, currentSlide, onComplete]);

  const currentSlideData = slides[currentSlide];

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full flex items-center justify-center"
            >
        {/* Animated background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-sky-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          {/* Subtle Health-tech Visual (no external images) */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 18, duration: 0.7 }}
            className="relative w-full max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl mb-6 sm:mb-8 md:mb-12"
          >
            {/* Glowing border effect */}
            <motion.div
              className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-sky-500/35 via-cyan-500/35 to-blue-500/35 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl"
              animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.03, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
              className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Subtle grid + ECG-ish line */}
              <div className="relative h-40 sm:h-48 md:h-56">
                <div className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                <motion.div
                  className="absolute left-0 right-0 top-1/2 -translate-y-1/2 px-6"
                  animate={{ opacity: [0.55, 0.85, 0.55] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
                  <div className="mt-3 flex items-center justify-center gap-3 text-white/80 text-sm sm:text-base font-semibold">
                    <span className="tracking-wide">Health-tech</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" />
                    <span className="tracking-wide">Engineering</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text with Typing Animation and 3D Emoji */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
            className="text-center"
          >
            <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 flex flex-wrap items-center justify-center gap-0.5 sm:gap-1 px-2">
              {/* 3D Emoji */}
              <motion.div
                className="relative flex-shrink-0 overflow-visible"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.5,
                }}
              >
                <motion.div
                  animate={{
                    rotateY: [0, 15, -15, 0],
                    rotateX: [0, 8, -8, 0],
                    rotateZ: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                  className="relative"
                >
                  <motion.span
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl block relative z-10"
                    style={{
                      filter: "drop-shadow(0 10px 30px rgba(14, 165, 233, 0.45)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.35))",
                      textShadow: "0 0 30px rgba(14, 165, 233, 0.55), 0 0 60px rgba(6, 182, 212, 0.35)",
                    }}
                    animate={{
                      scale: [1, 1.15, 1],
                      filter: [
                        "drop-shadow(0 10px 30px rgba(14, 165, 233, 0.45)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.35))",
                        "drop-shadow(0 15px 40px rgba(6, 182, 212, 0.5)) drop-shadow(0 0 30px rgba(14, 165, 233, 0.45))",
                        "drop-shadow(0 10px 30px rgba(14, 165, 233, 0.45)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.35))",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {currentSlideData.emoji || '🩺'}
                  </motion.span>
                  
                  {/* 3D Depth Effect - Glow rings - constrained to not overflow */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-sky-500/40 via-cyan-500/40 to-blue-500/40 rounded-full blur-lg -z-10"
                    style={{ 
                      width: '120%', 
                      height: '120%', 
                      left: '-10%', 
                      top: '-10%',
                      pointerEvents: 'none'
                    }}
                  />
                  
                  {/* Additional depth layer - more constrained */}
                  <motion.div
                    animate={{
                      scale: [1, 1.25, 1],
                      opacity: [0.1, 0.25, 0.1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="absolute bg-gradient-to-br from-sky-500/30 via-cyan-500/30 to-blue-500/30 rounded-full blur-xl -z-20"
                    style={{ 
                      width: '140%', 
                      height: '140%', 
                      left: '-20%', 
                      top: '-20%',
                      pointerEvents: 'none'
                    }}
                  />
                </motion.div>
              </motion.div>

              {/* Typing Text */}
              <TypingText
                text={currentSlideData.text}
                speed={30}
                className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent flex-shrink-0 text-center"
                showCursor={true}
                onComplete={() => setIsTypingComplete(true)}
              />
            </h2>
          </motion.div>

          {/* Progress Indicators */}
          <div className="flex gap-1.5 sm:gap-2 md:gap-3 mt-6 sm:mt-8 md:mt-12">
            {slides.map((_, index) => (
              <motion.div
                key={index}
                className={`h-1.5 sm:h-2 md:h-2.5 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 w-6 sm:w-8 md:w-12'
                    : index < currentSlide
                    ? 'bg-sky-500/50 w-1.5 sm:w-2 md:w-2.5'
                    : 'bg-white/20 w-1.5 sm:w-2 md:w-2.5'
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
      )}
    </AnimatePresence>
  );
}

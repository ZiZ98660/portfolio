'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TypingText from '../ui/TypingText';

interface OnboardingSlide {
  image: string;
  text: string;
  emoji: string;
  delay?: number;
}

const slides: OnboardingSlide[] = [
  {
    image: '/onboarding_pic/welcome.png',
    text: 'Welcome to my digital universe',
    emoji: '✨',
    delay: 0,
  },
  {
    image: '/onboarding_pic/portfolio_journey.png',
    text: 'Where innovation meets creativity',
    emoji: '🚀',
    delay: 2000,
  },
  {
    image: '/onboarding_pic/about me.png',
    text: 'Crafting solutions with passion',
    emoji: '💡',
    delay: 4000,
  },
  {
    image: '/onboarding_pic/project.png',
    text: 'Explore my world of possibilities',
    emoji: '🌟',
    delay: 6000,
  },
];

export default function OnboardingLoader({ onComplete }: { onComplete: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Initialize on mount only once
  useEffect(() => {
    if (!hasStarted) {
      setHasStarted(true);
      setShowImage(true);
    }
  }, [hasStarted]);

  // Reset states when slide changes
  useEffect(() => {
    if (hasStarted) {
      setShowImage(false);
      setIsTypingComplete(false);
      
      // Show image first, then start typing
      const imageTimer = setTimeout(() => {
        setShowImage(true);
      }, 300);

      return () => clearTimeout(imageTimer);
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
            className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-purple-500/20 rounded-full blur-3xl"
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
          {/* Image Container with Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={showImage ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.8,
            }}
            className="relative w-full max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-xl mb-6 sm:mb-8 md:mb-12"
          >
            {/* Glowing border effect */}
            <motion.div
              className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-purple-500/50 via-pink-500/50 to-blue-500/50 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Image with floating animation */}
            <motion.div
              className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border border-white/10 sm:border-2"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <img
                src={currentSlideData.image}
                alt={currentSlideData.text}
                className="w-full h-auto object-cover"
                loading="eager"
              />
              
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Decorative sparkles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + i * 30}%`,
                  left: i % 2 === 0 ? '10%' : '85%',
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              >
                <span className="text-2xl sm:text-3xl">✨</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Text with Typing Animation and 3D Emoji */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showImage ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                animate={showImage ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
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
                      filter: "drop-shadow(0 10px 30px rgba(139, 92, 246, 0.5)) drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))",
                      textShadow: "0 0 30px rgba(139, 92, 246, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)",
                    }}
                    animate={{
                      scale: [1, 1.15, 1],
                      filter: [
                        "drop-shadow(0 10px 30px rgba(139, 92, 246, 0.5)) drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))",
                        "drop-shadow(0 15px 40px rgba(236, 72, 153, 0.6)) drop-shadow(0 0 30px rgba(139, 92, 246, 0.5))",
                        "drop-shadow(0 10px 30px rgba(139, 92, 246, 0.5)) drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {currentSlideData.emoji}
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
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-pink-500/40 to-blue-500/40 rounded-full blur-lg -z-10"
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
                    className="absolute bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-xl -z-20"
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
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent flex-shrink-0 text-center"
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
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-6 sm:w-8 md:w-12'
                    : index < currentSlide
                    ? 'bg-purple-500/50 w-1.5 sm:w-2 md:w-2.5'
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

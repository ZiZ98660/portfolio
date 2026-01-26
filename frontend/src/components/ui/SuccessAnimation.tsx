'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faStar } from '@fortawesome/free-solid-svg-icons';

interface SuccessAnimationProps {
  isVisible: boolean;
  onClose?: () => void;
  message?: string;
  showBackButton?: boolean;
}

export default function SuccessAnimation({ 
  isVisible, 
  onClose, 
  message = "You're subscribed!",
  showBackButton = true 
}: SuccessAnimationProps) {

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center py-8"
        >
          {/* 3D Thumb Container */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 mb-6">
            {/* Main 3D Thumb Image with Animation */}
            <motion.div
              initial={{ y: 100, rotate: -20, scale: 0.5 }}
              animate={{ 
                y: 0, 
                rotate: 0,
                scale: [1, 1.15, 1],
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
                scale: {
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1,
                }
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* 3D Thumb Image with 3D rotation effect */}
              <motion.div
                animate={{ 
                  rotateY: [0, 15, -15, 0],
                  rotateX: [0, 8, -8, 0],
                  rotateZ: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ 
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                className="relative w-full h-full"
              >
                {/* 3D Thumb - Using large emoji with 3D effects */}
                <motion.div
                  className="w-full h-full flex items-center justify-center text-8xl sm:text-9xl md:text-[12rem] leading-none"
                  style={{
                    filter: "drop-shadow(0 20px 40px rgba(102, 126, 234, 0.4))",
                    textShadow: "0 10px 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)",
                  }}
                  animate={{
                    filter: [
                      "drop-shadow(0 20px 40px rgba(102, 126, 234, 0.4))",
                      "drop-shadow(0 25px 50px rgba(118, 75, 162, 0.5))",
                      "drop-shadow(0 20px 40px rgba(102, 126, 234, 0.4))",
                    ],
                    textShadow: [
                      "0 10px 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)",
                      "0 15px 40px rgba(34, 197, 94, 0.7), 0 0 80px rgba(34, 197, 94, 0.5)",
                      "0 10px 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)",
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  👍
                </motion.div>
                
                {/* 3D Depth Effect - Multiple glow rings for depth */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-violet-500/40 via-purple-500/40 to-fuchsia-500/40 rounded-full blur-2xl -z-10"
                />
                
                {/* Additional depth layer */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl -z-20"
                />
              </motion.div>
            </motion.div>

            {/* Floating Sparkles */}
            {[...Array(3)].map((_, i) => {
              const positions = [
                { x: -30, y: -20 },
                { x: 30, y: -30 },
                { x: 0, y: 30 }
              ];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: positions[i].x,
                    y: positions[i].y,
                    rotate: [0, 180],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <FontAwesomeIcon 
                    icon={faStar} 
                    className="text-yellow-400 text-lg sm:text-xl"
                  />
                </motion.div>
              );
            })}

            {/* Check Circle Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.4
              }}
              className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-2 shadow-lg"
            >
              <FontAwesomeIcon 
                icon={faCheckCircle} 
                className="text-white text-sm sm:text-base"
              />
            </motion.div>
          </div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              {message}
            </h3>
            <p className="font-body text-sm sm:text-base text-gray-300 mb-6">
              Thanks for subscribing! We'll keep you updated.
            </p>
            
            {showBackButton && onClose && (
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-body text-sm sm:text-base text-gray-400 hover:text-white underline transition-colors"
              >
                Subscribe another email
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


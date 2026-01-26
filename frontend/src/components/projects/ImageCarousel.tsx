'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getImagePath, isValidImagePath } from '@/lib/imageUtils';

interface ImageCarouselProps {
  images: readonly string[] | string[];
  projectTitle: string;
}

// Helper function to properly encode image paths for consistent server/client rendering
const encodeImagePath = (path: string): string => {
  // Use the centralized image utility to ensure correct paths
  // No validation or logging - just normalize the path
  const normalizedPath = getImagePath(path);
  return normalizedPath;
};

export default function ImageCarousel({ images, projectTitle }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // No validation logging - paths are handled correctly


  // Auto-scroll functionality
  useEffect(() => {
    if (!isFullscreen) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }
  }, [images.length, isFullscreen]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <>
      {/* Carousel Preview */}
      <div 
        ref={carouselRef}
        className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-white/5 border border-white/10 group cursor-pointer"
        onClick={() => setIsFullscreen(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {images.length > 0 && (() => {
              // Get the current image path and ensure it's correct
              let imagePath = images[currentIndex];
              
              // Runtime fix: If we detect old Screenshot path, try to map it to correct path
              if (imagePath && imagePath.includes('Screenshot')) {
                // Try to map old path to correct path based on project and index
                if (imagePath.includes('project_asi')) {
                  // Map based on current index (0-3 for ASI project)
                  const asiImages = ['/project_asi/img1.png', '/project_asi/img2.png', '/project_asi/img3.png', '/project_asi/img4.png'];
                  imagePath = asiImages[currentIndex] || asiImages[0];
                } else if (imagePath.includes('project_cipha')) {
                  // Map based on current index (0-2 for CipherPool project)
                  const ciphaImages = ['/project_cipha/img5.png', '/project_cipha/img6.png', '/project_cipha/img7.png'];
                  imagePath = ciphaImages[currentIndex] || ciphaImages[0];
                }
              }
              
              const finalPath = encodeImagePath(imagePath);
              
              return (
                <img
                  key={`${currentIndex}-${finalPath}`}
                  src={finalPath}
                  alt={`${projectTitle} ${currentIndex + 1}`}
                  className="w-full h-full object-contain"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Show a placeholder instead of hiding
                    target.style.display = 'block';
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not found%3C/text%3E%3C/svg%3E';
                  }}
                />
              );
            })()}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
                </button>
                <span className="text-white text-sm font-semibold bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                  {currentIndex + 1} / {images.length}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-purple-400 w-6'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-6xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-50 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all text-white"
              >
                <FontAwesomeIcon icon={faTimes} className="text-xl" />
              </button>

              {/* Fullscreen Carousel */}
              <div className="relative w-full h-[95vh] max-w-[95vw] rounded-xl overflow-hidden bg-white/5 border border-white/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={false}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {(() => {
                      // Get the current image path and ensure it's correct
                      let imagePath = images[currentIndex];
                      
                      // Runtime fix: If we detect old Screenshot path, try to map it to correct path
                      if (imagePath && imagePath.includes('Screenshot')) {
                        if (imagePath.includes('project_asi')) {
                          // Map based on current index (0-3 for ASI project)
                          const asiImages = ['/project_asi/img1.png', '/project_asi/img2.png', '/project_asi/img3.png', '/project_asi/img4.png'];
                          imagePath = asiImages[currentIndex] || asiImages[0];
                        } else if (imagePath.includes('project_cipha')) {
                          // Map based on current index (0-2 for CipherPool project)
                          const ciphaImages = ['/project_cipha/img5.png', '/project_cipha/img6.png', '/project_cipha/img7.png'];
                          imagePath = ciphaImages[currentIndex] || ciphaImages[0];
                        }
                      }
                      
                      const finalPath = encodeImagePath(imagePath);
                      
                      return (
                        <img
                          key={`fullscreen-${currentIndex}-${finalPath}`}
                          src={finalPath}
                          alt={`${projectTitle} ${currentIndex + 1}`}
                          className="max-w-full max-h-full w-auto h-auto object-contain"
                          loading="eager"
                          style={{ maxWidth: '95vw', maxHeight: '95vh' }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage not found%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-4 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all text-white z-10"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="text-2xl" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-4 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all text-white z-10"
                >
                  <FontAwesomeIcon icon={faChevronRight} className="text-2xl" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-semibold">
                  {currentIndex + 1} / {images.length}
                </div>

                {/* Thumbnail Strip */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentIndex
                          ? 'border-purple-400 scale-110'
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <img
                        src={encodeImagePath(img)}
                        alt={`Thumbnail ${index + 1}`}
                        className="object-cover w-full h-full"
                        loading="eager"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


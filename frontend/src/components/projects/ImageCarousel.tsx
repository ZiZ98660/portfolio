'use client';
 
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getImagePath } from '@/lib/imageUtils';
 
interface ImageCarouselProps {
  images: readonly string[] | string[];
  projectTitle: string;
}
 
export default function ImageCarousel({ images, projectTitle }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
 
  useEffect(() => {
    if (!isFullscreen && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 4000);
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
 
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
 
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
 
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) goToNext();
    if (distance < -50) goToPrevious();
  };
 
  return (
    <>
      {/* Carousel Preview */}
      <div 
        className="relative w-full h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden bg-slate-400 border border-slate-300 group cursor-pointer"
        onClick={() => setIsFullscreen(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-400 to-slate-500"
          >
            <img
              src={getImagePath(images[currentIndex])}
              alt={`${projectTitle} screenshot ${currentIndex + 1}`}
              className="w-full h-full object-contain"
              style={{
                filter: 'brightness(1.12) contrast(1.12)',
                imageRendering: 'crisp-edges'
              }}
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
 
        {/* Navigation Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="p-3 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/40 transition-all shadow-lg border border-white/15"
              aria-label="Previous image"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-white text-lg" />
            </button>
            <span className="text-white text-sm font-semibold bg-black/40 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/15">
              {currentIndex + 1} / {images.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="p-3 bg-black/30 backdrop-blur-md rounded-full hover:bg-black/40 transition-all shadow-lg border border-white/15"
              aria-label="Next image"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-white text-lg" />
            </button>
          </div>
        </div>
 
        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`transition-all rounded-full ${
                index === currentIndex
                  ? 'bg-sky-500 w-6 h-2'
                  : 'bg-white/55 w-2 h-2 hover:bg-white/75'
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
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="fixed top-6 right-6 z-[10000] p-4 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/30 transition-all shadow-xl border border-white/15"
              aria-label="Close fullscreen"
            >
              <FontAwesomeIcon icon={faTimes} className="text-white text-2xl" />
            </button>
 
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src={getImagePath(images[currentIndex])}
                    alt={`${projectTitle} screenshot ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                    style={{
                      filter: 'brightness(1.15) contrast(1.15)',
                      imageRendering: 'crisp-edges',
                      maxWidth: '90vw',
                      maxHeight: '85vh'
                    }}
                    loading="eager"
                  />
                </motion.div>
              </AnimatePresence>
 
              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="fixed left-6 top-1/2 transform -translate-y-1/2 p-4 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/30 transition-all shadow-xl border border-white/15 z-[10000]"
                aria-label="Previous image"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="text-white text-2xl" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="fixed right-6 top-1/2 transform -translate-y-1/2 p-4 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/30 transition-all shadow-xl border border-white/15 z-[10000]"
                aria-label="Next image"
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-white text-2xl" />
              </button>
 
              {/* Image Counter */}
              <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-black/75 backdrop-blur-lg px-6 py-3 rounded-full shadow-xl border border-white/15 z-[10000]">
                <span className="text-white text-base font-semibold">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>
 
              {/* Thumbnail Strip */}
              <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 max-w-[90vw] overflow-x-auto px-4 py-2 bg-black/65 backdrop-blur-lg rounded-full shadow-xl border border-white/15 z-[10000]">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(index);
                    }}
                    className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex
                        ? 'border-sky-400 scale-110 shadow-lg'
                        : 'border-white/45 hover:border-white/75 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={getImagePath(img)}
                      alt={`Thumbnail ${index + 1}`}
                      className="object-cover w-full h-full"
                      style={{ filter: 'brightness(1.08)' }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
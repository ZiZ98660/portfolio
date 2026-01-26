'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface AvatarDisplayProps {
  imageUrl?: string;
  name?: string;
  title?: string;
}

export default function AvatarDisplay({ 
  imageUrl = '/assets/pro.jpg', 
  name = 'Your Name',
  title = 'Full Stack Developer'
}: AvatarDisplayProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-64 h-64 mx-auto"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl"
        animate={{
          rotateY: isHovered ? 360 : 0,
          boxShadow: isHovered 
            ? '0 0 30px rgba(59, 130, 246, 0.6)' 
            : '0 0 20px rgba(59, 130, 246, 0.3)'
        }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          priority
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />
      </motion.div>
      
      <motion.div
        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center w-full"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{name}</h3>
        <p className="text-sm text-gray-300 mt-1">{title}</p>
      </motion.div>
    </motion.div>
  );
}


'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="font-body text-sm sm:text-base text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with expertise in modern web technologies. 
              I love creating beautiful, functional, and user-friendly applications that solve 
              real-world problems.
            </p>
            <p className="font-body text-sm sm:text-base text-gray-300 leading-relaxed">
              With a strong foundation in both frontend and backend development, I bring 
              creative solutions to complex challenges. My work combines technical excellence 
              with an eye for design.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="font-body px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm sm:text-base text-gray-300">
                Problem Solver
              </span>
              <span className="font-body px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm sm:text-base text-gray-300">
                Team Player
              </span>
              <span className="font-body px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-sm sm:text-base text-gray-300">
                Continuous Learner
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: '50+', label: 'Projects Completed' },
              { number: '3+', label: 'Years Experience' },
              { number: '100%', label: 'Client Satisfaction' },
              { number: '24/7', label: 'Available Support' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-center"
                whileHover={{ scale: 1.05, borderColor: 'rgba(147, 51, 234, 0.5)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                  {stat.number}
                </div>
                <div className="font-body text-sm sm:text-base text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


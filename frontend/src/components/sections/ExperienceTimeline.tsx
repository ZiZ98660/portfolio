'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBriefcase, 
  faMapMarkerAlt,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { experience } from '@/data/portfolio';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 px-4 relative overflow-hidden">
      {/* Section-specific glowing background - Emerald/Teal theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-emerald-500/25 via-teal-500/20 to-transparent rounded-full blur-[140px] animate-glow-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 via-emerald-400/15 to-transparent rounded-full blur-[120px] animate-glow-pulse-delayed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-[100px] animate-float-slow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-start ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-gray-900 transform md:-translate-x-1/2 z-10"></div>

                {/* Content card */}
                <div
                  className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <motion.div 
                    className="group relative"
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* AWS-style glowing shadow underneath - appears on hover */}
                    <div className="absolute -inset-0.5 bg-gradient-to-br from-emerald-500/0 via-teal-500/0 to-cyan-500/0 group-hover:from-emerald-500/40 group-hover:via-teal-500/35 group-hover:to-cyan-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    
                    <div className="p-6 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 hover:border-white/30 transition-all relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-lg">
                        <FontAwesomeIcon icon={faBriefcase} className="text-white text-lg sm:text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading text-base sm:text-lg md:text-[1.125rem] font-bold text-white mb-1">{exp.role}</h3>
                        <p className="font-body text-sm sm:text-base text-purple-400 font-semibold">{exp.company}</p>
                        <div className="font-body flex items-center gap-2 text-gray-400 text-xs sm:text-sm mt-1">
                          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xs sm:text-sm" />
                          <span>{exp.location}</span>
                        </div>
                        <span className="inline-block mt-2 px-3 py-1.5 sm:py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs sm:text-sm font-semibold">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <ul className="space-y-2 mt-4">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="font-body text-gray-300 text-sm sm:text-base flex items-start">
                          <FontAwesomeIcon 
                            icon={faCheckCircle} 
                            className="text-purple-400 mr-2 mt-0.5 text-xs sm:text-sm" 
                          />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

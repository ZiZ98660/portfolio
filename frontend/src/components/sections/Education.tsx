'use client';

import { motion } from 'framer-motion';
import { education, certifications } from '@/data/portfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faCertificate,
  faUniversity,
  faAward,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

export default function Education() {
  return (
    <section id="education" className="py-20 px-4 relative overflow-hidden">
      {/* Section-specific glowing background - Orange/Amber theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-orange-500/25 via-amber-500/20 to-transparent rounded-full blur-[150px] animate-glow-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[700px] h-[700px] bg-gradient-to-br from-yellow-500/20 via-orange-400/15 to-transparent rounded-full blur-[130px] animate-glow-pulse-delayed"></div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] animate-float-slow"></div>
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
            Education & Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="font-heading text-lg sm:text-xl md:text-[1.25rem] font-bold text-white mb-6 flex items-center gap-3">
              <FontAwesomeIcon icon={faGraduationCap} className="text-purple-400 text-base sm:text-lg" />
              Education
            </h3>
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* AWS-style glowing shadow underneath - appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 translate-y-4 scale-105"></div>
                
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-6 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 hover:border-white/30 transition-all relative z-10"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-lg">
                      <FontAwesomeIcon icon={faGraduationCap} className="text-white text-lg sm:text-xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-heading text-base sm:text-lg md:text-[1.125rem] font-bold text-white">{edu.degree}</h4>
                        <span className="px-3 py-1.5 sm:py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs sm:text-sm font-semibold">
                          {edu.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm sm:text-base text-purple-400 font-semibold mb-2">
                        <FontAwesomeIcon icon={faUniversity} className="text-xs sm:text-sm" />
                        <span>{edu.institution}</span>
                      </div>
                      <div className="font-body flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                        <FontAwesomeIcon icon={faCalendarAlt} className="text-xs sm:text-sm" />
                        <span>{edu.period}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="font-heading text-lg sm:text-xl md:text-[1.25rem] font-bold text-white mb-6 flex items-center gap-3">
              <FontAwesomeIcon icon={faCertificate} className="text-purple-400 text-base sm:text-lg" />
              Certifications
            </h3>
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* AWS-style glowing shadow underneath - appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 translate-y-4 scale-105"></div>
                
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-6 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 hover:border-white/30 transition-all relative z-10"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-lg">
                      <FontAwesomeIcon icon={faAward} className="text-white text-lg sm:text-xl" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-heading text-base sm:text-lg md:text-[1.125rem] font-bold text-white mb-2">{cert.name}</h4>
                      <p className="font-body text-sm sm:text-base text-purple-400 font-semibold">{cert.issuer}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}


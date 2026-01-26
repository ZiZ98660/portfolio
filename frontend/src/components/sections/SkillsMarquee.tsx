'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { technicalSkills } from '@/data/portfolio';
import { getTechIcon } from '@/lib/techIcons';
import { 
  faCode, 
  faDesktop, 
  faServer, 
  faDatabase,
  faTools
} from '@fortawesome/free-solid-svg-icons';

const categoryIcons = {
  core: faCode,
  frontend: faDesktop,
  backend: faServer,
  database: faDatabase,
  devops: faTools,
};

const allSkills = [
  ...technicalSkills.core,
  ...technicalSkills.frontend,
  ...technicalSkills.backend,
  ...technicalSkills.database,
  ...technicalSkills.devops,
];

export default function SkillsMarquee() {
  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      {/* Section-specific glowing background - Indigo/Violet theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[750px] h-[750px] bg-gradient-to-br from-indigo-500/25 via-violet-500/20 to-transparent rounded-full blur-[145px] animate-glow-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[650px] h-[650px] bg-gradient-to-br from-purple-500/20 via-indigo-400/15 to-transparent rounded-full blur-[125px] animate-glow-pulse-delayed"></div>
        <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-violet-500/15 rounded-full blur-[110px] animate-float-slow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
        </motion.div>

        {/* Category Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(technicalSkills).map(([category, skills], categoryIndex) => {
            const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons] || faCode;
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="group relative"
              >
                {/* AWS-style glowing shadow underneath - appears on hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500/0 via-violet-500/0 to-purple-500/0 group-hover:from-indigo-500/40 group-hover:via-violet-500/35 group-hover:to-purple-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-6 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 hover:border-white/30 transition-all relative z-10"
                >
                <div className="flex items-center gap-3 mb-4">
                  <FontAwesomeIcon 
                    icon={CategoryIcon} 
                    className="text-purple-400 text-lg sm:text-xl" 
                  />
                  <h3 className="font-heading text-sm sm:text-base md:text-[1.125rem] font-bold text-white capitalize">
                    {category === 'devops' ? 'DevOps/Tools' : category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => {
                    const TechIcon = getTechIcon(skill);
                    return (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-white/5 rounded-full text-xs sm:text-sm text-gray-300 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all flex items-center gap-2 group"
                      >
                        <FontAwesomeIcon 
                          icon={TechIcon} 
                          className="text-purple-400 group-hover:text-purple-300 transition-colors text-xs sm:text-sm" 
                        />
                        {skill}
                      </span>
                    );
                  })}
                </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Infinite Marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{
              x: [0, -50 * allSkills.length * 10],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 50,
                ease: 'linear',
              },
            }}
          >
            {[...allSkills, ...allSkills, ...allSkills].map((skill, index) => {
              const TechIcon = getTechIcon(skill);
              return (
                <div
                  key={`${skill}-${index}`}
                  className="px-6 py-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 text-white font-semibold whitespace-nowrap flex items-center gap-3"
                >
                  <FontAwesomeIcon 
                    icon={TechIcon} 
                    className="text-purple-400 text-sm sm:text-base" 
                  />
                  {skill}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

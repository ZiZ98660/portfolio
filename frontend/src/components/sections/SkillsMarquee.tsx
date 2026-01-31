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
      {/* Section-specific glowing background - Sky/Blue theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-[750px] h-[750px] bg-gradient-to-br from-sky-400/15 via-cyan-400/10 to-blue-400/5 rounded-full blur-[145px] animate-glow-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[650px] h-[650px] bg-gradient-to-br from-cyan-400/12 via-blue-400/8 to-sky-400/5 rounded-full blur-[125px] animate-glow-pulse-delayed"></div>
        <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-blue-400/10 rounded-full blur-[110px] animate-float-slow"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-bold mb-4 bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto"></div>
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
                <div className="absolute -inset-0.5 bg-gradient-to-br from-sky-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-sky-500/30 group-hover:via-cyan-500/25 group-hover:to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-6 bg-white/70 backdrop-blur-md rounded-lg border border-sky-200/60 hover:border-sky-400/70 shadow-lg shadow-slate-900/5 transition-all relative z-10"
                >
                <div className="flex items-center gap-3 mb-4">
                  <FontAwesomeIcon 
                    icon={CategoryIcon} 
                    className="text-sky-500 text-lg sm:text-xl" 
                  />
                  <h3 className="font-heading text-sm sm:text-base md:text-[1.125rem] font-bold text-slate-900 capitalize">
                    {category === 'devops' ? 'DevOps/Tools' : category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => {
                    const TechIcon = getTechIcon(skill);
                    return (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-white/70 rounded-full text-xs sm:text-sm text-slate-700 border border-sky-200/60 hover:bg-white hover:border-sky-400/60 transition-all flex items-center gap-2 group"
                      >
                        <FontAwesomeIcon 
                          icon={TechIcon} 
                          className="text-sky-500 group-hover:text-sky-400 transition-colors text-xs sm:text-sm" 
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
                  className="px-6 py-3 bg-white/70 backdrop-blur-md rounded-lg border border-sky-200/60 text-slate-800 font-semibold whitespace-nowrap flex items-center gap-3 shadow-md shadow-slate-900/5"
                >
                  <FontAwesomeIcon 
                    icon={TechIcon} 
                    className="text-sky-500 text-sm sm:text-base" 
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

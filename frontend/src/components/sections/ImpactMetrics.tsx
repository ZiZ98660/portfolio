'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faRobot, 
  faHospital, 
  faStar,
  faPercentage
} from '@fortawesome/free-solid-svg-icons';
import { impactMetrics } from '@/data/portfolio';

function useCountUp(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration, start]);

  return { count, ref };
}

const metricIcons = [
  faRobot,      // eBay Automation
  faChartLine,  // SMS Automation
  faHospital,   // UCH Error Reduction
  faStar,       // Upwork Success
];

export default function ImpactMetrics() {
  return (
    <section id="impact" className="py-20 px-4 relative overflow-hidden">
      {/* Section-specific glowing background - Blue/Purple theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/25 via-purple-500/20 to-transparent rounded-full blur-[150px] animate-glow-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 via-blue-400/15 to-transparent rounded-full blur-[120px] animate-glow-pulse-delayed"></div>
        <div className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[100px] animate-float-slow"></div>
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
            Impact by the Numbers
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactMetrics.map((metric, index) => {
            const { count, ref } = useCountUp(metric.value, 2000);
            const Icon = metricIcons[index] || faPercentage;
            
            return (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* AWS-style glowing shadow underneath - appears on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${metric.color} rounded-xl blur-xl opacity-0 group-hover:opacity-50 group-hover:via-purple-500/40 group-hover:to-cyan-500/30 transition-opacity duration-500 -z-10`}></div>
                
                <motion.div
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-6 bg-white/5 backdrop-blur-md rounded-lg border border-white/10 hover:border-white/30 transition-all relative z-10"
                >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${metric.color} rounded-lg`}>
                    <FontAwesomeIcon icon={Icon} className="text-white text-lg sm:text-xl" />
                  </div>
                </div>
                <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-bold mb-4 bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {count}{metric.suffix}
                </div>
                <p className="font-body text-gray-300 text-sm sm:text-base leading-relaxed">
                  {metric.label}
                </p>
                <div className={`mt-4 h-1 bg-gradient-to-r ${metric.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

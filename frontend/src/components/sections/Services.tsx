'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptopCode,
  faMobileAlt,
  faPalette,
  faServer,
  faRocket,
  faLightbulb,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

const services = [
  {
    icon: faLaptopCode,
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks and best practices',
    features: ['Responsive Design', 'Performance Optimization', 'SEO Friendly'],
    color: 'from-blue-400 to-cyan-400',
  },
  {
    icon: faMobileAlt,
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications for iOS and Android',
    features: ['Cross-Platform', 'Native Performance', 'App Store Ready'],
    color: 'from-purple-400 to-pink-400',
  },
  {
    icon: faPalette,
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces that enhance user experience',
    features: ['User Research', 'Prototyping', 'Design Systems'],
    color: 'from-pink-400 to-rose-400',
  },
  {
    icon: faServer,
    title: 'Backend Development',
    description: 'Scalable and secure backend systems with RESTful APIs',
    features: ['API Development', 'Database Design', 'Cloud Integration'],
    color: 'from-green-400 to-emerald-400',
  },
  {
    icon: faRocket,
    title: 'DevOps & Deployment',
    description: 'CI/CD pipelines and cloud infrastructure setup',
    features: ['CI/CD Setup', 'Cloud Deployment', 'Monitoring'],
    color: 'from-yellow-400 to-orange-400',
  },
  {
    icon: faLightbulb,
    title: 'Consulting',
    description: 'Technical consulting and architecture guidance for your projects',
    features: ['Technical Review', 'Architecture Planning', 'Code Review'],
    color: 'from-indigo-400 to-purple-400',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-2xl sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-6 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 hover:border-purple-500/50 transition-all group"
            >
              <div className={`p-4 bg-gradient-to-r ${service.color} rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform`}>
                <FontAwesomeIcon icon={service.icon} className="text-white text-xl sm:text-2xl" />
              </div>
              <h3 className="font-heading text-base sm:text-lg md:text-[1.125rem] font-bold mb-3 text-white">{service.title}</h3>
              <p className="font-body text-gray-300 mb-4 text-sm sm:text-base">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="font-body text-sm sm:text-base text-gray-400 flex items-center">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-purple-400 mr-2 text-xs sm:text-sm" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

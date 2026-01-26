import { 
  faJs, 
  faPython, 
  faReact, 
  faNodeJs, 
  faHtml5, 
  faCss3Alt,
  faGitAlt,
  faDocker,
  faAws,
  faFigma,
  faGithub,
  faNpm
} from '@fortawesome/free-brands-svg-icons';
import {
  faCode,
  faDatabase,
  faServer,
  faMobileAlt,
  faCloud,
  faTools,
  faLayerGroup,
  faBolt,
  faLink,
  faCoins,
} from '@fortawesome/free-solid-svg-icons';

// Technology to icon mapping
export const techIconMap: { [key: string]: any } = {
  // Core Languages
  'typescript': faCode,
  'javascript': faJs,
  'python': faPython,
  'rust': faCode,
  
  // Blockchain
  'blockchain': faCoins,
  'anchor': faCode,
  'solana': faCoins,
  
  // Frontend
  'react': faReact,
  'react native': faReact,
  'next.js': faReact,
  'nextjs': faReact,
  'html5': faHtml5,
  'html': faHtml5,
  'css3': faCss3Alt,
  'css': faCss3Alt,
  'tailwind': faCss3Alt,
  
  // Backend
  'node.js': faNodeJs,
  'nodejs': faNodeJs,
  'node': faNodeJs,
  'express': faServer,
  'flask': faPython,
  'solidity': faCode,
  
  // Database
  'mongodb': faDatabase,
  'mysql': faDatabase,
  'postgresql': faDatabase,
  'postgres': faDatabase,
  'database': faDatabase,
  'atlas': faDatabase,
  
  // DevOps/Tools
  'docker': faDocker,
  'kubernetes': faCloud,
  'k8s': faCloud,
  'git': faGitAlt,
  'github': faGithub,
  'aws': faAws,
  'figma': faFigma,
  'cursor': faTools,
  'npm': faNpm,
  'websockets': faBolt,
  'automation': faBolt,
  'scripts': faCode,
  
  // Default
  'default': faCode,
};

export function getTechIcon(techName: string) {
  const normalized = techName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return techIconMap[normalized] || techIconMap[techName.toLowerCase()] || techIconMap['default'];
}


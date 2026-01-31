export const personalInfo = {
  name: 'Sadiq Abdulazeez Adesina',
  title: 'Frontend Developer · Health-tech & SaaS',
  tagline: 'Frontend Developer with 2+ years building fast, scalable, user-focused web applications using React, Next.js, and TypeScript — and a licensed Pharmacist with a strong grasp of clinical workflows. Passionate about digital health, patient-centric interfaces, and clinical usability.',
  email: 'sadiq.aa730@gmail.com',
  phone: '+234 90 4342 0075',
  location: 'Lagos, Nigeria',
};

export const impactMetrics = [
  {
    value: 2,
    suffix: '+',
    label: 'Years building health-tech & SaaS frontends',
    color: 'from-sky-500 to-blue-600',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Focus on component-driven, scalable UIs',
    color: 'from-sky-500 to-cyan-500',
  },
  {
    value: 1,
    suffix: '',
    label: 'Enterprise EMR (ACCESSEMR) in production',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    value: 6,
    suffix: '+',
    label: 'Live applications shipped (Kita, HydroCIS, SendChamp, etc.)',
    color: 'from-sky-400 to-blue-600',
  },
];

export const technicalSkills = {
  core: ['TypeScript', 'JavaScript', 'React', 'Next.js'],
  frontend: ['HTML5', 'CSS', 'Tailwind CSS', 'Redux', 'Context API', 'Zustand'],
  backend: ['Node.js', 'Express.js'],
  database: ['REST APIs', 'GraphQL'],
  devops: ['Git', 'GitHub', 'BitBucket', 'CircleCI', 'Jira', 'Confluence', 'Slack'],
};

export const experience = [
  {
    company: 'Access Providence Health Systems Ltd',
    location: 'Remote (Full-time)',
    role: 'Front-End Developer',
    period: 'Nov 2024 – Present',
    achievements: [
      'Building and maintaining ACCESSEMR, a full-featured Electronic Medical Records system streamlining clinical workflows.',
      'Developed reusable components for patient onboarding/encounters, prescriptions, diagnostics, and SOAP notes.',
      'Implemented Liquid.js templating for SOAP notes, consent forms, and real-time documentation updates.',
      'Integrated editable, condition-driven templates for clinical documents.',
      'Collaborated with cross-functional clinical and technical teams; used TypeScript, Zustand, and REST APIs.',
    ],
  },
  {
    company: 'Federal Inland Revenue Service (FIRS)',
    location: 'Remote (Freelance)',
    role: 'Front-End Developer',
    period: 'Sept 2024 – Nov 2024',
    achievements: [
      'Built dynamic, responsive interfaces using React, TypeScript, and @tanstack/react-table for advanced data table views.',
      'Developed reusable components, project dashboards, role-based access, Gantt-style task views, and PDF export.',
      'Ensured clean, scalable code with React hooks, modular patterns, and responsive design.',
    ],
  },
  {
    company: 'Buff-Knight',
    location: 'Remote (Freelance)',
    role: 'Front-End Developer',
    period: 'Sep 2023 – Dec 2023',
    achievements: [
      'Built a real-time chess platform using Next.js and TypeScript.',
      'Designed and optimized interactive UI for cross-device gameplay.',
    ],
  },
  {
    company: 'SendChamp Inc.',
    location: 'Remote (Full-time)',
    role: 'Front-End Developer',
    period: 'Jan 2023 – Apr 2023',
    achievements: [
      'Built and optimized business communication platforms.',
      'Developed advanced search filters for improved data retrieval.',
    ],
  },
  {
    company: 'PathBuddy.io',
    location: 'Remote (Freelance)',
    role: 'Front-End Developer',
    period: 'Oct 2022 – Dec 2022',
    achievements: [
      'Developed product listing and checkout features.',
      'Ensured scalable UI components using React and TypeScript.',
    ],
  },
  {
    company: 'Soar Digital',
    location: 'Remote (Internship)',
    role: 'Front-End Developer',
    period: 'May 2022 – Dec 2022',
    achievements: [
      'Built interfaces for clients in energy and oil/gas sectors.',
      'Used GraphQL, REST APIs, and graphical charts for business data.',
    ],
  },
];

export type FeaturedProject = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: string;
  featured: boolean;
  liveLink: string;
  githubLink: string;
  screenshots: readonly string[] | string[];
  inProgress?: boolean;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    title: 'ACCESSEMR',
    description: 'Full-featured Electronic Medical Records system streamlining clinical workflows. Reusable components for patient onboarding, encounters, prescriptions, diagnostics, and SOAP notes; Liquid.js templating and condition-driven clinical documents.',
    tech: ['React', 'TypeScript', 'Zustand', 'Liquid.js', 'REST APIs'],
    category: 'web',
    featured: true,
    liveLink: '/showcase/access-emr',
    githubLink: 'https://github.com/accessphs/access-emr',
    screenshots: [
      '/project_emr/img1.png',
      '/project_emr/img2.png',
      '/project_emr/img3.png',
    ] as const,
  },
  {
    id: 2,
    title: 'Kita',
    description: 'Live application for energy/signup flows at Asiko Energy.',
    tech: ['React', 'TypeScript'],
    category: 'web',
    featured: true,
    liveLink: 'https://kita.asikoenergy.com/signup',
    githubLink: '#',
    screenshots: [
      '/project_kita/img1.png',
    ] as const,
  },
  
  {
    id: 3,
    title: 'BodSquare',
    description: 'Live application for BodSquare.',
    tech: ['React', 'TypeScript'],
    category: 'web',
    featured: true,
    liveLink: 'https://bodsquare.com',
    githubLink: '#',
    screenshots: [
      '/project_bod/img1.png',
    ] as const,
  },
  {
    id: 4,
    title: 'SendChamp',
    description: 'Multi-channel business communication platform.',
    tech: ['React', 'TypeScript'],
    category: 'web',
    featured: true,
    liveLink: 'https://sendchamp.com',
    githubLink: '#',
    screenshots: [
      '/project_sc/img1.png',
    ] as const,
  },

];

export const education = [
  {
    degree: 'Bachelor of Pharmacy (B. Pharm)',
    institution: 'University of Ibadan, Nigeria',
    period: 'Feb 2017 – Jun 2024',
    type: 'degree',
  },
  {
    degree: 'Full Stack Web Development Certificate',
    institution: 'Coursera (IBM Collaboration)',
    period: 'Mar 2022 – Jul 2022',
    type: 'certificate',
  },
];

export const certifications = [
  {
    name: 'Full Stack Web Development (React, Node.js, MongoDB)',
    issuer: 'Coursera / IBM',
  },
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/ZiZ98660', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/abduazeez-sadiq-97aaa0209', icon: 'linkedin' },
  { name: 'Email', url: 'mailto:sadiq.aa730@gmail.com', icon: 'envelope' },
];

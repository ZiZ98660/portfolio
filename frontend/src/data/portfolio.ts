export const personalInfo = {
  name: 'Ademola Adesina',
  title: 'Software Engineer with a vision to specialize in blockchain',
  tagline: 'Building scalable backend systems and AI-driven solutions. Currently pursuing a Master\'s in Software Engineering at Quantic School of Business and Technology.',
  email: 'ademolaadesinadev@gmail.com',
  phone: '+2349068406269',
  location: 'Ibadan, Nigeria',
};

export const impactMetrics = [
  {
    value: 70,
    suffix: '%',
    label: 'Reduction in manual effort via eBay Automation Bot',
    color: 'from-blue-400 to-cyan-400',
  },
  {
    value: 80,
    suffix: '%',
    label: 'Automated SMS responses for business clients',
    color: 'from-purple-400 to-pink-400',
  },
  {
    value: 60,
    suffix: '%',
    label: 'Reduction in error recording delays at UCH',
    color: 'from-green-400 to-emerald-400',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Job Success Score on Upwork',
    color: 'from-yellow-400 to-orange-400',
  },
];

export const technicalSkills = {
  core: ['TypeScript', 'JavaScript', 'Python', 'Rust (Learning)'],
  frontend: ['React', 'React Native', 'Next.js', 'HTML5', 'CSS3', 'Tailwind'],
  backend: ['Node.js', 'Express', 'Flask', 'Solidity'],
  database: ['MongoDB (Atlas)', 'MySQL', 'PostgreSQL'],
  devops: ['Docker', 'Kubernetes', 'Git', 'GitHub', 'Cursor', 'Figma'],
};

export const experience = [
  {
    company: 'Handshake AI LLC',
    location: 'San Francisco',
    role: 'AI Trainer / Software Engineer',
    period: '2025–Present',
    achievements: [
      'Collaborating with researchers to refine LLM capabilities',
      'Maintaining a ≥70% task approval rate on Project Canary',
    ],
  },
  {
    company: 'University College Hospital (UCH)',
    location: 'Ibadan, Nigeria',
    role: 'Pharmacist Intern',
    period: '2025–Present',
    achievements: [
      'Designing a Medication Error Reporting App for staff across 5+ departments (Work in Progress)',
      'Replacing paper forms with digital solution (Not yet published)',
    ],
  },
  {
    company: 'Freelance Software Engineer',
    location: 'Remote',
    role: 'Software Engineer',
    period: '2024–Present',
    achievements: [
      'Built automated bots (eBay, SMS text-back)',
      'Collaborated with other developers on Upwork to develop hotel booking systems',
    ],
  },
];

export const featuredProjects = [
  {
    id: 1,
    title: 'ASI Autonomous Agents Platform',
    description: 'A decentralized AI platform where autonomous agents perceive, reason, and act across Web3 systems. Built for the ASI Alliance Hackathon with blockchain integration, real-time agent communication, and production-ready deployment.',
    tech: ['Blockchain', 'Rust', 'Anchor', 'Next.js', 'Flask', 'PostgreSQL'],
    category: 'web3',
    featured: true,
    liveLink: 'https://asi-frontend.onrender.com/',
    githubLink: '#',
    screenshots: [
      '/project_asi/img1.png',
      '/project_asi/img2.png',
      '/project_asi/img3.png',
      '/project_asi/img4.png',
    ] as const,
  },
  {
    id: 2,
    title: 'CipherPool - Encrypted Dark Pool Auctions',
    description: 'MEV-resistant encrypted dark pool batch auctions on Solana. Private trading with end-to-end encryption through Arcium\'s encrypted compute. Built for Arcium x Colosseum Cypherpunk Hackathon 2025 - Encrypt Everything Track.',
    tech: ['Blockchain', 'Rust', 'Anchor', 'Next.js', 'Flask', 'PostgreSQL'],
    category: 'web3',
    featured: true,
    liveLink: 'https://cipherpool-frontend.onrender.com/auctions',
    githubLink: '#',
    screenshots: [
      '/project_cipha/img5.png',
      '/project_cipha/img6.png',
      '/project_cipha/img7.png',
    ] as const,
  },
  {
    id: 3,
    title: 'Medication Error Reporting App',
    description: 'A mobile-first system for UCH staff to report errors in real-time. (Work in Progress - Not yet published)',
    tech: ['React Native', 'Node.js'],
    category: 'mobile',
    featured: true,
    liveLink: '#',
    githubLink: '#',
    inProgress: true,
  },
  {
    id: 4,
    title: 'eBay Automation Bot',
    description: 'Streamlines product research with real-time listing analysis and profit grading.',
    tech: ['Python', 'Node.js', 'Automation Scripts'],
    category: 'web',
    featured: true,
    liveLink: '#',
    githubLink: '#',
  },
  {
    id: 5,
    title: 'Prescripto - Doctor Appointment Platform',
    description: 'MERN stack application with real-time scheduling and patient management. A comprehensive healthcare platform for booking appointments, managing patient records, and streamlining medical workflows.',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    category: 'web',
    featured: true,
    liveLink: 'https://prescripto-frontend-x1dv.onrender.com',
    githubLink: '#',
    screenshots: [
      '/assets/doc_app.png',
    ],
  },
  {
    id: 6,
    title: 'MedRep Connect',
    description: 'Connecting medical reps to companies and hospitals using WebSockets.',
    tech: ['React', 'Node.js', 'WebSockets'],
    category: 'web',
    featured: true,
    inProgress: true,
    liveLink: '#',
    githubLink: '#',
  },
];

export const education = [
  {
    degree: "Master's in Software Engineering",
    institution: 'Quantic School of Business and Technology',
    period: '2025-2026',
    type: 'degree',
  },
  {
    degree: 'Diploma in Backend Engineering',
    institution: 'AltSchool Africa',
    period: '2024',
    type: 'diploma',
  },
  {
    degree: 'BPharm',
    institution: 'University of Ibadan',
    period: '2018-2024',
    type: 'degree',
  },
];

export const certifications = [
  {
    name: 'IBM DevOps',
    issuer: 'IBM',
  },
  {
    name: 'AWS Cloud Foundations',
    issuer: 'Amazon Web Services',
  },
  {
    name: 'Handshake Level I & II',
    issuer: 'Handshake AI',
  },
];

export const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/semiuAdesina', icon: 'github' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/semiu-ademola-adesina-585141319/', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://x.com/Damozpixie1', icon: 'twitter' },
  { name: 'Email', url: 'mailto:ademolaadesinadev@gmail.com', icon: 'envelope' },
];


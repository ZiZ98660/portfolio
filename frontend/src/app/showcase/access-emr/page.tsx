'use client';
 
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faStethoscope,
  faFileMedical,
  faPills,
  faChartLine,
  faFileAlt,
  faShieldAlt,
  faCode,
  faExternalLinkAlt,
  faImage,
  faGear,
  faCheckCircle,
  faRocket,
  faClock,
  faUsers,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
 
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};
 
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};
 
export default function AccessEMRShowcasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-100 to-blue-100 text-slate-500">
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-20 border-b border-sky-200/60 bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/#projects"
            className="font-body text-slate-600 hover:text-sky-600 flex items-center gap-2 text-sm sm:text-base font-medium transition-colors group"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm group-hover:-translate-x-1 transition-transform" />
            Back to portfolio
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="[Link to your GitHub Repo]"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-slate-600 hover:text-sky-600 flex items-center gap-2 text-sm sm:text-base font-medium transition-colors"
            >
              <FontAwesomeIcon icon={faCode} className="text-sm" />
              <span className="hidden sm:inline">View Code</span>
            </a>
            <a
              href="https://sih.accessemr.app/login"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body bg-gradient-to-r from-sky-500 to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base font-semibold shadow-md hover:shadow-lg hover:shadow-sky-500/25 transition-all"
            >
              <span className="hidden sm:inline">Open Live App</span>
              <span className="sm:hidden">Live App</span>
              <FontAwesomeIcon icon={faExternalLinkAlt} className="text-xs" />
            </a>
          </div>
        </div>
      </div>
 
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Project Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 border border-sky-200 text-sky-700 font-semibold text-sm mb-6"
          >
            <FontAwesomeIcon icon={faStethoscope} className="text-sm" />
            Healthcare EMR Platform
          </motion.div>
 
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent mb-6 leading-tight">
            ACCESSEMR: Production-Grade Healthcare Platform
          </h1>
          <p className="font-body text-slate-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            My contribution to a full-featured EMR designed to streamline clinical workflows. I built robust, type-safe, and user-friendly features that address high-stakes healthcare needs—leveraging modern React patterns with a strong emphasis on <span className="font-semibold text-sky-700">security, performance, and compliance</span>.
          </p>
          
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8"
          >
            <div className="flex items-center gap-2 text-slate-600">
              <FontAwesomeIcon icon={faClock} className="text-sky-500" />
              <span className="text-sm font-medium">6+ Months Development</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <FontAwesomeIcon icon={faUsers} className="text-sky-500" />
              <span className="text-sm font-medium">Team Collaboration</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <FontAwesomeIcon icon={faRocket} className="text-sky-500" />
              <span className="text-sm font-medium">Production Deployed</span>
            </div>
          </motion.div>
        </motion.header>
 
        {/* Hero Image */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="relative rounded-2xl overflow-hidden border-2 border-sky-200/60 bg-gradient-to-br from-sky-50 to-blue-50 shadow-2xl shadow-sky-500/10 aspect-video flex items-center justify-center min-h-[320px] group">
            <img 
              src="/project_emr/img4.png" 
              alt="Access EMR Dashboard Overview" 
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
            {/* Shimmer overlay for premium effect */}
            <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(14,165,233,0.1)_50%,transparent_60%)] bg-[length:200%_100%] animate-shimmer" />
            
            {/* Image caption */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 border border-sky-200/60">
              <p className="text-sm text-slate-700 font-medium">
                <FontAwesomeIcon icon={faImage} className="text-sky-500 mr-2" />
                Main dashboard featuring patient overview and clinical workflows
              </p>
            </div>
          </div>
        </motion.section>
 
        {/* Technical Deep Dive */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-20"
        >
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faGear} className="text-white text-xl" />
            </div>
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Technical Deep Dive
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">Engineering for Safety, Scale, and Maintainability</p>
            </div>
          </div>
 
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-sky-200/60 p-6 sm:p-8 shadow-lg">
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 text-base leading-relaxed mb-4">
                My approach centered on building a resilient and scalable codebase trusted with sensitive patient data. I implemented several key architectural patterns:
              </p>
              
              <div className="space-y-6 mt-6">
                {/* Architecture Point 1 */}
                <motion.div variants={item} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center mt-1">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-sky-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">Type-Safe & Domain-Driven Development</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      I championed a <strong className="text-slate-800">TypeScript-first</strong> approach, modeling core domain entities like <code className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-xs">Patient</code>, <code className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-xs">Encounter</code>, and <code className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-xs">Medication</code> with comprehensive types. This reduced runtime errors and served as live documentation, making onboarding seamless.
                    </p>
                  </div>
                </motion.div>
 
                {/* Architecture Point 2 */}
                <motion.div variants={item} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center mt-1">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-sky-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">Scalable & Decoupled Data Layer</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      I developed a modular API layer centralizing all network calls with global authentication, retries, and error logging. Using <strong className="text-slate-800">@tanstack/react-query</strong>, I implemented intelligent server state management with caching and optimistic updates, drastically reducing network overhead.
                    </p>
                  </div>
                </motion.div>
 
                {/* Architecture Point 3 */}
                <motion.div variants={item} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center mt-1">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-sky-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">Componentized UI & Design System</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      I built a library of reusable UI primitives (inputs, tables, modals) ensuring visual consistency and accelerating feature development across the entire application.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
 
        {/* Key Features */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-20"
        >
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faLightbulb} className="text-white text-xl" />
            </div>
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Key Features & My Impact
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">Solving Real-World Clinical Problems</p>
            </div>
          </div>
 
          <div className="space-y-12">
            {/* Feature 1: Medication Reconciliation */}
            <motion.div variants={item} className="bg-white/60 backdrop-blur-sm rounded-2xl border border-sky-200/60 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex gap-6 items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
                    <FontAwesomeIcon icon={faPills} className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">Sophisticated Medication Reconciliation</h3>
                  <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed">
                    I developed a sophisticated <code className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-xs">ReconciliationTable</code> component handling the critical workflow of medication reconciliation across patient care transitions. This feature aligns medications by drug name across pre-intake, admission, and discharge phases, providing clinicians with a clear, unified view to safely continue or discontinue therapies.
                  </p>
                  
                  {/* Impact Metrics */}
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                      <FontAwesomeIcon icon={faCheckCircle} className="text-emerald-600 text-xs" />
                      <span className="text-xs font-semibold text-emerald-700">Reduced Errors</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-50 rounded-lg border border-sky-200">
                      <FontAwesomeIcon icon={faClock} className="text-sky-600 text-xs" />
                      <span className="text-xs font-semibold text-sky-700">Faster Workflow</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden border border-sky-200 shadow-md">
                <img 
                  src="/project_emr/img3.png" 
                  alt="Medication Reconciliation Table showing aligned medications across phases" 
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4">
                  <p className="text-white text-xs font-medium">
                    Three-phase medication alignment with drug name matching
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Feature 2: Secure Templating */}
            <motion.div variants={item} className="bg-white/60 backdrop-blur-sm rounded-2xl border border-sky-200/60 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex gap-6 items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
                    <FontAwesomeIcon icon={faFileAlt} className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">Secure & Flexible Clinical Documentation</h3>
                  <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed">
                    I implemented a rich-text note editor using <code className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-xs">react-quill</code> and a custom template engine powered by <code className="px-2 py-0.5 bg-sky-50 text-sky-700 rounded text-xs">liquidjs</code>. This allows clinicians to create dynamic, consistent documents while ensuring security through restricted templating—preventing arbitrary code execution when handling patient data.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg border border-purple-200">
                      <FontAwesomeIcon icon={faShieldAlt} className="text-purple-600 text-xs" />
                      <span className="text-xs font-semibold text-purple-700">Secure Templates</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-sky-50 rounded-lg border border-sky-200">
                      <FontAwesomeIcon icon={faFileAlt} className="text-sky-600 text-xs" />
                      <span className="text-xs font-semibold text-sky-700">Rich Text Editing</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden border border-sky-200 shadow-md">
                <img 
                  src="/project_emr/img2.png" 
                  alt="Rich text editor with template selection and live preview" 
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4">
                  <p className="text-white text-xs font-medium">
                    Dynamic template engine with secure variable interpolation
                  </p>
                </div>
              </div>
            </motion.div>
 
            {/* Feature 3: Audit & Governance */}
            <motion.div variants={item} className="bg-white/60 backdrop-blur-sm rounded-2xl border border-sky-200/60 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex gap-6 items-start mb-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md">
                    <FontAwesomeIcon icon={faShieldAlt} className="text-white text-2xl" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">Comprehensive Audit & Governance System</h3>
                  <p className="font-body text-slate-600 text-sm sm:text-base leading-relaxed">
                    Understanding compliance requirements, I contributed to the admin dashboard building features for <strong className="text-slate-800">role-based access control</strong> and a detailed <strong className="text-slate-800">audit trail</strong>. This system logs all sensitive actions (create, update, delete), providing traceable history for compliance and quality assurance.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mt-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                      <FontAwesomeIcon icon={faShieldAlt} className="text-emerald-600 text-xs" />
                      <span className="text-xs font-semibold text-emerald-700">HIPAA Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-200">
                      <FontAwesomeIcon icon={faChartLine} className="text-amber-600 text-xs" />
                      <span className="text-xs font-semibold text-amber-700">Full Audit Trail</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative rounded-xl overflow-hidden border border-sky-200 shadow-md">
                <img 
                  src="/project_emr/img5.png" 
                  alt="Admin dashboard with role management and audit logging" 
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-4">
                  <p className="text-white text-xs font-medium">
                    User management interface with granular permission controls
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
 
        {/* Production Excellence */}
        <motion.section
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-20"
        >
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faRocket} className="text-white text-xl" />
            </div>
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Production-Ready Engineering
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">A Culture of Excellence & Automation</p>
            </div>
          </div>
 
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-lg">
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 text-base leading-relaxed mb-6">
                Working on Access EMR was an experience in modern, professional software engineering. The codebase is characterized by a strong commitment to <strong>automation, quality, and reliability</strong>.
              </p>
              
              <div className="space-y-6">
                <motion.div variants={item} className="bg-white/70 rounded-xl p-5 border border-amber-200">
                  <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <FontAwesomeIcon icon={faRocket} className="text-amber-600 text-sm" />
                    Production-Ready CI/CD Pipeline
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    We implemented a fully automated <strong>Continuous Integration/Continuous Deployment</strong> pipeline using <strong>GitHub Actions</strong>. This pipeline automatically runs our full test suite, enforces code quality checks with ESLint and Prettier, and builds the application on every push—ensuring only tested, high-quality code reaches production.
                  </p>
                  <div className="relative rounded-lg overflow-hidden border border-amber-200 shadow-sm">
                    <img 
                      src="/project_emr/img6.png" 
                      alt="GitHub Actions CI/CD workflow visualization" 
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={item} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mt-1">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-amber-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-slate-900 mb-1">Comprehensive Testing</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The application is covered by E2E tests with <strong>Cypress</strong> and unit tests with <strong>@testing-library/react</strong>, ensuring reliability and facilitating confident refactoring.
                    </p>
                  </div>
                </motion.div>
                
                <motion.div variants={item} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mt-1">
                    <FontAwesomeIcon icon={faCheckCircle} className="text-amber-600 text-sm" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-slate-900 mb-1">Performance-Conscious Development</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Every feature was built with performance in mind—from efficient data fetching with <code className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-xs">react-query</code> to optimizing bundle sizes for fast load times.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>
 
        {/* Tech Stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'React', color: 'from-cyan-500 to-blue-500' },
              { name: 'TypeScript', color: 'from-blue-600 to-blue-700' },
              { name: 'Next.js', color: 'from-slate-700 to-slate-900' },
              { name: 'Zustand', color: 'from-amber-500 to-orange-600' },
              { name: 'React Query', color: 'from-rose-500 to-pink-600' },
              { name: 'Liquid.js', color: 'from-emerald-500 to-teal-600' },
              { name: 'Tailwind CSS', color: 'from-sky-400 to-cyan-500' },
              { name: 'Jest', color: 'from-red-500 to-rose-600' },
              { name: 'Cypress', color: 'from-green-500 to-emerald-600' },
              { name: 'GitHub Actions', color: 'from-slate-600 to-slate-800' },
            ].map((tech) => (
              <motion.span
                key={tech.name}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`px-5 py-2.5 rounded-xl bg-gradient-to-r ${tech.color} text-white font-body text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-default`}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.section>
 
        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8 pb-12"
        >
          <div className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-2xl border-2 border-sky-200 p-8 sm:p-12 shadow-xl">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
              Explore the Platform
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mb-8 max-w-xl mx-auto">
              Experience the production application or dive into the codebase to see the engineering excellence behind it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                href="[Link to your GitHub Repo]"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-700 font-semibold shadow-md hover:shadow-lg hover:border-sky-400 hover:text-sky-700 transition-all"
              >
                <FontAwesomeIcon icon={faCode} className="text-base" />
                View on GitHub
              </a>
              <a
                href="https://sih.accessemr.app/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all"
              >
                Open Live App
                <FontAwesomeIcon icon={faExternalLinkAlt} className="text-base" />
              </a>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
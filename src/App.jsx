import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowUp, FaBriefcase, FaEnvelope, FaGithub, FaLinkedin, FaLightbulb, FaMoon, FaSun, FaStar, FaWhatsapp } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import { BsCodeSlash } from 'react-icons/bs';

const personal = {
  name: 'Anand T K',
  title: 'Software Developer',
  education: 'B.Tech Computer Science & Data Science (2023–2027)',
  college: 'Jawaharlal College of Engineering and Technology',
  email: 'anandsivadas123@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/anand-tk-770719287',
  github: 'https://github.com/anand01-glitch',
  whatsapp: '918891525301',
  whatsappDisplay: '+91 88915 25301',
};

const typedPhrases = [
  'Software Developer',
  'React Developer',
  'AI Enthusiast',
  'Problem Solver',
];

const skills = [
  { category: 'Frontend', items: [
      { name: 'HTML', level: 92 },
      { name: 'CSS', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'React', level: 90 },
    ] },
  { category: 'Backend', items: [
      { name: 'Python', level: 86 },
      { name: 'Java', level: 82 },
    ] },
  { category: 'Database', items: [
      { name: 'SQL', level: 84 },
    ] },
  { category: 'Mobile Development', items: [
      { name: 'Flutter', level: 80 },
    ] },
  { category: 'Programming Languages', items: [
      { name: 'C++', level: 78 },
      { name: 'Java', level: 82 },
      { name: 'Python', level: 86 },
      { name: 'JavaScript', level: 88 },
    ] },
  { category: 'Tools', items: [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 90 },
      { name: 'VS Code', level: 88 },
      { name: 'Android Studio', level: 80 },
      { name: 'Canva', level: 74 },
      { name: 'Figma', level: 82 },
    ] },
];

const projects = [
  {
    name: 'VALORA',
    description: 'AI-powered personal finance and budget management application with expense tracking, SMS transaction parsing, analytics, and financial insights.',
    technologies: ['React', 'Tailwind', 'Python', 'AI', 'Analytics'],
    github: 'https://github.com/anand01-glitch/valora',
    live: 'https://anand01-glitch.github.io/valora',
  },
  {
    name: 'AIRA',
    description: 'Intelligent AI assistant with voice interaction, memory, automation, and hybrid online/offline capabilities inspired by Jarvis-like systems.',
    technologies: ['JavaScript', 'Python', 'AI', 'Voice UI'],
    github: 'https://github.com/anand01-glitch/aira',
    live: 'https://anand01-glitch.github.io/aira',
  },
  {
    name: 'Task Manager',
    description: 'Modern productivity app with task creation, editing, completion tracking, drag-and-drop prioritization, progress visualization, and celebration animations.',
    technologies: ['React', 'JavaScript', 'CSS', 'UX'],
    github: 'https://github.com/anand01-glitch/task-manager',
    live: 'https://anand01-glitch.github.io/task-manager',
  },
];

const stats = [
  { label: 'Projects', value: 12 },
  { label: 'Certifications', value: 8 },
  { label: 'Experience', value: 2 },
];

const achievements = [
  'Professional certifications in web development and data science',
  'Consistent learning milestones in AI and modern frontend ecosystems',
  'Future achievement: building scalable, impactful software systems',
];

function App() {
  const [theme, setTheme] = useState('dark');
  const [scrollY, setScrollY] = useState(0);
  const [typeIndex, setTypeIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem('portfolio-theme');
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const updateScroll = () => {
      setScrollY(window.scrollY / (document.body.scrollHeight - window.innerHeight));
    };
    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentPhrase = typedPhrases[typeIndex % typedPhrases.length];
      const nextText = isDeleting
        ? currentPhrase.slice(0, typedText.length - 1)
        : currentPhrase.slice(0, typedText.length + 1);
      setTypedText(nextText);
      if (!isDeleting && nextText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && nextText === '') {
        setIsDeleting(false);
        setTypeIndex((prev) => prev + 1);
      }
    }, isDeleting ? 80 : 120);
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, typeIndex]);

  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'skills', 'education', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -45% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const filteredProjects = useMemo(() => projects, []);

  const handleThemeToggle = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
      <div className="fixed inset-x-0 top-0 z-50 h-2 overflow-hidden bg-slate-200/40 dark:bg-slate-800/60">
        <div className="h-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400" style={{ width: `${Math.min(100, Math.max(0, scrollY * 100))}%` }} />
      </div>

      <div className="absolute inset-0 bg-hero-glow opacity-80 pointer-events-none" />
      <div className="relative isolate overflow-hidden py-8 px-6 md:px-10 xl:px-16">
        <header className="sticky top-4 z-50 mx-auto flex w-full flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/70 px-5 py-4 shadow-glass backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-400 p-2 text-white shadow-lg shadow-cyan-500/20">
                <FaStar className="h-full w-full" />
              </div>
              <div>
                <p className="text-sm font-medium">Anand T K</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Software Developer Portfolio</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 md:hidden">
              <button onClick={handleThemeToggle} className="inline-flex items-center justify-center rounded-full border border-slate-200/70 bg-white/90 p-2 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700/70 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700">
                {theme === 'dark' ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="inline-flex items-center justify-center rounded-full border border-slate-200/70 bg-white/90 p-2 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700/70 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={handleThemeToggle} className="inline-flex items-center justify-center rounded-full border border-slate-200/70 bg-white/90 px-3 py-2 text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700/70 dark:bg-slate-800/90 dark:text-slate-100 dark:hover:bg-slate-700">
              {theme === 'dark' ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
            </button>
            <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              {['home', 'about', 'projects', 'skills', 'education', 'contact'].map((section) => (
                <button key={section} onClick={() => scrollTo(section)} className={`rounded-full px-3 py-2 transition ${activeSection === section ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="flex flex-col gap-2 overflow-hidden md:hidden pb-2 w-full"
              >
                {['home', 'about', 'projects', 'skills', 'education', 'contact'].map((section) => (
                  <button 
                    key={section} 
                    onClick={() => {
                      scrollTo(section);
                      setIsMobileMenuOpen(false);
                    }} 
                    className={`w-full rounded-2xl border py-3 text-sm font-medium transition ${activeSection === section ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-200 dark:border-slate-700/50 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800'}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        <main className="mx-auto mt-10 max-w-7xl space-y-24">
          <section id="home" className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] xl:items-center">
            <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
              <div className="space-y-4">
                <p className="text-lg uppercase tracking-[0.3em] text-cyan-300">Hello, I&apos;m Anand</p>
                <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-6xl text-slate-900 dark:text-white">Crafting modern web experiences with a premium developer mindset.</h1>
                <p className="max-w-2xl text-slate-600 dark:text-slate-400 sm:text-lg">I build elegant, high-performance applications that combine clean design, strong engineering, and accessible user experiences.</p>
              </div>

              <div className="grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                <button onClick={() => scrollTo('projects')} className="w-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.01] sm:w-auto">View Projects</button>
                <button onClick={() => setIsResumeOpen(true)} className="w-full rounded-full border border-slate-300 dark:border-slate-700/60 bg-slate-900/5 dark:bg-slate-950/20 px-6 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 transition hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-900/10 dark:hover:bg-slate-950/40 sm:w-auto">Download Resume</button>
                <button onClick={() => scrollTo('contact')} className="w-full rounded-full border border-slate-300 dark:border-white/10 bg-slate-100/60 dark:bg-white/10 px-6 py-3 text-sm font-semibold text-slate-800 dark:text-white transition hover:border-slate-400 dark:hover:border-white/20 hover:bg-slate-200/60 dark:hover:bg-white/15 sm:w-auto">Contact Me</button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="relative flex flex-col items-center justify-center gap-6 rounded-[40px] border border-slate-200/80 dark:border-white/10 bg-white/40 dark:bg-white/10 p-6 shadow-glass backdrop-blur-xl">
              <div className="absolute -left-12 top-12 h-24 w-24 rounded-full bg-cyan-400/20 blur-2xl" />
              <div className="absolute -right-10 bottom-14 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl" />
              

              <div className="space-y-3 text-center">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 font-medium">Software Developer</p>
                <h2 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">{personal.name}</h2>
                <p className="text-base text-slate-650 dark:text-slate-400">{personal.education}</p>
              </div>
              <div className="w-full rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/70 p-5 text-center text-sm text-slate-700 dark:text-slate-300 shadow-inner shadow-black/5">
                <p className="text-slate-700 dark:text-slate-200">{typedText}<span className="animate-pulse text-cyan-500 dark:text-cyan-400">|</span></p>
              </div>
            </motion.div>
          </section>

          <section id="about" className="grid gap-10 lg:grid-cols-[0.9fr_0.6fr]">
            <div className="space-y-8 rounded-[32px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 shadow-glass backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-cyan-500/20">
                  <FaBriefcase className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-550 dark:text-cyan-300">About Me</p>
                  <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">What drives me</h2>
                </div>
              </div>
              <p className="text-slate-650 dark:text-slate-300 sm:text-lg">
                I am Anand T K, a final-year B.Tech Computer Science and Data Science student at Jawaharlal College of Engineering and Technology. I am passionate about software development and enjoy building modern web applications, AI-powered solutions, and user-focused digital experiences. My technical expertise includes React, JavaScript, Python, Java, SQL, Flutter, and modern development tools. I am continuously expanding my knowledge through hands-on projects such as VALORA, AIRA, and Task Manager. My goal is to become a skilled software developer who creates impactful, innovative, and scalable software solutions.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/80 p-5 text-slate-700 dark:text-slate-300">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-550 dark:text-slate-400">College</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">Jawaharlal College of Engineering and Technology</p>
                </div>
                <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/80 p-5 text-slate-700 dark:text-slate-300">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-550 dark:text-slate-400">Contact</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{personal.email}</p>
                </div>
              </div>
            </div>
            <div className="space-y-6 rounded-[32px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 shadow-glass backdrop-blur-xl">
              <div className="flex items-center gap-3 text-slate-800 dark:text-slate-300">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-300">
                  <MdSchool className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-550 dark:text-cyan-300">Education</p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{personal.education}</h3>
                </div>
              </div>
              <div className="space-y-4 rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-950/80 p-6">
                {[
                  { name: 'React', level: 90 },
                  { name: 'JavaScript', level: 88 },
                  { name: 'Python', level: 86 },
                  { name: 'AI', level: 82 },
                  { name: 'Web Apps', level: 85 },
                ].map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between gap-3 text-slate-700 dark:text-slate-300">
                    <span>{skill.name}</span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">{skill.level}%</span>
                  </div>
                ))}
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-violet-500/20 via-cyan-500/10 to-slate-900/40 p-6 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-transparent">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-200">Future Focus</p>
                <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">Building creative, accessible, and scalable digital products as a recruiter-ready software engineer.</p>
              </div>
            </div>
          </section>

          <section id="skills" className="space-y-10">
            <div className="rounded-[36px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 shadow-glass backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-550 dark:text-cyan-300">Skills</p>
                  <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Technical expertise</h2>
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <BsCodeSlash /> <span>Frontend, backend, mobile, database, dev tools</span>
                </div>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {skills.map((skill) => (
                  <motion.div key={skill.category} whileHover={{ y: -6 }} className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/80 p-6 shadow-md dark:shadow-lg dark:shadow-slate-950/25 transition">
                    <p className="text-sm uppercase tracking-[0.35em] text-cyan-550 dark:text-cyan-300">{skill.category}</p>
                    <div className="mt-5 space-y-3">
                      {skill.items.map((item) => (
                        <div key={item.name} className="space-y-2">
                          <div className="flex items-center justify-between text-sm text-slate-700 dark:text-slate-300">
                            <span>{item.name}</span>
                            <span>{item.level}%</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${item.level}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="projects" className="space-y-10">
            <div className="rounded-[36px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 shadow-glass backdrop-blur-xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-550 dark:text-cyan-300">Projects</p>
                  <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Highlighted work</h2>
                </div>
                <div className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-950/80 px-4 py-2 text-sm text-slate-700 dark:text-slate-300">
                  <FaGithub className="mr-2 h-4 w-4" /> GitHub-ready showcase
                </div>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <motion.article key={project.name} whileHover={{ y: -8 }} className="group overflow-hidden rounded-[32px] border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950/80 p-6 shadow-md dark:shadow-glass backdrop-blur-xl transition">
                    <div className="relative mb-6 h-56 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 via-slate-100 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 border border-slate-150 dark:border-transparent">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.15),_transparent_30%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.12),_transparent_28%)]" />
                      <div className="absolute inset-0 flex items-center justify-center text-7xl text-slate-350 dark:text-slate-600 opacity-20">{project.name[0]}</div>
                    </div>
                    <span className="text-sm uppercase tracking-[0.35em] text-cyan-600 dark:text-cyan-300 font-semibold">{project.name}</span>
                    <p className="mt-4 text-slate-650 dark:text-slate-300">{project.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="rounded-full border border-slate-200 dark:border-slate-700/50 bg-slate-100 dark:bg-slate-900/70 px-3 py-1 text-xs text-slate-650 dark:text-slate-300">{tech}</span>
                      ))}
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a href={project.github} className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400" target="_blank" rel="noreferrer">
                        <FaGithub /> GitHub
                      </a>
                      <a href={project.live} className="inline-flex items-center gap-2 rounded-full border border-slate-350 dark:border-slate-700/60 px-4 py-3 text-sm font-semibold text-slate-750 dark:text-slate-100 transition hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-transparent" target="_blank" rel="noreferrer">
                        Live Demo <FiExternalLink />
                      </a>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section id="education" className="grid gap-10 lg:grid-cols-[0.7fr_0.3fr]">
            <div className="rounded-[36px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 shadow-glass backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/20">
                  <MdSchool className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-550 dark:text-cyan-300">Education</p>
                  <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Academic timeline</h2>
                </div>
              </div>
              <div className="mt-10 space-y-8">
                <div className="relative pl-8 before:absolute before:left-2 before:top-2 before:h-full before:w-px before:bg-slate-400/30">
                  <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-cyan-400" />
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">2023 - 2027</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">B.Tech Computer Science & Data Science</h3>
                  <p className="mt-2 text-slate-650 dark:text-slate-300">{personal.college}</p>
                </div>
              </div>
            </div>
            <div className="rounded-[36px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 shadow-glass backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-550 dark:text-cyan-300 font-semibold">Statistics</p>
              <div className="mt-8 grid gap-4">
                {stats.map((item) => (
                  <motion.div key={item.label} whileHover={{ scale: 1.02 }} className="rounded-3xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-slate-950/80 p-6 text-center">
                    <p className="text-4xl font-semibold text-indigo-600 dark:text-cyan-300">{item.value}+</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 font-medium">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="achievements" className="space-y-10">
            <div className="rounded-[36px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 shadow-glass backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-500 text-white shadow-lg shadow-cyan-500/20">
                  <FaLightbulb className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-550 dark:text-cyan-300">Achievements</p>
                  <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Milestones & certifications</h2>
                </div>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {achievements.map((item) => (
                  <motion.div key={item} whileHover={{ y: -6 }} className="rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-950/80 p-6 text-slate-750 dark:text-slate-300 shadow-sm">
                    <p>{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="grid gap-10 lg:grid-cols-[0.9fr_0.6fr]">
            <div className="rounded-[36px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 shadow-glass backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20">
                  <FaEnvelope className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-550 dark:text-cyan-300 font-semibold">Contact</p>
                  <h2 className="text-3xl font-semibold text-slate-900 dark:text-white">Let&apos;s build something great</h2>
                </div>
              </div>
              <form className="mt-10 space-y-6 rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-950/80 p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-slate-700 dark:text-slate-300">
                    <span className="text-sm font-medium">Name</span>
                    <input type="text" placeholder="Your name" required className="w-full rounded-3xl border border-slate-300 dark:border-slate-700/60 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-cyan-500" />
                  </label>
                  <label className="space-y-2 text-slate-700 dark:text-slate-300">
                    <span className="text-sm font-medium">Email</span>
                    <input type="email" placeholder="you@example.com" required className="w-full rounded-3xl border border-slate-300 dark:border-slate-700/60 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-cyan-500" />
                  </label>
                </div>
                <label className="space-y-2 text-slate-700 dark:text-slate-300">
                  <span className="text-sm font-medium">Message</span>
                  <textarea rows="5" placeholder="Tell me about your project" required className="w-full rounded-3xl border border-slate-300 dark:border-slate-700/60 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-800 dark:text-slate-100 outline-none transition focus:border-cyan-500" />
                </label>
                <button type="submit" className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.01]">
                  Send Message
                </button>
              </form>
            </div>
            <div className="space-y-6 rounded-[36px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 shadow-glass backdrop-blur-xl">
              <div className="space-y-4 rounded-3xl border border-slate-200 dark:border-transparent bg-slate-50 dark:bg-slate-950/80 p-6 text-slate-700 dark:text-slate-300 shadow-sm">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-550 dark:text-cyan-300 font-semibold">Reach out</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">Email, LinkedIn, GitHub, WhatsApp</p>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">Email</p>
                    <a href={`mailto:${personal.email}`} className="text-indigo-600 dark:text-cyan-300 font-medium hover:underline">{personal.email}</a>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">LinkedIn</p>
                    <a href={personal.linkedIn} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-cyan-300 font-medium hover:underline">linkedin.com/in/anand-tk-770719287</a>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">GitHub</p>
                    <a href={personal.github} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-cyan-300 font-medium hover:underline">github.com/anand01-glitch</a>
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-400">WhatsApp</p>
                    <a href={`https://wa.me/${personal.whatsapp}`} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-cyan-300 font-medium hover:underline">{personal.whatsappDisplay}</a>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-950/80 p-6 text-slate-700 dark:text-slate-300 shadow-sm">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400 font-semibold">Newsletter</p>
                <p className="mt-3 text-sm leading-7 text-slate-650 dark:text-slate-350">I respond promptly and enjoy collaborating on modern web applications, AI systems, and product-focused development work.</p>
                <a href={`https://wa.me/${personal.whatsapp}?text=Hi%20Anand%2C%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect.`} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400 shadow-md hover:shadow-lg">
                  <FaWhatsapp className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-20 rounded-[32px] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 p-8 text-center text-slate-500 dark:text-slate-400 shadow-glass backdrop-blur-xl">
          <p className="text-sm">© 2026 Anand T K. Designed for a premium recruiter-friendly experience with modern glassmorphism, animations, and accessible layout.</p>
        </footer>

        <AnimatePresence>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: window.scrollY > 400 ? 1 : 0, y: window.scrollY > 400 ? 0 : 24 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-8 right-8 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-white shadow-xl shadow-cyan-500/30 transition hover:scale-105"
          >
            <FaArrowUp className="h-5 w-5" />
          </motion.button>
        </AnimatePresence>

        <AnimatePresence>
          {isResumeOpen && (
            <div id="print-resume-modal" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative flex flex-col w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white text-slate-900 shadow-2xl overflow-hidden font-sans"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
                  <h3 className="font-semibold text-lg text-slate-800">Resume Preview</h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => window.print()} 
                      className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-xs font-semibold shadow-sm transition"
                    >
                      Print Resume
                    </button>
                    <button 
                      onClick={() => setIsResumeOpen(false)} 
                      className="rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 text-xs font-semibold transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
                
                {/* Modal Content / Printable Area */}
                <div id="printable-resume" className="flex-1 overflow-y-auto p-8 sm:p-12 bg-white text-slate-950">
                  <div className="max-w-3xl mx-auto space-y-6 text-left">
                    {/* Header */}
                    <div className="text-center space-y-2 border-b-2 border-slate-900 pb-6">
                      <h1 className="text-4xl font-bold uppercase tracking-wide text-slate-950">{personal.name}</h1>
                      <p className="text-lg font-medium text-indigo-700">{personal.title}</p>
                      <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-slate-650">
                        <span>{personal.email}</span>
                        <span>•</span>
                        <span>{personal.whatsappDisplay}</span>
                        <span>•</span>
                        <a href={personal.linkedIn} target="_blank" rel="noreferrer" className="underline hover:text-indigo-600">LinkedIn</a>
                        <span>•</span>
                        <a href={personal.github} target="_blank" rel="noreferrer" className="underline hover:text-indigo-600">GitHub</a>
                      </div>
                    </div>

                    {/* Education */}
                    <div className="space-y-2">
                      <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-350 pb-1 text-slate-800">Education</h2>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-base text-slate-900">B.Tech in Computer Science & Data Science</h3>
                          <p className="text-slate-700 text-sm">{personal.college}</p>
                        </div>
                        <span className="text-sm text-slate-600 font-medium">2023 – 2027</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                      <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-350 pb-1 text-slate-800">Technical Skills</h2>
                      <div className="grid gap-2 text-sm">
                        {skills.map(s => (
                          <div key={s.category} className="grid grid-cols-1 sm:grid-cols-[165px_1fr] gap-2 sm:gap-4">
                            <span className="font-bold text-slate-700">{s.category}:</span>
                            <span className="text-slate-800">{s.items.map(i => i.name).join(', ')}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div className="space-y-3">
                      <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-350 pb-1 text-slate-800">Projects</h2>
                      {projects.map(p => (
                        <div key={p.name} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-base text-slate-900">{p.name}</h3>
                            <span className="text-xs text-indigo-700 font-semibold">{p.technologies.join(' / ')}</span>
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed">{p.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Key Achievements */}
                    <div className="space-y-2">
                      <h2 className="text-lg font-bold uppercase tracking-wider border-b border-slate-350 pb-1 text-slate-800">Achievements</h2>
                      <ul className="list-disc pl-5 text-sm space-y-1 text-slate-700">
                        {achievements.map((ach, idx) => (
                          <li key={idx}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;


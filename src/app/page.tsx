'use client';
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaDownload } from "react-icons/fa";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import AnimatedUnderline from "@/components/AnimatedUnderline";
import MagneticButton from "@/components/MagneticButton";
import { skills } from "@/data/skills";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [easterEggClicks, setEasterEggClicks] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  
  const fullText = "Transforming Ideas into Reality";

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
      setScrollY(window.scrollY);
      
      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cursorDotRef.current && cursorOutlineRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorOutlineRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px)`;
      }

      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    emailjs.sendForm(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      formRef.current,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
      .then(() => {
        alert('Message sent successfully!');
        formRef.current?.reset();
      })
      .catch((err) => {
        alert('Failed to send message. Please try again later.');
        console.error(err);
      });
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-600 origin-left z-50"
        style={{
          scaleX: scrollProgress / 100,
          transformOrigin: '0%',
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.1 }}
      />

      {/* Tech Network Background - Subtle Ambient Motion */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Animated grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <motion.path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-teal-600"
                animate={!prefersReducedMotion ? {
                  pathLength: [0, 1, 0],
                } : {}}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating network nodes with fixed positions */}
        {!prefersReducedMotion && [
          { id: 1, startX: 10, startY: 20, endX: 15, endY: 80 },
          { id: 2, startX: 30, startY: 60, endX: 40, endY: 30 },
          { id: 3, startX: 70, startY: 40, endX: 75, endY: 70 },
          { id: 4, startX: 50, startY: 80, endX: 60, endY: 20 },
          { id: 5, startX: 85, startY: 30, endX: 80, endY: 90 },
        ].map((node) => (
          <motion.div
            key={`node-${node.id}`}
            className="absolute w-2 h-2 rounded-full bg-teal-400/20"
            initial={{
              x: `${node.startX}%`,
              y: `${node.startY}%`,
            }}
            animate={{
              x: [`${node.startX}%`, `${node.endX}%`, `${node.startX}%`],
              y: [`${node.startY}%`, `${node.endY}%`, `${node.startY}%`],
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 15 + node.id * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Parallax Background Shapes */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Large circle */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-teal-100/30 to-cyan-100/30 blur-3xl"
          style={{
            top: '10%',
            right: '10%',
            transform: `translateY(${scrollY * -0.3}px)`,
          }}
          animate={!prefersReducedMotion ? {
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Medium circle */}
        <motion.div
          className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-cyan-100/20 to-teal-100/20 blur-3xl"
          style={{
            bottom: '20%',
            left: '5%',
            transform: `translateY(${scrollY * -0.5}px)`,
          }}
          animate={!prefersReducedMotion ? {
            scale: [1, 1.15, 1],
          } : {}}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Small circle */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-teal-50/40 to-cyan-50/40 blur-2xl"
          style={{
            top: '50%',
            left: '15%',
            transform: `translateY(${scrollY * -0.4}px)`,
          }}
        />
        
        {/* Triangle shape using clip-path */}
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-br from-cyan-100/15 to-teal-100/15 blur-2xl"
          style={{
            top: '60%',
            right: '20%',
            transform: `translateY(${scrollY * -0.35}px) rotate(${scrollY * 0.05}deg)`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        />
        
        {/* Square shape */}
        <motion.div
          className="absolute w-60 h-60 bg-gradient-to-br from-teal-100/25 to-cyan-100/25 blur-3xl rounded-3xl"
          style={{
            bottom: '40%',
            right: '30%',
            transform: `translateY(${scrollY * -0.45}px) rotate(${scrollY * -0.03}deg)`,
          }}
        />
        
        {/* Elongated oval */}
        <motion.div
          className="absolute w-96 h-40 rounded-full bg-gradient-to-r from-cyan-100/20 to-teal-100/20 blur-3xl"
          style={{
            top: '30%',
            left: '30%',
            transform: `translateY(${scrollY * -0.25}px) rotate(-30deg)`,
          }}
        />
      </div>

      {showScroll && (
        <motion.button 
          onClick={scrollToTop} 
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300" 
          aria-label="Scroll to top"
          whileHover={{ y: -4 }}
        >
          <FaArrowUp className="w-5 h-5" />
        </motion.button>
      )}

      <motion.section 
        id="home" 
        className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-32 md:py-20" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <div className="blob-bg"></div>
        
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-teal-400/20 rounded-full"
            style={{
              left: `${(i * 5) % 100}%`,
              top: `${(i * 7) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="text-center md:text-left space-y-6"
          >
            <motion.div 
              className="relative w-[200px] h-[200px] mx-auto md:mx-0 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/20 backdrop-blur-lg group hover:ring-teal-400/40 transition-all duration-300"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image 
                src="/images/profilepic.jpg" 
                alt="Profile" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </motion.div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Nandhana Suresh Kumar</h2>
              <p className="text-base text-gray-600 font-medium">Software Developer · Dallas, TX</p>
              <p className="text-sm text-gray-500 mt-1">MSCS @ UT Dallas · Open to SDE Internships</p>
            </div>
            <div className="flex justify-center md:justify-start gap-4 text-2xl">
              <motion.a 
                href="mailto:nxs230139@utdallas.edu" 
                target="_blank" 
                className="text-gray-700 hover:text-teal-600 transform hover:scale-110 transition-all duration-200"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaEnvelope />
              </motion.a>
              <motion.a 
                href="https://github.com/" 
                target="_blank" 
                className="text-gray-700 hover:text-teal-600 transform hover:scale-110 transition-all duration-200"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a 
                href="https://linkedin.com/in/nandhana11" 
                target="_blank" 
                className="text-gray-700 hover:text-teal-600 transform hover:scale-110 transition-all duration-200"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            viewport={{ once: true }} 
            className="text-center md:text-left space-y-6"
            style={{
              transform: `translateY(${mousePosition.y * 0.01}px)`,
              transition: 'transform 0.5s ease-out'
            }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 min-h-[120px] md:min-h-[160px]">
              <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                {typedText}{typedText.length < fullText.length && '|'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl">
              Passionate about creating impactful solutions through web development, machine learning, and secure software practices.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
              <MagneticButton
                href="/resume.pdf"
                download={true}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  <FaDownload /> Download Resume
                </motion.div>
              </MagneticButton>
              <MagneticButton
                href="#projects"
                className="inline-flex items-center justify-center text-teal-600 hover:text-teal-700 font-semibold px-8 py-4 border-2 border-teal-600 hover:bg-teal-50 rounded-xl transition-all"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                >
                  View Projects →
                </motion.div>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section with unique background */}
      <section id="about" className="relative max-w-5xl mx-auto py-20 md:py-28 px-4 overflow-hidden">
        {/* Section-specific background accent */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-50/30 via-transparent to-cyan-50/30" />
        <motion.div 
          initial={{ opacity: 0, y: 60 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.8, ease: "easeOut" }} 
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onClick={() => {
              setEasterEggClicks(prev => prev + 1);
              if (easterEggClicks === 4) {
                alert('🎉 You found the easter egg! Thanks for being curious! 🚀');
                setEasterEggClicks(0);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            About Me
          </motion.h2>
          <AnimatedUnderline />
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={!prefersReducedMotion ? { boxShadow: "0 20px 40px rgba(0,0,0,0.1)" } : {}}
          >
            <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl">
              I&#39;m a passionate Software Developer with strong foundations in Computer Science and experience across Web Development, Machine Learning, and Cybersecurity.
              I love solving real-world problems with creative technical solutions. I&#39;m currently pursuing my MS in CS at UT Dallas and actively looking for internship opportunities in Full Stack or Backend roles.
            </p>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-base text-center italic">
                💡 Fun fact: With a developer&#8217;s logic and a designer&#8217;s intuition, I enjoy building experiences that look as good as they work.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section with unique background */}
      <section id="projects" className="relative max-w-7xl mx-auto py-20 md:py-28 px-4">
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 -z-10"
          animate={!prefersReducedMotion ? {
            background: [
              'radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(6, 182, 212, 0.03) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.03) 0%, transparent 50%)',
            ],
          } : {}}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">Featured Projects</h2>
          <AnimatedUnderline />
          <p className="text-center text-gray-600 text-lg mx-auto mt-8">Explore some of my recent work showcasing full-stack development, machine learning, and creative problem-solving.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Section with unique background */}
      <section id="skills" className="relative max-w-5xl mx-auto py-20 md:py-28 px-4">
        {/* Subtle dotted pattern background */}
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Technical Skills</h2>
          <AnimatedUnderline />
          <p className="text-gray-600 text-lg mb-12">Technologies and tools I work with</p>
        </motion.div>
        <motion.div 
          className="flex flex-wrap justify-center gap-3 md:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.span 
              key={index} 
              className="bg-gradient-to-r from-teal-50 to-cyan-50 text-gray-800 text-sm md:text-base font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow-md border border-teal-100 hover:border-teal-300 transition-all duration-200 hover:scale-105 cursor-default"
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 200
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -4,
                scale: 1.08,
                boxShadow: "0 8px 16px rgba(20, 184, 166, 0.2)"
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Experience Section with unique background */}
      <section id="experience" className="relative max-w-6xl mx-auto py-20 md:py-28 px-4">
        {/* Diagonal stripe pattern */}
        <div className="absolute inset-0 -z-10 opacity-[0.015]" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #14b8a6 0px, #14b8a6 2px, transparent 2px, transparent 10px)',
        }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Work Experience</h2>
          <AnimatedUnderline />
          <p className="text-gray-600 text-lg">My professional journey</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          
          {[
            {
              title: "Software Development Intern",
              company: "Paycom",
              period: "May 2025 – Aug 2025",
              details: [
                "Built interactive challenge landing pages, badge galleries, and leaderboard modules using React and advanced CSS animations, improving LMS engagement and reducing training time by ~35%. ",
                "Developed backend logic in C#/.NET to support challenge tracking, real-time quiz score syncing, and leaderboard updates via RESTful services, contributing to a projected 28% boost in employee participation.",
                "Presented gamification architecture and UI strategy to engineering leadership, collaborated across sprints using GitLab and Jira, ensuring 90%+ unit test coverage with MSTest/xUnit."
              ],
            },
            {
              title: "Web Development Intern",
              company: "Servion Global Solutions",
              period: "Jun 2023 – Jul 2023",
              details: [
                "Built responsive web apps using JavaScript, PHP, MySQL.",
                "Optimized mobile performance and UI responsiveness.",
                "Reduced load time from 5s to 2s via CDN implementation."
              ],
            },
            {
              title: "Data Science Intern",
              company: "Tito Engineering Products",
              period: "Apr 2023 – May 2023",
              details: [
                "Improved pipeline speed by 15% via data transformation.",
                "Built predictive models using Scikit-learn.",
                "Collaborated on actionable data insights for decision making."
              ],
            },
            {
              title: "Cybersecurity Intern",
              company: "Kaashiv Infotech",
              period: "Feb 2022 – Mar 2022",
              details: [
                "Tested DoS vulnerabilities and brute force resistance.",
                "Participated in malware analysis and digital forensics labs.",
                "Educated interns on secure development practices."
              ],
            },
          ].map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 md:p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200 h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors mb-1">
                      {job.title}
                    </h3>
                    <p className="text-teal-600 font-semibold text-lg">{job.company}</p>
                  </div>
                </div>
                <span className="inline-block text-sm text-gray-500 font-medium bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-1.5 rounded-full mb-4 border border-teal-100">{job.period}</span>
                
                <ul className="space-y-2.5 text-gray-700 leading-relaxed text-sm md:text-base">
                  {job.details.map((item, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="text-teal-600 mt-1.5 flex-shrink-0 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section with unique background */}
      <section id="contact" className="relative max-w-2xl mx-auto py-20 md:py-28 px-4">
        {/* Gradient fade background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-teal-50/20 via-transparent to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <AnimatedUnderline />
            <p className="text-gray-600 text-lg">Let&#39;s collaborate on your next project</p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-700">
                <FaEnvelope className="text-teal-600 text-xl" />
                <a href="mailto:nxs230139@utdallas.edu" className="hover:text-teal-600 transition-colors">nxs230139@utdallas.edu</a>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-teal-600 text-xl">📱</span>
                <a href="tel:+14807201999" className="hover:text-teal-600 transition-colors">(480) 720-1999</a>
              </div>
            </div>

            <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
              <div>
                <input 
                  name="user_name" 
                  placeholder="Your Name" 
                  required 
                  className="w-full p-4 rounded-xl bg-gray-50 text-gray-900 border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all" 
                />
              </div>
              <div>
                <input 
                  type="email" 
                  name="user_email" 
                  placeholder="Your Email" 
                  required 
                  className="w-full p-4 rounded-xl bg-gray-50 text-gray-900 border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all" 
                />
              </div>
              <div>
                <textarea 
                  name="message" 
                  placeholder="Your Message" 
                  required 
                  rows={5}
                  className="w-full p-4 rounded-xl bg-gray-50 text-gray-900 border border-gray-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 outline-none transition-all resize-none" 
                />
              </div>
              <MagneticButton className="w-full">
                <motion.button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Send Message
                </motion.button>
              </MagneticButton>
            </form>
          </div>
        </motion.div>
      </section>
    </>
  );
}
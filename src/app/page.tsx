'use client';
import Image from "next/image";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { skills } from "@/data/skills";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import Head from "next/head";

export default function Home() {
  const [showScroll, setShowScroll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      <Head>
        <title>Nandhana Suresh Kumar | Portfolio</title>
        <meta name="description" content="Portfolio of Nandhana Suresh Kumar - Software Developer, UTD Graduate Student, Full Stack & ML Enthusiast" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      {showScroll && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition" aria-label="Scroll to top">
          <FaArrowUp />
        </button>
      )}

      {/* HERO SECTION */}
      <motion.section id="home" className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center text-white px-4 md:px-16 py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="blob-bg"></div>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-7xl">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center md:text-left">
            <div className="relative w-[180px] h-[180px] mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10 backdrop-blur-lg">
              <Image src="/images/profilepic.jpg" alt="Profile" fill className="object-cover" />
            </div>
            <h2 className="text-3xl font-semibold mt-6">Nandhana Suresh Kumar</h2>
            <p className="text-sm text-gray-400">Software Developer · Dallas, TX</p>
            <p className="text-sm text-gray-400">MSCS @ UT Dallas · Open to SDE Internships</p>
            <div className="flex justify-center md:justify-start gap-4 mt-4 text-xl">
              <a href="mailto:nxs230139@utdallas.edu" target="_blank"><FaEnvelope /></a>
              <a href="https://github.com/" target="_blank"><FaGithub /></a>
              <a href="https://linkedin.com/in/nandhana11" target="_blank"><FaLinkedin /></a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Transforming Your Ideas into <span className="text-purple-400">Reality</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300 max-w-xl">
              Passionate about creating impactful solutions through web development, machine learning, and secure software practices.
            </p>
            <div className="mt-6 flex justify-center md:justify-start gap-4">
              <a href="/resume.pdf" download className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg transition-all shadow-md">Download Resume</a>
              <a href="#projects" className="text-purple-400 hover:underline font-medium px-4 py-3">View Projects →</a>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ABOUT SECTION */}
      <section id="about" className="max-w-5xl mx-auto py-20 px-4">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="text-gray-300 text-md leading-relaxed text-center max-w-3xl mx-auto">
            I&#39;m a passionate Software Developer with strong foundations in Computer Science and experience across Web Development, Machine Learning, and Cybersecurity.
            I love solving real-world problems with creative technical solutions. I&#39;m currently pursuing my MS in CS at UT Dallas and actively looking for internship opportunities in Full Stack or Backend roles.
          </p>
          <p className="text-gray-400 mt-4 text-sm text-center">
            Fun fact: With a developer&#8217;s logic and a designer&#8217;s intuition, I enjoy building experiences that look as good as they work.
          </p>


        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="max-w-5xl mx-auto py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill, index) => (
            <span key={index} className="bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-full shadow-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="max-w-3xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Experience</h2>
        <div className="relative border-l-2 border-gray-700 space-y-10">
          {[
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
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="ml-6 relative"
            >
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="flex justify-between items-center w-full text-left focus:outline-none">
                <div>
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  {job.title}
                  <span className="text-sm text-gray-400">
                    {openIndex === index ? "▲" : "▼"}
                  </span>
                </h3>

                  <p className="text-gray-400 italic">{job.company}</p>
                </div>
                <span className="text-sm text-gray-500">{job.period}</span>
              </button>
              {openIndex === index && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 list-disc list-inside text-gray-300 space-y-1"
                >
                  {job.details.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </motion.ul>
              )}
              <div className="absolute left-[-30px] top-2 w-4 h-4 bg-blue-600 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="max-w-xl mx-auto py-20 px-4">
        <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
        <p className="mb-2">📧 Email: nxs230139@utdallas.edu</p>
        <p className="mb-6">📱 Phone: (480) 720-1999</p>
        <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">
          <input name="user_name" placeholder="Name" required className="p-2 rounded bg-gray-800 text-white" />
          <input type="email" name="user_email" placeholder="Email" required className="p-2 rounded bg-gray-800 text-white" />
          <textarea name="message" placeholder="Message" required className="p-2 rounded bg-gray-800 text-white" />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">Send</button>
        </form>
      </section>
    </>
  );
}
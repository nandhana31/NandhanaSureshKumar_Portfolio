'use client';
import Image from "next/image";
import { ProjectType } from "@/data/projects";
import { FaGithub, FaFilePdf, FaExternalLinkAlt } from "react-icons/fa";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

const ProjectCard = ({ project }: { project: ProjectType }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank");
    } else if (project.githubUrl) {
      window.open(project.githubUrl, "_blank");
    } else if (project.pdfLink) {
      window.open(project.pdfLink, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-teal-200 cursor-pointer h-full flex flex-col"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -12 }}
    >
      {/* Animated shine effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(600px circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(20, 184, 166, 0.1), transparent 40%)`,
        }}
      />
      
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-teal-500/5 group-hover:via-cyan-500/5 group-hover:to-teal-500/5 transition-all duration-300 pointer-events-none" />
      
      {/* Image with overlay */}
      <motion.div 
        className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {(project.liveUrl || project.githubUrl || project.pdfLink) && (
          <motion.div 
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-teal-600 p-2.5 rounded-full z-10 shadow-lg"
            initial={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ delay: 0, duration: 0.2 }}
          >
            {project.liveUrl ? <FaExternalLinkAlt className="w-4 h-4" /> : 
             project.githubUrl ? <FaGithub className="w-4 h-4" /> : 
             <FaFilePdf className="w-4 h-4" />}
          </motion.div>
        )}
        
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col">
        {/* Title with sequential animation */}
        <motion.h3 
          className="font-bold text-xl text-gray-900 group-hover:text-teal-600 transition-colors duration-300"
          initial={{ x: 0 }}
          whileHover={{ x: 5 }}
          transition={{ delay: 0.05, duration: 0.2 }}
        >
          {project.title}
        </motion.h3>

        {/* Description with sequential animation */}
        <motion.p 
          className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1"
          initial={{ opacity: 1 }}
          whileHover={{ opacity: 0.8 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          {project.description}
        </motion.p>

        {/* Tech Stack with staggered animation */}
        {project.technologies && (
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ delay: 0.15, duration: 0.2 }}
          >
            {project.technologies.map((tech: string, idx: number) => (
              <motion.span
                key={tech}
                className="bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-teal-100 hover:border-teal-300 transition-colors duration-200"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ delay: 0.2 + idx * 0.03, duration: 0.15 }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors duration-200 group/link"
            >
              <FaGithub className="group-hover/link:scale-110 transition-transform" /> 
              <span className="relative">
                GitHub
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 group-hover/link:w-full transition-all duration-300" />
              </span>
            </a>
          )}
          {project.pdfLink && (
            <a
              href={project.pdfLink}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200 group/link"
            >
              <FaFilePdf className="group-hover/link:scale-110 transition-transform" /> 
              <span className="relative">
                View PDF
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover/link:w-full transition-all duration-300" />
              </span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200 group/link"
            >
              <FaExternalLinkAlt className="group-hover/link:scale-110 transition-transform" /> 
              <span className="relative">
                Live Demo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-600 group-hover/link:w-full transition-all duration-300" />
              </span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
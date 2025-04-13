import Image from "next/image";
import { ProjectType } from "@/data/projects";
import { FaGithub, FaFilePdf, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ project }: { project: ProjectType }) => {
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
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl p-4 transition-transform hover:scale-105">
      {/* Image */}
      <div
        onClick={handleClick}
        className={`relative w-full aspect-video mb-4 ${project.liveUrl || project.githubUrl || project.pdfLink ? "cursor-pointer" : ""}`}
      >
        {/* Icon overlay: prioritize live → github → pdf */}
        {(project.liveUrl || project.githubUrl || project.pdfLink) && (
          <div className="absolute top-2 right-2 bg-black/70 text-white p-2 rounded-full z-10">
            {project.liveUrl ? <FaExternalLinkAlt /> : project.githubUrl ? <FaGithub /> : <FaFilePdf />}
          </div>
        )}
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Title */}
      <h2 className="font-bold text-lg mb-2">{project.title}</h2>

      {/* Description */}
      <p className="text-gray-300 mb-3 text-sm">{project.description}</p>

      {/* Tech Stack */}
      {project.technologies && (
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string) => (
            <span
              key={tech}
              className="bg-gray-700 text-white text-xs font-medium px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            className="flex items-center gap-2 text-sm text-blue-400 hover:underline"
          >
            <FaGithub /> GitHub
          </a>
        )}
        {project.pdfLink && (
          <a
            href={project.pdfLink}
            target="_blank"
            className="flex items-center gap-2 text-sm text-red-400 hover:underline"
          >
            <FaFilePdf /> View PDF
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            className="flex items-center gap-2 text-sm text-green-400 hover:underline"
          >
            <FaExternalLinkAlt /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
}
export default ProjectCard;
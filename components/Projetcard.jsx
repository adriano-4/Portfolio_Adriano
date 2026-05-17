// components/ProjectCard.jsx
import { FaExternalLinkAlt, FaCheckCircle, FaClock } from "react-icons/fa";

function ProjectCard({ title, description, tags, link, src, status }) {
  return (
    <div className="project-card">
      <span
        className={`project-status ${
          status === "Terminé" ? "finished" : "progress"
        }`}
      >
        {status === "Terminé" ? (
          <>
            <FaCheckCircle className="status-icon" />
            {status}
          </>
        ) : (
          <>
            <FaClock className="status-icon" />
            {status}
          </>
        )}
      </span>
      <div id="image_projet" className="image_projet">
        <img src={src} />
      </div>
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>

      <div className="project-tags">
        {tags.map((tag) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-small"
      >
        Voir le projet{" "}
        <FaExternalLinkAlt
          style={{ marginLeft: "6px", verticalAlign: "middle" }}
        />
      </a> */}
    </div>
  );
}

export default ProjectCard;

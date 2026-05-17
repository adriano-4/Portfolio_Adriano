// components/About.jsx
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaDotCircle } from "react-icons/fa";
import {
  FaUsers,
  FaComments,
  FaSyncAlt,
  FaClock,
  FaLightbulb,
  FaUserCheck,
} from "react-icons/fa";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaProjectDiagram,
  FaSitemap,
  FaPencilRuler,
  FaVuejs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaPhp,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";

function About() {
  const [showMore, setShowMore] = useState(false);

  // Compétences avec icônes associées
  const skills = [
    { label: "React", icon: <FaReact /> },
    { label: "Vue.js", icon: <FaVuejs /> },
    { label: "HTML5", icon: <FaHtml5 /> },
    { label: "CSS3", icon: <FaCss3Alt /> },
    { label: "JavaScript", icon: <FaJsSquare /> },
    { label: "Node.js", icon: <FaNodeJs /> },
    { label: "Express.js", icon: <FaNodeJs /> },
    { label: "PHP", icon: <FaPhp /> },
    { label: "Java Spring Boot", icon: <FaJava /> },
    { label: "MySQL", icon: <FaDatabase /> },
    { label: "PostgreSQL", icon: <FaDatabase /> },
    { label: "Git", icon: <FaGitAlt /> },
    { label: "Merise", icon: <FaProjectDiagram /> },
    { label: "2TUP", icon: <FaSitemap /> },
    { label: "UI/UX Design", icon: <FaPencilRuler /> },
  ];
  const softs = [
    { label: "Travail en équipe", icon: <FaUsers /> },
    { label: "Communication", icon: <FaComments /> },
    { label: "Adaptabilité", icon: <FaSyncAlt /> },
    { label: "Gestion du temps", icon: <FaClock /> },
    { label: "Créativité", icon: <FaLightbulb /> },
    { label: "Autonomie", icon: <FaUserCheck /> },
  ];

  return (
    <section id="about" className="about">
      <h2 className="section-title">À propos</h2>

      <div className="about-content">
        {/* Bloc texte */}
        <div className="about-text">
          <p>
            Je suis développeur web passionné par la création d'interfaces
            modernes et accessibles. J'aime transformer des idées en produits
            concrets et bien pensés.
          </p>

          {showMore && (
            <p className="about-more">
              En dehors du code, je suis fan de design graphique, de musique et
              de sport. Je suis toujours curieux d'apprendre de nouvelles
              technologies et de collaborer sur des projets créatifs.
            </p>
          )}

          <button
            className="btn btn-outline btn-voir"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <>
                Voir moins{" "}
                <FaChevronUp
                  style={{ marginLeft: "6px", verticalAlign: "middle" }}
                />
              </>
            ) : (
              <>
                En savoir plus{" "}
                <FaChevronDown
                  style={{ marginLeft: "6px", verticalAlign: "middle" }}
                />
              </>
            )}
          </button>
        </div>

        {/* Bloc compétences */}
        <div className="about-skills">
          <h3>Mes compétences</h3>
          <ul className="skills-list">
            {skills.map((skill) => (
              <li key={skill.label} className="skill-tag">
                <span className="skill-icon">{skill.icon}</span>
                {skill.label}
              </li>
            ))}
          </ul>
          <h3 className="softskills">Soft Skills</h3>
          <ul className="skills-list">
            {softs.map((soft) => (
              <li key={soft.label} className="skill-tag">
                <span className="skill-icon">{soft.icon}</span>
                {soft.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;

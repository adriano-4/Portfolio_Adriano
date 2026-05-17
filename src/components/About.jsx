import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
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
  const sectionRef = useRef(null);

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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastScrollY = window.scrollY;
    let scrollDirection = "down";

    const onScroll = () => {
      scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const elements = section.querySelectorAll(
      ".section-title, .about-text, .about-skills",
    );
    elements.forEach((el, i) => {
      el.classList.add("scroll-animate");
      el.style.transitionDelay = `${i * 120}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("exit-up", "exit-down");
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
            if (scrollDirection === "down") {
              entry.target.classList.remove("exit-down");
              entry.target.classList.add("exit-up");
            } else {
              entry.target.classList.remove("exit-up");
              entry.target.classList.add("exit-down");
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    section
      .querySelectorAll(".scroll-animate")
      .forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .scroll-animate.exit-up {
          opacity: 0;
          transform: translateY(-40px);
        }
        .scroll-animate.exit-down {
          opacity: 0;
          transform: translateY(40px);
        }
      `}</style>

      <section id="about" className="about" ref={sectionRef}>
        <h2 className="section-title">À propos</h2>

        <div className="about-content">
          <div className="about-text">
            <p>
              Je suis développeur web passionné par la création d'interfaces
              modernes et accessibles. J'aime transformer des idées en produits
              concrets et bien pensés.
            </p>

            {showMore && (
              <p className="about-more">
                En dehors du code, je suis fan de design graphique, de musique
                et de sport. Je suis toujours curieux d'apprendre de nouvelles
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
    </>
  );
}

export default About;

// // components/Experience.jsx
// import {
//   FaBriefcase,
//   FaGraduationCap,
//   FaCalendarAlt,
//   FaMapMarkerAlt,
// } from "react-icons/fa";

// function Experience() {
//   const experiences = [
//     // {
//     //   id: 1,
//     //   type: "work",
//     //   period: "2025 — Présent",
//     //   title: "Développeur Web Full Stack",
//     //   lieu: "Freelance — Madagascar",
//     //   description:
//     //     "Conception et développement d'applications web sur mesure pour des clients locaux et internationaux.",
//     // },
//     {
//       id: 2,
//       type: "education",
//       period: "2026",
//       title: "première année de Master",
//       lieu: "Ecole Nationale d'informatique",
//       description:
//         "Premiere année de Master en Informatique avec comme parcours Génie logiciel et Base de donnée",
//     },
//     {
//       id: 3,
//       type: "education",
//       period: "Janvier 2026",
//       title: "Licence en Informatique",
//       lieu: "Université de Fianarantsoa - Ecole Nationale d'Informatique",
//       description:
//         "Obtention du diplôme de licence en Informatique dans le parcours de Génie Logiciel et Base de données",
//     },
//     {
//       id: 4,
//       type: "education",
//       period: "Octobre 2025",
//       title: "Stage en développement Full stack",
//       lieu: "Ministère de l'Agriculture et de l'Elevage",
//       description:
//         "Developpement d'une application de suivi des activités agricoles au niveau des régions de Madagascar",
//     },
//     {
//       id: 5,
//       type: "education",
//       period: "Septembre 2024",
//       title: "Stage en développement Full stack",
//       lieu: "OPHAM",
//       description:
//         "Developpement d'une application de gestion des anomalies présentes au sein de l'entreprise.",
//     },
//   ];

//   return (
//     <section id="experience" className="experience">
//       <h2 className="section-title">Mon Expérience</h2>
//       <p className="section-subtitle">
//         Mon parcours professionnel et académique.
//       </p>

//       <div className="timeline">
//         {experiences.map((exp) => (
//           <div
//             key={exp.id}
//             className={`timeline-item timeline-${exp.type} ${
//               exp.id === 2 ? "recent-exp" : ""
//             }`}
//           >
//             {/* Icône + ligne verticale */}
//             <div className="timeline-icon">
//               {exp.type === "work" ? <FaBriefcase /> : <FaGraduationCap />}
//             </div>

//             {/* Contenu */}
//             <div className="timeline-content">
//               {/* <span className="timeline-period">{exp.period}</span>
//               <h3 className="timeline-title">{exp.title}</h3>
//               <p className="timeline-lieu">{exp.lieu}</p> */}
//               <div className="timeline-info">
//                 <h3 className="timeline-title">{exp.title}</h3>
//                 <span className="timeline-period">
//                   <FaCalendarAlt className="info-icon22" />
//                   {exp.period}
//                 </span>

//                 <p className="timeline-lieu">
//                   <FaMapMarkerAlt className="info-icon22" />
//                   {exp.lieu}
//                 </p>
//               </div>
//               <p className="timeline-description">{exp.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Experience;
// components/Experience.jsx
import { useEffect, useRef } from "react";
import {
  FaBriefcase,
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Experience() {
  const sectionRef = useRef(null);

  const experiences = [
    {
      id: 2,
      type: "education",
      period: "2026",
      title: "première année de Master",
      lieu: "Ecole Nationale d'informatique",
      description:
        "Premiere année de Master en Informatique avec comme parcours Génie logiciel et Base de donnée",
    },
    {
      id: 3,
      type: "education",
      period: "Janvier 2026",
      title: "Licence en Informatique",
      lieu: "Université de Fianarantsoa - Ecole Nationale d'Informatique",
      description:
        "Obtention du diplôme de licence en Informatique dans le parcours de Génie Logiciel et Base de données",
    },
    {
      id: 4,
      type: "education",
      period: "Octobre 2025",
      title: "Stage en développement Full stack",
      lieu: "Ministère de l'Agriculture et de l'Elevage",
      description:
        "Developpement d'une application de suivi des activités agricoles au niveau des régions de Madagascar",
    },
    {
      id: 5,
      type: "education",
      period: "Septembre 2024",
      title: "Stage en développement Full stack",
      lieu: "OPHAM",
      description:
        "Developpement d'une application de gestion des anomalies présentes au sein de l'entreprise.",
    },
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

    const header = section.querySelectorAll(
      ".section-title, .section-subtitle",
    );
    header.forEach((el) => el.classList.add("scroll-animate"));

    const items = section.querySelectorAll(".timeline-item");
    items.forEach((item, i) => {
      item.classList.add("scroll-animate");
      item.style.transitionDelay = `${i * 120}ms`;
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
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const allAnimated = section.querySelectorAll(".scroll-animate");
    allAnimated.forEach((el) => observer.observe(el));

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

      <section id="experience" className="experience" ref={sectionRef}>
        <h2 className="section-title">Mon Expérience</h2>
        <p className="section-subtitle">
          Mon parcours professionnel et académique.
        </p>

        <div className="timeline">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={`timeline-item timeline-${exp.type} ${
                exp.id === 2 ? "recent-exp" : ""
              }`}
            >
              <div className="timeline-icon">
                {exp.type === "work" ? <FaBriefcase /> : <FaGraduationCap />}
              </div>

              <div className="timeline-content">
                <div className="timeline-info">
                  <h3 className="timeline-title">{exp.title}</h3>
                  <span className="timeline-period">
                    <FaCalendarAlt className="info-icon22" />
                    {exp.period}
                  </span>
                  <p className="timeline-lieu">
                    <FaMapMarkerAlt className="info-icon22" />
                    {exp.lieu}
                  </p>
                </div>
                <p className="timeline-description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Experience;

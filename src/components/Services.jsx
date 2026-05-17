// // components/Services.jsx
// import { FaCode, FaMobileAlt, FaDatabase, FaPaintBrush } from "react-icons/fa";

// function Services() {
//   const servicesList = [
//     {
//       id: 1,
//       icon: <FaCode />,
//       title: "Développement Web",
//       skills: ["React.Js", "Vue.js", "HTML", "CSS", "JavaScript"],
//       description:
//         "Création de sites et applications web modernes, performants et responsive.",
//     },
//     {
//       id: 2,
//       icon: <FaDatabase />,
//       title: "Back-end & API",
//       skills: [
//         "Node.Js",
//         "Java Spring Boot",
//         "Express",
//         "API REST",
//         "MySQL",
//         "PostgreSQL",
//       ],
//       description:
//         "Conception d'API REST robustes, connectées à des bases de données.",
//     },

//     {
//       id: 3,
//       icon: <FaPaintBrush />,
//       title: "UI/UX Design",
//       skills: [
//         "Figma",
//         "UI Design",
//         "UX Design",
//         "Canva",
//         "Logo Design",
//         "Adobe Illustrator",
//         "Adobe XD",
//       ],
//       description:
//         "Design d'interfaces soignées, cohérentes et accessibles, centrées sur l'expérience utilisateur et conception de logo.",
//     },
//   ];

//   return (
//     <section id="services" className="services">
//       <h2 className="section-title">Mes Services</h2>
//       <p className="section-subtitle">
//         Ce que je peux faire pour vous et vos projets.
//       </p>

//       <div className="services-grid">
//         {servicesList.map((service) => (
//           <div key={service.id} className="service-card">
//             <div className="service-icon">{service.icon}</div>
//             <h3 className="service-title">{service.title}</h3>
//             <p className="service-description">{service.description}</p>
//             <div className="skill_service">
//               {service.skills.map((skill, index) => (
//                 <span key={index}>{skill}</span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Services;
// components/Services.jsx
import { useEffect, useRef } from "react";
import { FaCode, FaMobileAlt, FaDatabase, FaPaintBrush } from "react-icons/fa";

function Services() {
  const sectionRef = useRef(null);

  const servicesList = [
    {
      id: 1,
      icon: <FaCode />,
      title: "Développement Web",
      skills: ["React.Js", "Vue.js", "HTML", "CSS", "JavaScript"],
      description:
        "Création de sites et applications web modernes, performants et responsive.",
    },
    {
      id: 2,
      icon: <FaDatabase />,
      title: "Back-end & API",
      skills: [
        "Node.Js",
        "Java Spring Boot",
        "Express",
        "API REST",
        "MySQL",
        "PostgreSQL",
      ],
      description:
        "Conception d'API REST robustes, connectées à des bases de données.",
    },
    {
      id: 3,
      icon: <FaPaintBrush />,
      title: "UI/UX Design",
      skills: [
        "Figma",
        "UI Design",
        "UX Design",
        "Canva",
        "Logo Design",
        "Adobe Illustrator",
        "Adobe XD",
      ],
      description:
        "Design d'interfaces soignées, cohérentes et accessibles, centrées sur l'expérience utilisateur et conception de logo.",
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

    const cards = section.querySelectorAll(".service-card");
    cards.forEach((card, i) => {
      card.classList.add("scroll-animate");
      card.style.transitionDelay = `${i * 100}ms`;
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

      <section id="services" className="services" ref={sectionRef}>
        <h2 className="section-title">Mes Services</h2>
        <p className="section-subtitle">
          Ce que je peux faire pour vous et vos projets.
        </p>

        <div className="services-grid">
          {servicesList.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="skill_service">
                {service.skills.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Services;

// components/Projects.jsx
import { useEffect, useRef } from "react";
import ProjectCard from "./Projetcard";
import reg from "../assets/reg.png";
import transrap from "../assets/transrap.png";
import gestbu from "../assets/gestbu.png";
import capa from "../assets/capa.png";
import esffinal from "../assets/esffinal.png";
import logofinallalaina from "../assets/logo final lalaina.jpg";

function Projects() {
  const sectionRef = useRef(null);

  const projectsList = [
    {
      id: 1,
      title: "Suivi Agricole par région",
      description:
        "Application de gestion des activités agricoles dans les régions de Madagascar.",
      tags: ["React.JS", "Java Spring Boot", "PostgreSQL"],
      link: "https://github.com",
      src: reg,
      status: "Terminé",
    },
    {
      id: 2,
      title: "Reconnaissance de panneaux de signalisation",
      description:
        "Application de reconnaissance des panneaux de signalisations routières pour les étudiants en conduite avec intégration IA",
      tags: ["Flutter", "Python"],
      link: "https://github.com",
      status: "Terminé",
    },
    {
      id: 3,
      title: "Trans Rapide",
      description:
        "Site de coopérative de voyage permettant la gestion complet des recettes.",
      tags: ["Vue.js", "Node.js", "MySQL", "Sass"],
      link: "https://github.com",
      status: "Terminé",
      src: transrap,
    },
    {
      id: 4,
      title: "Gestion Budgetaire",
      description:
        "Application de prevision de vente d'une année à partir de données des années précedentes avec visualisation des commandes et des stocks (commandes par période constante de 2mois)",
      tags: ["React", "Chart.js", "CSS"],
      link: "https://github.com",
      src: gestbu,
      status: "Terminé",
    },
    {
      id: 5,
      title: "CAPA ( Creactive And Preventive Action",
      description:
        "Application de gestion et de visualisation des différentes anomalies présentes au sein de l'entreprise OPHAM",
      tags: ["Vue.js", "Java Spring Boot", "Sybase"],
      link: "https://github.com",
      status: "Terminé",
      src: capa,
    },
    {
      id: 6,
      title: "Logo Evangile Sans Frontière",
      description:
        "Logo représentant un groupe de personnes unies dans la prière et la louange, symbolisant la foi, l'unité et la gloire rendue à Dieu.",
      tags: ["Adobe Illustrator"],
      link: "https://github.com",
      status: "Terminé",
      src: esffinal,
    },
    {
      id: 7,
      title: "Logo Ré-Insight",
      description:
        "Logo représentant la valorisation des richesses naturelles de Madagascar, mettant en harmonie la faune et la flore afin de refléter la beauté, la biodiversité et l'équilibre unique de l'environnement malgache.",
      tags: ["Adobe Illustrator"],
      link: "https://github.com",
      status: "Terminé",
      src: logofinallalaina,
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

    // Réinitialiser toutes les classes avant de ré-observer
    // (important quand le useEffect se relance suite à un ajout de projet)
    const header = section.querySelectorAll(
      ".section-title, .section-subtitle",
    );
    header.forEach((el) => {
      el.classList.remove("scroll-animate", "visible", "exit-up", "exit-down");
      el.classList.add("scroll-animate");
    });

    const cards = section.querySelectorAll(".project-card-wrapper");
    cards.forEach((card, i) => {
      card.classList.remove(
        "scroll-animate",
        "visible",
        "exit-up",
        "exit-down",
      );
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
  }, [projectsList.length]); // ← se relance automatiquement quand tu ajoutes un projet

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

      <section id="projects" className="projects" ref={sectionRef}>
        <h2 className="section-title">Mes Projets</h2>
        <p className="section-subtitle">
          Quelques réalisations récentes auxquelles je suis fier d'avoir
          contribué.
        </p>

        <div className="projects-grid">
          {projectsList.map((project) => (
            <div className="project-card-wrapper" key={project.id}>
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={project.link}
                src={project.src}
                status={project.status}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Projects;

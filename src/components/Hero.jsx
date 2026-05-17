// components/Hero.jsx
import { FaGithub, FaLinkedin, FaMailBulk, FaEnvelope } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import ImageCV from "../components/ImageCV";
import { useState } from "react";
import profil from "../assets/profil.png";

function Hero() {
  const [showCV, setShowCV] = useState(false);
  return (
    <>
      <section id="hero" className="hero">
        {/* Côté gauche : texte */}
        <div className="hero-content">
          <p className="hero-hello">Bonjour, je suis</p>
          <h1 className="hero-name">RANDRIANAMBININA Toky Adriano</h1>
          <p className="hero-title">Développeur Web Full Stack</p>

          <div className="hero-actions">
            <a href="#projects" className="btn">
              Voir mes projets{" "}
              <HiArrowRight
                style={{ marginLeft: "6px", verticalAlign: "middle" }}
              />
            </a>
            {/* <a href="#contact" className="btn btn-outline">
            Me contacter
          </a> */}
            <button
              className="btn btn-outline"
              onClick={() => setShowCV(!showCV)}
            >
              Consulter mon CV
            </button>
          </div>

          {/* Liens sociaux */}
          <div className="hero-socials">
            <a
              href="https://github.com/adriano-4"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/adriano-randrianambinina-aa5285336/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            {/* <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaEnvelope />
          </a> */}
          </div>
        </div>

        {/* Côté droit : image de profil */}
        <div className="hero-image-wrapper">
          <img
            src={profil}
            alt="Photo de profil de Toky Adriano"
            className="hero-image"
          />
        </div>
      </section>
      {showCV && <ImageCV onClose={() => setShowCV(false)} />}
    </>
  );
}

export default Hero;

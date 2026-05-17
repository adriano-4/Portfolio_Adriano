// components/Hero.jsx
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import ImageCV from "../components/ImageCV";
import { useState, useRef, useEffect } from "react";
import profil from "../assets/profil.png";

const TITLES = [
  "Développeur Web Full Stack",
  "Designer UI/UX",
  "Développeur React & Node",
  "Passionné de technologie",
];

function Hero() {
  const [showCV, setShowCV] = useState(false);
  const [displayed, setDisplayed] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [phase, setPhase] = useState("typing"); // "typing" | "pause" | "deleting"

  // 3D image refs
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);
  const animRef = useRef(null);
  const isHolding = useRef(false);
  const currentTransform = useRef({ rotX: 0, rotY: 0, x: 0, y: 0 });
  const targetTransform = useRef({ rotX: 0, rotY: 0, x: 0, y: 0 });

  // ── Typewriter ──────────────────────────────────────────
  useEffect(() => {
    const current = TITLES[titleIndex];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          80,
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pause"), 1000);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pause") {
      const t = setTimeout(() => setPhase("deleting"), 300);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
        return () => clearTimeout(t);
      } else {
        setTitleIndex((i) => (i + 1) % TITLES.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, titleIndex]);

  // ── 3D image ────────────────────────────────────────────
  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function animate() {
    const c = currentTransform.current;
    const tg = targetTransform.current;
    const speed = 0.08;

    c.rotX = lerp(c.rotX, tg.rotX, speed);
    c.rotY = lerp(c.rotY, tg.rotY, speed);
    c.x = lerp(c.x, tg.x, speed);
    c.y = lerp(c.y, tg.y, speed);

    if (imageRef.current) {
      imageRef.current.style.transform = `
        perspective(800px)
        rotateX(${c.rotX}deg)
        rotateY(${c.rotY}deg)
        translate(${c.x}px, ${c.y}px)
        scale(1.04)
      `;
    }

    const stillMoving =
      Math.abs(c.rotX - tg.rotX) > 0.01 ||
      Math.abs(c.rotY - tg.rotY) > 0.01 ||
      Math.abs(c.x - tg.x) > 0.01 ||
      Math.abs(c.y - tg.y) > 0.01;

    if (stillMoving) {
      animRef.current = requestAnimationFrame(animate);
    } else {
      animRef.current = null;
    }
  }

  function startLoop() {
    if (!animRef.current) {
      animRef.current = requestAnimationFrame(animate);
    }
  }

  function handleMouseMove(e) {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const maxRot = 20;
    const rotY = (dx / (rect.width / 2)) * maxRot;
    const rotX = -(dy / (rect.height / 2)) * maxRot;
    if (isHolding.current) {
      const maxMove = 100;
      const moveX = Math.max(-maxMove, Math.min(maxMove, dx * 0.3));
      const moveY = Math.max(-maxMove, Math.min(maxMove, dy * 0.3));
      targetTransform.current = { rotX, rotY, x: moveX, y: moveY };
    } else {
      targetTransform.current = { rotX, rotY, x: 0, y: 0 };
    }
    startLoop();
  }

  function handleMouseLeave() {
    isHolding.current = false;
    targetTransform.current = { rotX: 0, rotY: 0, x: 0, y: 0 };
    startLoop();
  }

  function handleMouseDown() {
    isHolding.current = true;
  }

  function handleMouseUp() {
    isHolding.current = false;
    targetTransform.current = { ...targetTransform.current, x: 0, y: 0 };
    startLoop();
  }

  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-content">
          <p className="hero-hello">Bonjour, je suis</p>
          <h1 className="hero-name">
            RANDRIANAMBININA <span>Toky Adriano</span>
          </h1>

          {/* Typewriter */}
          <p className="hero-title">
            {displayed}
            <span className="hero-cursor">|</span>
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn">
              Voir mes projets{" "}
              <HiArrowRight
                style={{ marginLeft: "6px", verticalAlign: "middle" }}
              />
            </a>
            <button
              className="btn btn-outline"
              onClick={() => setShowCV(!showCV)}
            >
              Consulter mon CV
            </button>
          </div>

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
          </div>
        </div>

        {/* Image 3D */}
        <div
          className="hero-image-wrapper"
          ref={wrapperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          style={{ cursor: "grab", userSelect: "none" }}
        >
          <img
            ref={imageRef}
            src={profil}
            alt="Photo de profil de Toky Adriano"
            className="hero-image"
            loading="lazy"
            draggable={false}
            style={{
              willChange: "transform",
              transformOrigin: "center center",
            }}
          />
        </div>
      </section>
      {showCV && <ImageCV onClose={() => setShowCV(false)} />}
    </>
  );
}

export default Hero;

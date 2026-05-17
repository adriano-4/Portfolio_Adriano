// components/Cursor.jsx
import { useEffect, useRef } from "react";

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0,
      mouseY = 0;
    let ringX = 0,
      ringY = 0;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Le point suit immédiatement
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    // Le ring suit avec inertie
    const animate = () => {
      ringX += (mouseX - ringX) * 0.25;
      ringY += (mouseY - ringY) * 0.25;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      animId = requestAnimationFrame(animate);
    };

    // Hover sur éléments cliquables → agrandir le ring
    const onMouseOver = (e) => {
      const el = e.target.closest(
        "a, button, .project-card, .service-card, .timeline-content, .skill-tag, .navbar-links a",
      );
      if (el) {
        ring.classList.add("ring-hover");
        dot.classList.add("dot-hover");
      }
    };
    const onMouseOut = (e) => {
      const el = e.target.closest(
        "a, button, .project-card, .service-card, .timeline-content, .skill-tag, .navbar-links a",
      );
      if (el) {
        ring.classList.remove("ring-hover");
        dot.classList.remove("dot-hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }

        .cursor-dot {
          position: fixed;
          top: -4px;
          left: -4px;
          width: 8px;
          height: 8px;
          background-color: #1a1953;
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          transition: width 0.2s ease, height 0.2s ease, top 0.2s ease, left 0.2s ease, background-color 0.2s ease;
          will-change: transform;
        }

        .cursor-dot.dot-hover {
          width: 6px;
          height: 6px;
          top: -3px;
          left: -3px;
          background-color: #4f4ec2;
        }

        .cursor-ring {
          position: fixed;
          top: -18px;
          left: -18px;
          width: 36px;
          height: 36px;
          border: 1.5px solid rgba(26, 25, 83, 0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99998;
          transition: width 0.25s ease, height 0.25s ease, top 0.25s ease, left 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
          will-change: transform;
        }

        .cursor-ring.ring-hover {
          width: 52px;
          height: 52px;
          top: -26px;
          left: -26px;
          border-color: rgba(26, 25, 83, 0.25);
          background-color: rgba(26, 25, 83, 0.06);
        }

        @media (hover: none) {
          .cursor-dot, .cursor-ring { display: none; }
          * { cursor: auto !important; }
        }
      `}</style>

      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

export default Cursor;
